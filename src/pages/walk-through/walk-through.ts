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

  hasResetPassword: boolean = false;
  progress: string = "Change my password!";

  constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController) {
  }

  ionViewDidLoad() {
    this.hasResetPassword = this.navParams.get('hasResetPassword');
    if(this.hasResetPassword){
      this.progress = "Got it!";
    }
  }

  gotIt(){
    if(this.hasResetPassword){
      this.navCtrl.setRoot('HomePage');
    } else {
      this.navCtrl.setRoot('ResetPasswordPage', {
        'wasFirstTime': true
      });
    }
  }

  cancel(){
    if(this.hasResetPassword){
      this.navCtrl.setRoot('HomePage');
    } else {
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

}
