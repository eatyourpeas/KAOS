import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { IdentPage } from './ident';

@NgModule({
  declarations: [
    IdentPage,
  ],
  imports: [
    IonicPageModule.forChild(IdentPage),
  ],
})
export class IdentPageModule {}
