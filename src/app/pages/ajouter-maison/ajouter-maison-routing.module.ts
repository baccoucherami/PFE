import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AjouterMaisonPage } from './ajouter-maison.page';

const routes: Routes = [
  {
    path: '',
    component: AjouterMaisonPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AjouterMaisonPageRoutingModule {}
