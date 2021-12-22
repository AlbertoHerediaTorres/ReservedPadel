import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'folder/:id',
    loadChildren: () => import('./folder/folder.module').then( m => m.FolderPageModule)
  },
  {
    path: 'register',
    loadChildren: () => import('./Pages/register/register.module').then( m => m.RegisterPageModule)
  },
  {
    path: 'logo',
    loadChildren: () => import('./Pages/logo/logo.module').then( m => m.LogoPageModule)
  },
  {
    path: 'register-club',
    loadChildren: () => import('./Pages/register-club/register-club.module').then( m => m.RegisterClubPageModule)
  },
  {
    path: 'register-my-club',
    loadChildren: () => import('./Pages/register-my-club/register-my-club.module').then( m => m.RegisterMyClubPageModule)
  },
  {
    path: 'my-profile',
    loadChildren: () => import('./Pages/my-profile/my-profile.module').then( m => m.MyProfilePageModule)
  }
  ,
  {
    path: 'home',
    loadChildren: () => import('./Pages/home/home.module').then( m => m.HomePageModule)
  },
  {
    path: 'club-data/:id',
    loadChildren: () => import('./Pages/club-data/club-data.module').then( m => m.ClubDataPageModule)
  },
  {
    path: 'my-club',
    loadChildren: () => import('./Pages/my-club/my-club.module').then( m => m.MyClubPageModule)
  },
  {
    path: 'inscripciones',
    loadChildren: () => import('./Pages/inscripciones/inscripciones.module').then( m => m.InscripcionesPageModule)
  },
  {
    path: 'reservas',
    loadChildren: () => import('./Pages/reservas/reservas.module').then( m => m.ReservasPageModule)
  },
  {
    path: 'horas',
    loadChildren: () => import('./Pages/horas/horas.module').then( m => m.HorasPageModule)
  },
  {
    path: 'list-jugadores',
    loadChildren: () => import('./Pages/list-jugadores/list-jugadores.module').then( m => m.ListJugadoresPageModule)
  },
  {
    path: 'mis-pistas',
    loadChildren: () => import('./Pages/mis-pistas/mis-pistas.module').then( m => m.MisPistasPageModule)
  },
  {
    path: 'mis-horas',
    loadChildren: () => import('./Pages/mis-horas/mis-horas.module').then( m => m.MisHorasPageModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
