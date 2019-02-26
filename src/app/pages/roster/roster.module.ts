import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { DatesService } from './../../services/dates.service';

import { IonicModule } from '@ionic/angular';

import { RosterPage } from './roster.page';

const routes: Routes = [
  {
    path: '',
    component: RosterPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [RosterPage],
  providers: [DatesService]
})
export class RosterPageModule {}
