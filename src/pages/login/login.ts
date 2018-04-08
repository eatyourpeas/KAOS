import { Component } from '@angular/core';
import {
  IonicPage,
  Loading,
  LoadingController,
  NavController,
  AlertController } from 'ionic-angular';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { EmailValidator } from '../../validators/email';
import { AuthData } from '../../providers/auth/auth';
import { UserProfileProvider } from '../../providers/user-profile/user-profile';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  public loginForm: FormGroup;
  public loading: Loading;
  public userProfileProvider: UserProfileProvider;

  constructor(public navCtrl: NavController,
    public loadingCtrl: LoadingController,
    public alertCtrl: AlertController,
    public authProvider: AuthData,
    public userProfile: UserProfileProvider,
    public formBuilder: FormBuilder) {

      this.userProfileProvider = userProfile;

      this.loginForm = formBuilder.group({
      email: ['',
      Validators.compose([Validators.required, EmailValidator.isValid])],
      password: ['',
      Validators.compose([Validators.minLength(6), Validators.required])]
    });

  }

  loginUser(): void {
    if (!this.loginForm.valid){
      console.log(this.loginForm.value);
    } else {

      this.authProvider.login(this.loginForm.value.email,
        this.loginForm.value.password)
      .then( loggedInUser => {
        this.userProfileProvider.userIsLoggingInForFirstTime(loggedInUser.uid).then(res=>{
          if(res){
            console.log("this is my first time")
            this.loading.dismiss().then( () => {
              this.navCtrl.setRoot('WalkThroughPage', {
                hasResetPassword: false
              });
            });
          } else {
            console.log("this is not my first time");
            this.loading.dismiss().then( () => {
              this.navCtrl.setRoot('HomePage');
            });
          }
        })


      }, error => {
        //callback - could not log in error
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
      .catch((error)=>{
        //some other error
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
      });
      this.loading = this.loadingCtrl.create();
      this.loading.present();

    }
  }

  goToSignup(): void {
    this.navCtrl.push('SignupPage');
  }

  goToResetPassword(): void {
    this.navCtrl.push('ResetPasswordPage', {
      'wasFirstTime': false
    });
  }


  ionViewDidLoad() {

  }

}
