import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { VisitingTimesPage } from './visiting-times';

@NgModule({
  declarations: [
    VisitingTimesPage,
  ],
  imports: [
    IonicPageModule.forChild(VisitingTimesPage),
  ],
})
export class VisitingTimesPageModule {}
