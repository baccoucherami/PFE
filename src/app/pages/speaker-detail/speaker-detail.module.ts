import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SpeakerDetailPage } from './speaker-detail';
import { SpeakerDetailPageRoutingModule } from './speaker-detail-routing.module';
import { IonicModule } from '@ionic/angular';
import { MaisonDhoteService } from '../../service/maison-dhote.service';
import { MapsModule } from '../maps/maps.module';

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    SpeakerDetailPageRoutingModule,
    MapsModule
  ],
  declarations: [
    SpeakerDetailPage,
  ],
  providers:[
    MaisonDhoteService
  ]
})
export class SpeakerDetailModule { }
