import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';


import { MapsPageRoutingModule } from './maps-routing.module';
import { MapsPage } from './maps';

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    MapsPageRoutingModule
  ],
  declarations: [
    MapsPage,
  ],
  exports:[MapsPage]
})
export class MapsModule { }
