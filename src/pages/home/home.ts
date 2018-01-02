import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { QuizPage } from '../quiz/quiz'
import { ListPage } from '../list/list';
import { ContactsPage } from '../contacts/contacts';
import { AboutPage } from '../about/about';

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
    this.navCtrl.push(QuizPage);
  }

  goContacts(){
    this.navCtrl.push(ContactsPage);
  }

  goAbout(){
    this.navCtrl.push(AboutPage);
  }

  goList(){
    this.navCtrl.push(ListPage);
  }

}
