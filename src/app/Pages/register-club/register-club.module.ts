import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RegisterClubPageRoutingModule } from './register-club-routing.module';

import { RegisterClubPage } from './register-club.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RegisterClubPageRoutingModule
  ],
  declarations: [RegisterClubPage]
})
export class RegisterClubPageModule {}
