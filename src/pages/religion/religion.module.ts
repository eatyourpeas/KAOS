import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ReligionPage } from './religion';

@NgModule({
  declarations: [
    ReligionPage,
  ],
  imports: [
    IonicPageModule.forChild(ReligionPage),
  ],
})
export class ReligionPageModule {}
