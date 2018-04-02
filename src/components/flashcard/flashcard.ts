import { Component, Input } from '@angular/core';


@Component({
  selector: 'flash-card',
  templateUrl: 'flashcard.html'
})
export class FlashCardComponent {

  @Input('isFlipped') flipCard: boolean;

  constructor() {

  }

}
