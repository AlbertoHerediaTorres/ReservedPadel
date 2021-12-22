import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListJugadoresPage } from './list-jugadores.page';

const routes: Routes = [
  {
    path: '',
    component: ListJugadoresPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ListJugadoresPageRoutingModule {}
