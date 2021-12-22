import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePage } from './home.page';

const routes: Routes = [
  {
    path: '',
    component: HomePage,
  },
  {
    path: 'logo',
    loadChildren: () => import('../logo/logo.module').then( m => m.LogoPageModule)
  },
  {
    path: 'register-my-club',
    loadChildren: () => import('../register-my-club/register-my-club.module').then( m => m.RegisterMyClubPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomePageRoutingModule {}
