import {
  Component,
  ElementRef,
  inject,
  Input,
  OnInit,
  Renderer2,
  ViewChild,
} from '@angular/core';
import { NavigationStart, Router } from '@angular/router';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from '@ngx-translate/core';
import { filter } from 'rxjs';
import { SiteContentService } from 'src/app/shared/services/site-content.service';
import { EventGalleryComponent } from '../event-gallery/event-gallery.component';

@Component({
  selector: 'app-project-details',
  templateUrl: './project-details.component.html',
  styleUrls: ['./project-details.component.scss'],
})
export class ProjectDetailsComponent implements OnInit {
  private modalService = inject(NgbModal);

  @Input() projectId!: number;
  project: any = {};
  direction: string = 'ltr'; // Default direction

  constructor(
    public activeModal: NgbActiveModal,
    private router: Router,
    private renderer: Renderer2,
    private _SiteContentService: SiteContentService,
    private translate: TranslateService
  ) {
    this.initialize();
  }

  @ViewChild('testimonialSwiper') testimonialSwiper!: ElementRef;
  @ViewChild('dot1') dot1!: ElementRef;
  @ViewChild('dot2') dot2!: ElementRef;
  @ViewChild('dot3') dot3!: ElementRef;
  @ViewChild('dot4') dot4!: ElementRef;

  activeSlideIndex = 0;
  contentContainerHeight: number = 0;
  dotHeight: number = 0;

  activeIndex: number = 0;

  events!: any[];
  eventsWithIndex!: any[];

  ngOnInit(): void {
    this.initialize();
  }

  initialize(): void {
    this._SiteContentService.getProjectDetails(this.projectId).subscribe({
      next: (data) => {
        this.project = data.data;

        this.events = data.data.details;
        // Add the last object

        if (this.direction == 'ltr') {
          this.events.push({
            title: 'Customer Testimonial',
            description: '',
          });
        } else {
          this.events.push({
            title: 'شهادة العميل',
            description: '',
          });
        }

        this.eventsWithIndex = this.events.map((event: any, index: any) => ({
          ...event,
          index,
        }));
      },
    });

    this.router.events
      .pipe(filter((event) => event instanceof NavigationStart))
      .subscribe(() => {
        if (this.activeModal) {
          this.activeModal.close();
        }
      });

    const currentLang =
      this.translate.currentLang || this.translate.getDefaultLang() || 'en';
    this.direction = currentLang === 'ar' ? 'rtl' : 'ltr';

    this.translate.onLangChange.subscribe((event) => {
      this.direction = event.lang === 'ar' ? 'rtl' : 'ltr';
    });
  }

  onSlideChange(): void {
    const swiper = this.testimonialSwiper?.nativeElement.swiper;
    this.activeIndex = swiper.activeIndex;

    this.setActive(swiper.activeIndex);
  }

  setActive(index: number): void {
    this.dotHeight = this.dot1.nativeElement.offsetHeight + 8;

    // Adjust transforms for vertical movement
    const transforms = [
      // For index 0 (default position, no movement)
      [0, 0, 0, 0],

      // For index 1 (move the dots up or down in a vertical direction)
      [this.dotHeight, -this.dotHeight, 0, 0],

      // For index 2 (further movement of dots in vertical direction)
      [this.dotHeight * 2, -this.dotHeight, -this.dotHeight, 0],

      // For index 3 (maximum movement for each dot)
      [this.dotHeight * 3, -this.dotHeight, -this.dotHeight, -this.dotHeight],
    ];

    // Apply vertical transform to each dot
    [this.dot1, this.dot2, this.dot3, this.dot4].forEach((dot, i) => {
      this.renderer.setStyle(
        dot.nativeElement,
        'transform',
        `translateY(${transforms[index][i] || 0}px)` // Use translateY for vertical movement
      );
    });
  }

  eventGallery(id: number) {
    const modalRef = this.modalService.open(EventGalleryComponent, {
      fullscreen: true,
      scrollable: true,
    });

    modalRef.componentInstance.projectId = id;

    this.activeModal.close();
  }

  close(): void {
    this.activeModal.close();
  }
}
