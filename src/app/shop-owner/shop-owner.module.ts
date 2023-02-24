import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ShopOwnerRoutingModule } from './shop-owner-routing.module';
import { ShopOwnerComponent } from './shop-owner.component';


@NgModule({
  declarations: [
    ShopOwnerComponent
  ],
  imports: [
    CommonModule,
    ShopOwnerRoutingModule
  ]
})
export class ShopOwnerModule { }
