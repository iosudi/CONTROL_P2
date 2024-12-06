import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './pages/about/about.component';
import { ContactComponent } from './pages/contact/contact.component';
import { HomeComponent } from './pages/home/home.component';
import { OurServicesComponent } from './pages/our-services/our-services.component';
import { PartnersComponent } from './pages/partners/partners.component';
import { PortfolioComponent } from './pages/portfolio/portfolio.component';
import { ServicesDetailsComponent } from './pages/services-details/services-details.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full',
  },
  {
    path: 'home',
    component: HomeComponent,
    title: 'Home Page - Ctrl+P for advertising and modern marketing',
  },
  {
    path: 'about-us',
    component: AboutComponent,
    title: 'About - Ctrl+P for advertising and modern marketing',
  },
  {
    path: 'portfolio',
    component: PortfolioComponent,
    title: 'Portfolio - Ctrl+P for advertising and modern marketing',
  },
  {
    path: 'services',
    component: OurServicesComponent,
    title: 'Our services - Ctrl+P for advertising and modern marketing',
  },
  {
    path: 'services/:id',
    component: ServicesDetailsComponent,
    title: 'Our services - Ctrl+P for advertising and modern marketing',
  },
  {
    path: 'partners',
    component: PartnersComponent,
    title: 'Partners - Ctrl+P for advertising and modern marketing',
  },

  {
    path: 'contact-us',
    component: ContactComponent,
    title: 'Contact us - Ctrl+P for advertising and modern marketing',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GeneralRoutingModule {}
