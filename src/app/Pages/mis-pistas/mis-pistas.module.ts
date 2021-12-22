import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MisPistasPageRoutingModule } from './mis-pistas-routing.module';

import { MisPistasPage } from './mis-pistas.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MisPistasPageRoutingModule
  ],
  declarations: [MisPistasPage]
})
export class MisPistasPageModule {}
