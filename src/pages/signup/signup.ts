import { Component } from '@angular/core';
import { IonicPage,
  NavController,
  Loading,
  LoadingController,
  AlertController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthData } from '../../providers/auth/auth';
import { EmailValidator } from '../../validators/email';

@IonicPage({
})
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {
  public signupForm: FormGroup;
  public loading: Loading;
  constructor(
    public navCtrl: NavController,
    public authProvider: AuthData,
    public formBuilder: FormBuilder,
    public loadingCtrl: LoadingController,
    public alertCtrl: AlertController,
    public auth: AuthData
  ) {
      this.signupForm = formBuilder.group({
        email: ['',
          Validators.compose([Validators.required, EmailValidator.isValid])],
        password: ['',
          Validators.compose([Validators.minLength(6), Validators.required])]
      });
    }

    signupUser(){
    if (!this.signupForm.valid){
      console.log(this.signupForm.value);
    } else {
      if(this.auth.permitted.indexOf(this.signupForm.value.email.toLowerCase()) > -1){
        this.authProvider.signup(this.signupForm.value.email,
          this.signupForm.value.password)
        .then((response) => {

          if(response == "Success"){
            this.loading.dismiss().then( () => {
              let alert = this.alertCtrl.create({
                message: "<h1>Congratulations!</h1> Account created! Now complete your profile. This will be visible to all, though your contact details will only be visible to other KAOS Clinicians.",
                buttons: [
                  {
                    text: "Ok",
                    role: 'cancel'
                  }
                ]
              });
              alert.present();
              this.navCtrl.setRoot('IdentPage', {
                user_id: this.auth.getLoggedInUserId(),
                edit: true
              });
            });
          } else {
            this.loading.dismiss().then( () => {
              let alert = this.alertCtrl.create({
                message: response,
                buttons: [
                  {
                    text: "Ok",
                    role: 'cancel'
                  }
                ]
              });
              alert.present();
            });
          }
        })
        .catch((error)=>{
          this.loading.dismiss().then( () => {
            let alert = this.alertCtrl.create({
              message: error.message,
              buttons: [
                {
                  text: "Ok",
                  role: 'cancel'
                }
              ]
            });
            alert.present();
          });
        })
        this.loading = this.loadingCtrl.create();
        this.loading.present();
      } else {
          let alert = this.alertCtrl.create({
            message: "<H2>Sorry</H2>Only KAOS approved members can register.",
            buttons: [
              {
                text: "Ok",
                role: 'cancel'
              }
            ]
          });
          alert.present();
      }
    }
  }
}
