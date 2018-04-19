import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EthnicityPage } from './ethnicity';

@NgModule({
  declarations: [
    EthnicityPage,
  ],
  imports: [
    IonicPageModule.forChild(EthnicityPage),
  ],
})
export class EthnicityPageModule {}
