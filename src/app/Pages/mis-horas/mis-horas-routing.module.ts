import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MisHorasPage } from './mis-horas.page';

const routes: Routes = [
  {
    path: '',
    component: MisHorasPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MisHorasPageRoutingModule {}
