import { DataService } from './Services/data.service';
import { Component } from '@angular/core';


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent{



  public appPages = [
    { title: 'Inicio', url: '/logo', icon: 'home' },
    { title: 'Mi club', url: '/my-club', icon: 'shirt' },
   // { title: 'Campeonatos', url: '/folder/Favorites', icon: 'trophy' },
    { title: 'Mi perfil', url: '/my-profile', icon: 'person' },
    { title: 'Cerrar sesión', url: '/home', icon: 'exit' }
  ];

  constructor(private data: DataService) {



  }


}
