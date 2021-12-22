import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MisHorasPageRoutingModule } from './mis-horas-routing.module';

import { MisHorasPage } from './mis-horas.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MisHorasPageRoutingModule
  ],
  declarations: [MisHorasPage]
})
export class MisHorasPageModule {}
