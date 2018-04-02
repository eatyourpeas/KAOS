import { Component } from '@angular/core';
import { NavController, IonicPage } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController) {

  }

  goResources(){

  }

  goQuiz(){
    this.navCtrl.push('QuizPage');
  }

  goContacts(){
    this.navCtrl.push('ContactsPage');
  }

  goAbout(){
    this.navCtrl.push('AboutPage');
  }

  goList(){
    this.navCtrl.push('ListPage');
  }

}
