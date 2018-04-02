import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { AuthData } from '../../providers/auth/auth';
import { UserProfileProvider } from '../../providers/user-profile/user-profile';
import { EmailValidator } from '../../validators/email';

@IonicPage({

})
@Component({
  selector: 'page-reset-password',
  templateUrl: 'reset-password.html',
})
export class ResetPasswordPage {
  public resetPasswordForm: FormGroup;
  wasFirstTime: boolean;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public authProvider: AuthData,
    public userProfileProvider: UserProfileProvider,
    public formBuilder: FormBuilder,
    public alertCtrl: AlertController
  ) {
      this.resetPasswordForm = formBuilder.group({
        email: ['',
        Validators.compose([Validators.required, EmailValidator.isValid])],
      });
  }

  ionViewDidLoad() {
    this.wasFirstTime = this.navParams.get('wasFirstTime');
  }

  resetPassword(){
    if (!this.resetPasswordForm.valid){
      console.log(this.resetPasswordForm.value);
    } else {
      this.authProvider.resetPassword(this.resetPasswordForm.value.email)
      .then((user) => {

        if(this.wasFirstTime){//navigated to this page from WalkThroughPage: update firestore userprofile, else came as a standard password reset

          this.userProfileProvider.setUserHasLoggedInForFirstTimeAndChangedPassword(this.authProvider.getLoggedInUserId()).then(result=>{
            if(true){
              console.log('password updated and tutorial done');
            }
          }).catch(error =>{
            console.log(error.message);
          });
        }
        let alert = this.alertCtrl.create({
          message: "We sent you a reset link to your email",
          buttons: [
            {
              text: "Ok",
              role: 'cancel',
              handler: () => { this.navCtrl.setRoot('HomePage'); }
            }
          ]
        });
        alert.present();

      }, (error) => {
        var errorMessage: string = error.message;
        let errorAlert = this.alertCtrl.create({
          message: errorMessage,
          buttons: [{ text: "Ok", role: 'cancel' }]
        });
        errorAlert.present();
      });
    }
  }

}
