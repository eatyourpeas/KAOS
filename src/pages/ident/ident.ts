import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Loading, LoadingController, AlertController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthData } from "../../providers/auth/auth";
import { UserProfileProvider } from '../../providers/user-profile/user-profile';

@IonicPage()
@Component({
  selector: 'page-ident',
  templateUrl: 'ident.html',
})

export class IdentPage {

  public loading: Loading;

  user_id;
  isAuth = false;
  profileForm: FormGroup;
  profileFormBuilder: FormBuilder;
  profileHasBeenCompleted = false;

  userProfiles;
  currentUserProfile;
  currentUserProfileId;
  currentUserTitle;

  isEditable = false;
  viewTitle;
  isFirstTime = false;

  myAvatar;

  titles = ["Dr", "Mr", "Mrs", "Ms", "Prof"];


  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public loadingCtrl: LoadingController,
              public alertCtrl: AlertController,
              public formBuilder: FormBuilder,
              public authP: AuthData,
              public userProfileProvider: UserProfileProvider
    ) {

    this.profileFormBuilder = formBuilder;
    this.user_id = this.navParams.get('user_id');

    if(this.authP.isLoggedIn()){ //the person accessing this page is logged in
      this.isAuth = true;
    } else {
      this.isAuth = false;
    }

    if(this.navParams.get('edit')){
      this.isEditable = true;
    } else {
      this.isEditable = false
    }



    //use userid to get the full profile
    this.userProfiles = this.userProfileProvider.getProfileForUser(this.user_id)
    this.userProfiles.subscribe(res=>{
      this.currentUserProfile = res[0];
      this.currentUserProfileId = res[0].id;
      this.currentUserTitle = res[0].title;
      if(res[0].first_name == "" || res[0].second_name == "" || res[0].mobile == ""){
        this.profileHasBeenCompleted = false;
      } else {
        this.profileHasBeenCompleted = true;
      }
      if(this.isEditable){
        this.viewTitle = "Update My Profile"
      } else {
        this.viewTitle = res[0].title + " " + res[0].first_name + " " + res[0].second_name;
      }
    });


    this.profileForm = this.profileFormBuilder.group({

      title: [{value: "this.currentUserTitle", disabled: !this.isEditable}, Validators.compose([Validators.required])],
      first_name: [{value: "this.currentUserProfile.first_name", disabled: !this.isEditable}, Validators.compose([Validators.required])],
      second_name: [{value: "this.currentUserProfile.second_name", disabled: !this.isEditable}, Validators.compose([Validators.required])],
      role: [{value: "this.currentUserProfile.role", disabled: !this.isEditable}, Validators.compose([Validators.required])],
      centre: [{value: "this.currentUserProfile.centre", disabled: !this.isEditable}, Validators.compose([Validators.required])],
      secondary_role: [{value: "this.currentUserProfile.secondary_role", disabled: !this.isEditable}, Validators.compose([Validators.required])],
      service: [{value: "this.currentUserProfile.service", disabled: !this.isEditable}, Validators.compose([Validators.required])],
      bio: [{value: "this.currentUserProfile.bio", disabled: !this.isEditable}, Validators.compose([Validators.required])],
      mobile: [{value: "this.currentUserProfile.mobile", disabled: !this.isEditable}, Validators.compose([Validators.required])]

    });

  }

  ionViewDidLoad() {

    this.userProfileProvider.getAvatarURLForUserId(this.user_id)
    .then((result)=>{
      this.myAvatar = result;
    })
    .catch(()=>{
      this.myAvatar = "/assets/imgs/heads/doctor.jpg";
    });

    if(this.navParams.get('first_time')){
      this.isFirstTime = true;
    } else {
      this.isFirstTime = false
    }

    console.log("this is first time: "+ this.isFirstTime);



  }

  updateProfile(){

    if(this.profileForm.valid){
      this.loading = this.loadingCtrl.create();
      this.loading.present();

        let newProfile = {
          title: this.profileForm.controls['title'].value,
          first_name: this.profileForm.controls['first_name'].value,
          second_name: this.profileForm.controls['second_name'].value,
          role: this.profileForm.controls['role'].value,
          secondary_role: this.profileForm.controls['secondary_role'].value,
          service: this.profileForm.controls['service'].value,
          bio: this.profileForm.controls['bio'].value,
          mobile: this.profileForm.controls['mobile'].value,
          centre: this.profileForm.controls['centre'].value
        }

        this.userProfileProvider.updateProfile(this.currentUserProfileId, newProfile)
        .then((obj: any)=>{
          this.loading.dismiss().then(()=>{
            let alert = this.alertCtrl.create({
              message: "Successfully Updated!",
              buttons: [
                {
                  text: "Ok",
                  handler:()=>{
                    if(this.isFirstTime){
                      this.navCtrl.setRoot('WalkThroughPage', {
                        hasResetPassword: true
                      });
                    } else {
                      this.navCtrl.pop();
                    }
                  }
                }
              ]
            });
            alert.present();
          });

        })
        .catch((error: any)=>{
          this.loading.dismiss().then(()=>{
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

      }
  }

  imgClick(){

    let alert = this.alertCtrl.create({
      message: "To upload an image, you will be redirected to gravatar.com. Avatars created here are used on Wordpress and several websites across the internet. Please read their terms and conditions before agreeing.",
      buttons: [
        {
          text: "Ok",
          handler: ()=>{
            window.open("https://wordpress.com/start/wpcc/oauth2-user?oauth2_client_id=1854&oauth2_redirect=https%3A%2F%2Fpublic-api.wordpress.com%2Foauth2%2Fauthorize%3Fclient_id%3D1854%26response_type%3Dcode%26blog_id%3D0%26state%3D954a6bc06e88d74a9bcf4860798b6a531dfd998b058d4b8c05a78f0bf0ba5080%26redirect_uri%3Dhttps%253A%252F%252Fen.gravatar.com%252Fconnect%252F%253Faction%253Drequest_access_token");
          }
        },
        {
          text: "No Thanks",
          role: 'cancel'
        }
      ]
    });
    alert.present();

  }

  makeCall(number){
    console.log("call this number " + number);
  }


}
