import { Component, OnInit } from '@angular/core';
import { LoadingController, AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { EmailValidator } from '../../validators/email';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  public loginForm: FormGroup;

  ngOnInit(){}

  constructor(
    public loadingCtrl: LoadingController,
    public alertCtrl: AlertController,
    public authProvider: AuthService,
    public formBuilder: FormBuilder,
    public router: Router) {

      this.loginForm = formBuilder.group({
      email: ['',
      Validators.compose([Validators.required, EmailValidator.isValid])],
      password: ['',
      Validators.compose([Validators.minLength(6), Validators.required])]
    });

  }



  loginUser(): void {
    if(this.loginForm.valid){
      let email = this.loginForm.value.email;
      let password = this.loginForm.value.password;
      this.showSpinner().then(()=>{
        this.authProvider.signIn(email, password).then(res=>{
          if(res){
            this.router.navigate(['/home']);
            this.loadingCtrl.dismiss();
          }
        }).catch(msg=>{
          this.loadingCtrl.dismiss();
          this.alertCtrl.create({
            subHeader: "KAOS",
            message: msg,
            buttons:[{
              text: "OK",
              handler: ()=>{
                this.loginForm.reset();
              }
            }]
          }).then(alert=>{
            alert.present()
          })
        })
      });
    }
  }

  async showSpinner(){
    const loading = await this.loadingCtrl.create({
      message: "Please wait...",
      cssClass: 'transparent',
      spinner: 'crescent'
    });
    return loading.present();
  }

}
