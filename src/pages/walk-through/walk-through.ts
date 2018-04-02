import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';


/**
 * Generated class for the WalkThroughPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-walk-through',
  templateUrl: 'walk-through.html',
})
export class WalkThroughPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController) {
  }

  ionViewDidLoad() {
  //  console.log('ionViewDidLoad WalkThroughPage');
  }

  gotIt(){
    this.navCtrl.setRoot('ResetPasswordPage', {
      'wasFirstTime': true
    });
  }

  cancel(){
    console.log('cancel');
    let alert = this.alertCtrl.create({
      message: "<H2>You need to change your password before anything else</H2>",
      buttons: [
        {
          text: "Ok",
          handler: ()=>{
            this.navCtrl.setRoot('ResetPasswordPage', {
              'wasFirstTime': true
            });
          }
        },
        {
          text: 'Cancel',
          role: 'cancel'
        }
      ]
    });
    alert.present();
  }

}
