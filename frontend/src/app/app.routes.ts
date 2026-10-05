import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { CatalogComponent } from './pages/catalog/catalog.component';
import { CheckoutComponent } from './pages/checkout/checkout.component';
import { ServicesComponent } from './services/services.component';
import { AboutComponent } from './pages/about/about.component';
import { FaqComponent } from './pages/faq/faq.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'catalog', component: CatalogComponent },
  { path: 'checkout', component: CheckoutComponent },
  { path: 'services', component: ServicesComponent },
  { path: 'about', component: AboutComponent },
  { path: 'faq', component: FaqComponent },
  { path: '**', redirectTo: '' }
];
