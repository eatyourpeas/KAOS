import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { QuizPage } from './quiz';
//import { FlashCardComponent } from '../../components/flashcard/flashcard'
import { ComponentsModule } from '../../components/components.module'


@NgModule({
  declarations: [
    QuizPage
  ],
  imports: [
    ComponentsModule,
    IonicPageModule.forChild(QuizPage)
  ]
})
export class QuizPageModule {}
