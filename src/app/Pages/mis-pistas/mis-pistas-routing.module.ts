import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MisPistasPage } from './mis-pistas.page';

const routes: Routes = [
  {
    path: '',
    component: MisPistasPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MisPistasPageRoutingModule {}
