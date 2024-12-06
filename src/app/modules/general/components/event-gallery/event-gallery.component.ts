import { Component, ElementRef, inject, Input, ViewChild } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { filter } from 'rxjs';
import { SiteContentService } from 'src/app/shared/services/site-content.service';
import Swiper from 'swiper';
import { ProjectDetailsComponent } from '../project-details/project-details.component';

@Component({
  selector: 'app-event-gallery',
  templateUrl: './event-gallery.component.html',
  styleUrls: ['./event-gallery.component.scss'],
})
export class EventGalleryComponent {
  constructor(
    public activeModal: NgbActiveModal,
    private router: Router,
    private _SiteContentService: SiteContentService
  ) {}

  private modalService = inject(NgbModal);

  @Input() projectId!: number;

  @ViewChild('GallerySwiper', { static: false }) GallerySwiper?: ElementRef;
  swiperInstance!: Swiper;

  projectImages: any[] = [];

  activeIndex: number = 1;

  thumbnailsBreakpoints = {
    0: {
      slidesPerView: 3,
      spaceBetween: 20,
    },
    500: {
      slidesPerView: 4,
      spaceBetween: 20,
    },
    991: {
      slidesPerView: 5.5,
      spaceBetween: 20,
    },
    1199: {
      slidesPerView: 6.5,
      spaceBetween: 20,
    },
    1399: {
      slidesPerView: 7.5,
      spaceBetween: 20,
    },
  };

  ngOnInit(): void {
    this._SiteContentService.getProjectDetails(this.projectId).subscribe({
      next: (data) => {
        this.projectImages = data.data.images;
        console.log(this.projectImages);
      },
    });
    this.router.events
      .pipe(filter((event) => event instanceof NavigationStart))
      .subscribe(() => {
        if (this.activeModal) {
          this.activeModal.close();
        }
      });
  }

  triggerNext(): void {
    this.GallerySwiper?.nativeElement.swiper.slideNext();
    if (this.activeIndex < this.projectImages.length) {
      this.activeIndex++;
    }
  }

  triggerPrev(): void {
    this.GallerySwiper?.nativeElement.swiper.slidePrev();
    if (this.activeIndex > 1) {
      this.activeIndex--;
    }
  }

  viewProject(id: number) {
    const modalRef = this.modalService.open(ProjectDetailsComponent, {
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
