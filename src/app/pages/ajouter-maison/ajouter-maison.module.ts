import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AjouterMaisonPageRoutingModule } from './ajouter-maison-routing.module';

import { AjouterMaisonPage } from './ajouter-maison.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AjouterMaisonPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [AjouterMaisonPage]
})
export class AjouterMaisonPageModule {}
