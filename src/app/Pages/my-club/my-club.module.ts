import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MyClubPageRoutingModule } from './my-club-routing.module';

import { MyClubPage } from './my-club.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MyClubPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [MyClubPage]
})
export class MyClubPageModule {}
