import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MaisonsPage } from './maisons.page';

const routes: Routes = [
  {
    path: '',
    component: MaisonsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MaisonsPageRoutingModule {}
