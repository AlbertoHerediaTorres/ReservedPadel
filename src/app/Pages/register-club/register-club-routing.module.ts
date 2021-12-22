import { ClubDataPage } from './../club-data/club-data.page';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RegisterClubPage } from './register-club.page';

const routes: Routes = [
  {
    path: '',
    component: RegisterClubPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RegisterClubPageRoutingModule {}
