import { Component, OnInit } from '@angular/core';
import { UserprofileService } from '../../services/userprofile.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { ToastController, AlertController } from '@ionic/angular';

@Component({
  selector: 'app-ident',
  templateUrl: './ident.page.html',
  styleUrls: ['./ident.page.scss'],
})
export class IdentPage implements OnInit {

  user_id: string;
  user_profile;
  titles = ['Dr', 'Professor', 'Mr', 'Mrs', 'Ms'];
  secondary_roles = ['Clinician', 'Youth Worker', 'KAOS Administrator'];
  profile_form: FormGroup;


  constructor(
    private userProfileService: UserprofileService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    private toastController: ToastController,
    private alertController: AlertController
  ) {
    this.user_id = this.activatedRoute.snapshot.paramMap.get('uid');
    this.userProfileService.getUserProfile(this.user_id).subscribe(profiles => {
      this.user_profile = profiles.map(profile => {
        const uid = profile.payload.doc.id;
        const data = profile.payload.doc.data();
        return {uid, data};
      });
      console.log(this.user_profile);
      this.profile_form = this.formBuilder.group({
        title: [this.user_profile[0].data['title'], Validators.required],
        first_name: [this.user_profile[0].data['first_name'], Validators.required],
        second_name: [this.user_profile[0].data['second_name'], Validators.required],
        role: [this.user_profile[0].data['role'], Validators.required],
        secondary_role: [this.user_profile[0].data['secondary_role'], Validators.required],
        mobile: [this.user_profile[0].data['mobile'], Validators.required],
        email: [this.user_profile[0].data['email'], Validators.required],
        bio: [this.user_profile[0].data['bio'], Validators.required]
      });
    });
  }

  ngOnInit() {

  }

  saveProfile() {
    const profile = {
      title: this.profile_form.controls['title'].value,
      first_name: this.profile_form.controls['first_name'].value,
      second_name: this.profile_form.controls['second_name'].value,
      role: this.profile_form.controls['role'].value,
      secondary_role: this.profile_form.controls['secondary_role'].value,
      mobile: this.profile_form.controls['mobile'].value,
      email: this.profile_form.controls['email'].value,
      bio: this.profile_form.controls['bio'].value,
    };
    this.userProfileService.updateProfile(this.user_id, profile)
    .then(() =>
      this.toastController.create({
        message: 'KAOS Profile updated',
        duration: 1000
      }).then(toast => {
        toast.present().then(() => this.router.navigate(['home']));
      })
    )
    .catch(error => {
      this.toastController.create({
        message: 'KAOS Error: ' + error,
        duration: 3000
      }).then(toast => {
        toast.present();
      });
    });
  }

  updateImg(img_path) {
    this.alertController.create({
      subHeader: 'KAOS',
      message: 'Creating or editing your image requires a Gravatar account. You can do that <a href=\'https://wordpress.com/start/wpcc/oauth2-user?ref=oauth2&oauth2_redirect=https%3A%2F%2Fpublic-api.wordpress.com%2Foauth2%2Fauthorize%2F%3Fclient_id%3D1854%26response_type%3Dcode%26blog_id%3D0%26state%3D32ad7a522dbcf274808f7a0e8118ca7e30b7804cba4d7a1c9b777f6dad23b7c0%26redirect_uri%3Dhttps%253A%252F%252Fen.gravatar.com%252Fconnect%252F%253Faction%253Drequest_access_token%26jetpack-code%26jetpack-user-id%3D0%26action%3Doauth2-login&oauth2_client_id=1854\'> here.',
      buttons: [{
        text: 'OK',
        handler: () => {}
      }]
    }).then(alert => {
      alert.present();
    });
  }

}
