import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MyClubPage } from './my-club.page';

const routes: Routes = [
  {
    path: '',
    component: MyClubPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MyClubPageRoutingModule {}
