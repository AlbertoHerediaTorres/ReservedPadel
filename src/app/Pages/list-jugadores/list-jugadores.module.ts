import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ListJugadoresPageRoutingModule } from './list-jugadores-routing.module';

import { ListJugadoresPage } from './list-jugadores.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ListJugadoresPageRoutingModule
  ],
  declarations: [ListJugadoresPage]
})
export class ListJugadoresPageModule {}
