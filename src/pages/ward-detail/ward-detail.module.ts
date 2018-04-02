import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { WardDetailPage } from './ward-detail';

@NgModule({
  declarations: [
    WardDetailPage,
  ],
  imports: [
    IonicPageModule.forChild(WardDetailPage),
  ],
})
export class WardDetailPageModule {}
