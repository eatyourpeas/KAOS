import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { WardsPage } from './wards';

@NgModule({
  declarations: [
    WardsPage,
  ],
  imports: [
    IonicPageModule.forChild(WardsPage),
  ],
})
export class WardsPageModule {}
