import { Component, inject } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SiteContentService } from 'src/app/shared/services/site-content.service';
import { ProjectDetailsComponent } from '../../components/project-details/project-details.component';
import { EventGalleryComponent } from './../../components/event-gallery/event-gallery.component';

@Component({
  selector: 'app-portfolio',
  templateUrl: './portfolio.component.html',
  styleUrls: ['./portfolio.component.scss'],
})
export class PortfolioComponent {
  constructor(private _SiteContentService: SiteContentService) {}
  private modalService = inject(NgbModal);

  ourWork: any[] = [];
  eventImages: string[] = [];
  eventCategoryName: string = '';
  currentCategoryProjects: any[] = [];
  projectCategories: any[] = [];

  searchQuery: string = '';

  filteredProjects: any[] = [];

  images: any[] = [
    './assets/images/portfolio/1.jpg',
    './assets/images/portfolio/3.jpg',
    './assets/images/portfolio/2.png',
    './assets/images/portfolio/4.jpg',
    './assets/images/portfolio/5.jpg',
    './assets/images/portfolio/11.gif',
    './assets/images/portfolio/8.jpg',
    './assets/images/portfolio/9.png',
    './assets/images/portfolio/7.jpg',
    './assets/images/portfolio/6.jpg',
    './assets/images/portfolio/10.jpg',
  ];

  ourWorkBreakpoints = {
    0: {
      slidesPerView: 1.25,
      spaceBetween: 20,
    },
    450: {
      slidesPerView: 1.75,
      spaceBetween: 20,
    },
    540: {
      slidesPerView: 2,
      spaceBetween: 20,
    },
    767: {
      slidesPerView: 2.5,
      spaceBetween: 20,
    },
    991: {
      slidesPerView: 3,
      spaceBetween: 20,
    },
    1200: {
      slidesPerView: 3.25,
      spaceBetween: 20,
    },
    1400: {
      slidesPerView: 4.15,
      spaceBetween: 20,
    },
  };

  workCategoriesBreakPoints = {
    0: {
      slidesPerView: 3.25,
      spaceBetween: 5,
    },

    550: {
      slidesPerView: 4,
      spaceBetween: 5,
    },
  };

  ngOnInit(): void {
    this.initialize();
  }

  initialize(): void {
    this._SiteContentService.getOurWorks().subscribe({
      next: (data) => {
        this.projectCategories = data.data;

        this.ourWork = data.data.map((category: any) => {
          return {
            id: category.id,
            categoryName: category.name,
            images: category.projects
              .filter((project: any) => project.image)
              .map((project: any) => project.image),
          };
        });

        this.setProjectImagesByCategoryId(this.ourWork[0].id);
        this.setProjectsByCategoryId(this.projectCategories[0].id);
        this.eventCategoryName = this.ourWork[0].categoryName;
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  setProjectImagesByCategoryId(id: number): void {
    const category = this.ourWork.find((category) => category.id === id);
    this.eventCategoryName = category.categoryName;
    this.eventImages = category?.images
      .map((img: any) => img)
      .filter((img: any) => img || []);
  }

  setProjectsByCategoryId(id: number): void {
    const category = this.projectCategories.find(
      (category) => category.id === id
    );
    this.eventCategoryName = category.name;
    this.currentCategoryProjects = category?.projects
      .map((projects: any) => projects)
      .filter((projects: any) => projects || []);

    this.filteredProjects = this.currentCategoryProjects;
  }

  filterProjects(): void {
    if (this.searchQuery.trim() === '') {
      this.filteredProjects = [...this.currentCategoryProjects]; // Show all projects if search is empty
      console.log(this.filteredProjects);
    } else {
      this.filteredProjects = this.currentCategoryProjects.filter((project) =>
        project.name.toLowerCase().includes(this.searchQuery.toLowerCase())
      );

      console.log(this.filteredProjects);
    }
  }

  eventGallery(id: number) {
    const modalRef = this.modalService.open(EventGalleryComponent, {
      fullscreen: true,
      scrollable: true,
    });

    modalRef.componentInstance.projectId = id;
  }

  viewProject(id: number) {
    const modalRef = this.modalService.open(ProjectDetailsComponent, {
      fullscreen: true,
      scrollable: true,
    });

    modalRef.componentInstance.projectId = id;
  }
}
