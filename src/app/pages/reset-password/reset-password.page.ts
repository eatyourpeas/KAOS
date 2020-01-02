import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { UserprofileService } from '../../services/userprofile.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EmailValidator } from '../../validators/email';
import { ToastController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.page.html',
  styleUrls: ['./reset-password.page.scss'],
})
export class ResetPasswordPage implements OnInit {

  passwordresetForm: FormGroup

  constructor(private userProfileService: UserprofileService,
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private router: Router,
    private toastController: ToastController) {
      this.passwordresetForm = formBuilder.group({
      email: ['', Validators.compose([Validators.required, EmailValidator.isValid])]
    });
  }

  ngOnInit() {
  }

  resetPassword() {
    const email = this.passwordresetForm.controls.email.value;
    this.authService.resetPassword(email).then(() => {
      this.toastController.create({
        message: "Please check your email for a reset link.",
        duration: 3000
      }).then(toast => {
        toast.present();
      });
    }).catch(error => {
      this.toastController.create({
        message: error.message,
        duration: 3000
      }).then(toast => {
        toast.present();
      });
    });
  }

}
