import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ClubDataPageRoutingModule } from './club-data-routing.module';

import { ClubDataPage } from './club-data.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ClubDataPageRoutingModule
  ],
  declarations: [ClubDataPage]
})
export class ClubDataPageModule {}
