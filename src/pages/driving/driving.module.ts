import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DrivingPage } from './driving';

@NgModule({
  declarations: [
    DrivingPage,
  ],
  imports: [
    IonicPageModule.forChild(DrivingPage),
  ],
})
export class DrivingPageModule {}
