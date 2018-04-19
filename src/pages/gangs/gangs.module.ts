import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { GangsPage } from './gangs';

@NgModule({
  declarations: [
    GangsPage,
  ],
  imports: [
    IonicPageModule.forChild(GangsPage),
  ],
})
export class GangsPageModule {}
