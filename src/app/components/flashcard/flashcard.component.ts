import { Component, Input } from '@angular/core';


@Component({
  selector: 'flash-card',
  templateUrl: 'flashcard.component.html',
  styleUrls: ['./flashcard.component.scss']
})
export class FlashCardComponent {

  @Input('isFlipped') flipCard: boolean;
  //flipped: boolean = false;

  constructor() {

  }

  // flip(){
  //   this.flipped = !this.flipped;
  // }

}
