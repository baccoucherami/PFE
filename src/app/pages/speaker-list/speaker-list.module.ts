import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

import { SpeakerListPage } from './speaker-list';
import { SpeakerListPageRoutingModule } from './speaker-list-routing.module';
import { MaisonDhoteService } from '../../service/maison-dhote.service';
import { BookComponent } from './book/book.component';

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    SpeakerListPageRoutingModule
  ],
  providers:[MaisonDhoteService],
  declarations: [SpeakerListPage,BookComponent],
})
export class SpeakerListModule {}
