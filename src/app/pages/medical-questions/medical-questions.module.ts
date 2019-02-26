import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { MedicalQuestionsPage } from './medical-questions.page';

const routes: Routes = [
  {
    path: '',
    component: MedicalQuestionsPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [MedicalQuestionsPage]
})
export class MedicalQuestionsPageModule {}
