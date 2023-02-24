import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from '../home/home.component';
import { LoginComponent } from '../login/login.component';
import { RegisterComponent } from '../register/register.component';
import { ShopComponent } from '../shop/shop.component';
import { PetComponent } from '../pet/pet.component';
import { ServiceComponent } from '../service/service.component';
import { ItemsComponent } from '../items/items.component';
import { PetDetailComponent } from '../pet-detail/pet-detail.component';

const routes: Routes = [
  { path: 'Home', component: HomeComponent },
  { path: 'Login', component: LoginComponent },
  { path: 'Register', component: RegisterComponent },
  { path: 'Shop', component: ShopComponent },
  {
    path: 'Shop',

    children: [
      {
        path: 'Items',
        component: ItemsComponent,
      },
    ],
  },
  { path: 'Pet', component: PetComponent },
  {
    path: 'Pet',

    children: [
      {
        path: 'PetDetail',
        component: PetDetailComponent,
      },
    ],
  },
  { path: 'Service', component: ServiceComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GuestRoutingModule {}
