import { Component, OnInit } from '@angular/core';
import { UserprofileService } from '../../services/userprofile.service';
import { AuthService } from '../../services/auth.service';
import { ToastController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-walk-through',
  templateUrl: './walk-through.page.html',
  styleUrls: ['./walk-through.page.scss'],
})
export class WalkThroughPage implements OnInit {

  profile;
  progress;
  first_time: boolean = true;

  constructor(private userProfileService: UserprofileService,
    private authService: AuthService,
    private router: Router,
    private toastController: ToastController) {
    authService.user.subscribe(user=>{
      this.userProfileService.userProfileForUserId(user.uid).then(profile=>{
        this.profile = profile;
        if(profile.first_time){
          this.progress = "Update Password";
        } else {
          this.progress = "Got It!";
          this.first_time = false;
        }
      })
    });
  }

  ngOnInit() {

  }

  gotIt(){
    if(this.first_time){
      this.userProfileService.updateFirstTime(this.profile.uid).then(()=>{
        this.router.navigate(['reset-password']);
      }).catch(error=>{
        this.toastController.create({
          message: error.message,
          duration: 3000
        }).then(toast=>{
          toast.present();
        });
      });
    } else {
      this.router.navigate(['home']);
    }
  }

}
