import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ClubDataPage } from './club-data.page';

const routes: Routes = [
  {
    path: '',
    component: ClubDataPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ClubDataPageRoutingModule {}
