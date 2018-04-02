import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { RosterPage } from './roster';
import { CalendarModule } from 'ionic3-calendar-en';

@NgModule({
  declarations: [
    RosterPage,
  ],
  imports: [
    IonicPageModule.forChild(RosterPage),
    CalendarModule
  ],
})
export class RosterPageModule {}
