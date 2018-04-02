import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { UserProfileProvider } from '../../providers/user-profile/user-profile';
import { AuthData } from '../../providers/auth/auth';

@IonicPage()
@Component({
  selector: 'page-team-members',
  templateUrl: 'team-members.html',
})

export class TeamMembersPage {

  team_members;
  userId;
  isAuth: boolean = false;
  avatar;

  constructor(public navCtrl: NavController, public navParams: NavParams, public userProfileProvider: UserProfileProvider, private auth: AuthData){
    this.userProfileProvider.getAllProfiles().subscribe(res =>{
      this.team_members = res;
    })

  }

  onSelect(user_id){

    var editable = false;
    if(this.auth.isLoggedIn()){
      if(user_id == this.auth.getLoggedInUserId()){ //if you are logged in and you selected yourself, you can edit your own profile but no one else's
        editable = true;
      }
    }

    this.navCtrl.push('IdentPage', {
      user_id: user_id,
      edit: editable
    })

  }

  avatarForId(userId){
    this.userProfileProvider.getAvatarURLForUserId(userId)
    .then(result=>{
      this.avatar = result;
    })
    .catch(()=>{
      this.avatar = "assets/imgs/heads/doctor.jpg";
    })
  }

  ionViewDidLoad() {
    if(this.auth.isLoggedIn()){
      this.isAuth = true;
    } else {
      this.isAuth = false;
    }

  }

}
