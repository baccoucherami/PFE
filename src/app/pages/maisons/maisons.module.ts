import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MaisonsPageRoutingModule } from './maisons-routing.module';

import { MaisonsPage } from './maisons.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MaisonsPageRoutingModule
  ],
  declarations: [MaisonsPage]
})
export class MaisonsPageModule {}
