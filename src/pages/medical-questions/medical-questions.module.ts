import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MedicalQuestionsPage } from './medical-questions';

@NgModule({
  declarations: [
    MedicalQuestionsPage,
  ],
  imports: [
    IonicPageModule.forChild(MedicalQuestionsPage),
  ],
})
export class MedicalQuestionsPageModule {}
