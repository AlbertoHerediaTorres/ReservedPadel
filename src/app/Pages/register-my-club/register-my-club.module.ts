import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RegisterMyClubPageRoutingModule } from './register-my-club-routing.module';

import { RegisterMyClubPage } from './register-my-club.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RegisterMyClubPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [RegisterMyClubPage]
})
export class RegisterMyClubPageModule {}
