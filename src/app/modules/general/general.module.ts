import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { MessageService } from 'primeng/api';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { DeferModule } from 'primeng/defer';
import { DropdownModule } from 'primeng/dropdown';
import { TimelineModule } from 'primeng/timeline';
import { ToastModule } from 'primeng/toast';
import { SharedModule } from 'src/app/shared/shared.module';
import { register as registerSwiperElements } from 'swiper/element/bundle';
import { EventGalleryComponent } from './components/event-gallery/event-gallery.component';
import { HomeMiniShopComponent } from './components/home-mini-shop/home-mini-shop.component';
import { ProjectDetailsComponent } from './components/project-details/project-details.component';
import { GeneralRoutingModule } from './general-routing.module';
import { AboutComponent } from './pages/about/about.component';
import { ContactComponent } from './pages/contact/contact.component';
import { HomeComponent } from './pages/home/home.component';
import { OurServicesComponent } from './pages/our-services/our-services.component';
import { PartnersComponent } from './pages/partners/partners.component';
import { PortfolioComponent } from './pages/portfolio/portfolio.component';
import { ServicesDetailsComponent } from './pages/services-details/services-details.component';
registerSwiperElements();

@NgModule({
  declarations: [
    HomeComponent,
    PartnersComponent,
    AboutComponent,
    ContactComponent,
    OurServicesComponent,
    ServicesDetailsComponent,
    PortfolioComponent,
    EventGalleryComponent,
    ProjectDetailsComponent,
    HomeMiniShopComponent,
  ],
  imports: [
    CommonModule,
    GeneralRoutingModule,
    DropdownModule,
    FormsModule,
    CarouselModule,
    BreadcrumbModule,
    TimelineModule,
    SharedModule,
    RouterModule,
    TranslateModule,
    ReactiveFormsModule,
    ToastModule,
    DeferModule,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [MessageService],
})
export class GeneralModule {}
