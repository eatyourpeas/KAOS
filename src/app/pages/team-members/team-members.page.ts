import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { UserprofileService } from '../../services/userprofile.service';
import { AuthService } from '../../services/auth.service';
import { AlertController, ToastController, IonList } from '@ionic/angular';

@Component({
  selector: 'app-team-members',
  templateUrl: './team-members.page.html',
  styleUrls: ['./team-members.page.scss'],
})
export class TeamMembersPage implements OnInit {

  @ViewChild('slidingList') slidingList: IonList;
  profiles;
  my_profile;


  constructor(
    private userProfileService: UserprofileService,
    private alertController: AlertController,
    private toastController: ToastController,
    private authService: AuthService,
    private router: Router) { }

  ngOnInit() {
    this.authService.user.subscribe(user => {
        this.userProfileService.allActiveUsers().subscribe(snap => {
          this.profiles = snap.map(userProfile => {
            const uid = userProfile.payload.doc.id;
            const data: any = userProfile.payload.doc.data();
            const last_name: string = userProfile.payload.doc.data()['second_name'];
            let noEmail = true;
            let noMobile = true;
            if (userProfile.payload.doc.data()['email'].length > 0) {
              noEmail = false;
            }
            if (userProfile.payload.doc.data()['mobile'].length > 0) {
              noMobile = false;
            }
            if (user) {
              if (uid == user.uid) {
                this.my_profile = {uid, last_name, noMobile, noEmail, ...data};
              }
            }
            return {uid, last_name, noMobile, noEmail, ...data};
          }).sort((a, b) => {
            return a.last_name < b.last_name ? -1 : 1;
          });

        }); // end subscribe

        // .then(profiles=>{
        //   this.profiles = profiles.map(profile=>{
        //     let noEmail = true;
        //     let noMobile = true;
        //     if(profile.email.length > 0){
        //       noEmail = false;
        //     }
        //     if(profile.mobile.length > 0){
        //       noMobile = false;
        //     }
        //     if(user){
        //       if(profile.uid == user.uid){
        //         this.my_profile = profile;
        //       }
        //     }
        //     return {noEmail, noMobile, ...profile};
        //   });
        // });

    });

  }

  clickedMobile(mobile) {
    this.slidingList.closeSlidingItems();
    this.alertController.create({
      message: '<a href='+ mobile +' \' style=\'color: black; text-decoration: none;\'>'+ mobile +'</a>',
      buttons: [{
        text: 'Cancel'
      }]
    }).then(alert => {
      alert.present();
    });
  }

  clickedEmail(email) {
    this.slidingList.closeSlidingItems();
    this.alertController.create({
      message: '<a href=\'mailto:'+ email +'\' style=\'color: black; text-decoration: none;\'>'+ email +'</a>',
      buttons: [{
        text: 'Cancel'
      }]
    }).then(alert => {
      alert.present();
    });
  }

  createNewKAOSMember() {
    this.alertController.create({
      header: 'KAOS',
      subHeader: 'New Member',
      inputs: [{
        name: 'email',
        type: 'text',
        placeholder: 'email address'
      },
      {
        name: 'first_name',
        type: 'text',
        placeholder: 'first name'
      },
      {
        name: 'second_name',
        type: 'text',
        placeholder: 'second name'
      },
      {
        name: 'role',
        type: 'text',
        placeholder: 'role'
      },
      {
        name: 'secondary_role',
        type: 'text',
        placeholder: 'KAOS role'
      }],
      buttons: [{
        text: 'OK',
        handler: (data) => {
          // this.generateNewAccount(data);
          data.password = 'password';
          this.generateNewAccount(data);
        }
      }, 'Cancel']
    }).then(alert => {
      alert.present();
    });
  }

  deleteAccount(profile_id) {
    this.slidingList.closeSlidingItems();
    this.userProfileService.deleteProfile(profile_id).then(() => {
      // the account will be removed in the cloud
      this.toastController.create({
        message: 'KAOS Account Deleted!',
        duration: 1000
      }).then(toast => {
        toast.present();
      });
    });
  }

  retireAccount(profile_id) {
    this.slidingList.closeSlidingItems();
    this.userProfileService.retireUser(profile_id)
    .then(() => {
      this.toastController.create({
        message: 'Account retired',
        duration: 1000
      }).then(toast => {toast.present(); });
    })
    .catch(error => {
      this.toastController.create({
        message: error.message,
        duration: 1000
      }).then(toast => {toast.present(); });
    });
  }

  activateAccount(profile_id) {
    this.slidingList.closeSlidingItems();
    this.userProfileService.activateUser(profile_id)
    .then(() => {
      this.toastController.create({
        message: 'Account activated!',
        duration: 1000
      }).then(toast => {toast.present(); });
    })
    .catch(error => {
      this.toastController.create({
        message: error.message,
        duration: 1000
      }).then(toast => {toast.present(); });
    });
  }

  generateNewAccount(data) {
    this.slidingList.closeSlidingItems();
    this.userProfileService.createNewUser(data).then(user => {
      this.toastController.create({
        message: 'Account created for ' + data.first_name + ' ' + data.second_name,
        duration: 1000
      }).then(toast => {toast.present(); });
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
