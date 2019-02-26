import { Component } from '@angular/core';
import { SwUpdate } from '@angular/service-worker';
import { Platform, ToastController } from '@ionic/angular';
import { AuthService } from './services/auth.service';
import { UserprofileService } from './services/userprofile.service';
import { Router } from '@angular/router';
// import { SplashScreen } from '@ionic-native/splash-screen/ngx';
// import { StatusBar } from '@ionic-native/status-bar/ngx';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {
  public appPages = [
    {
      title: 'Home',
      url: '/home',
      icon: 'home'
    },
    {
      title: 'Resources',
      url: '/list',
      icon: 'list'
    },
    {
      title: 'Quiz',
      url: '/quiz',
      icon: 'help'
    },
    {
      title: 'Meet the Team',
      url: '/team-members',
      icon: 'people'
    },
    {
      title: 'About KAOS',
      url: '/about',
      icon: 'information-circle'
    }
  ];

  deferredPrompt;
  user_profiles
  user_person

  constructor(
    private platform: Platform,
    // private splashScreen: SplashScreen,
    // private statusBar: StatusBar,
    private toastController: ToastController,
    private swUpdate: SwUpdate,
    private authService: AuthService,
    private router: Router,
    private userProfile: UserprofileService
  ) {
    this.initializeApp();
    authService.auth.authState.subscribe(user=>{
      if(user){
        this.user_person = user;
        userProfile.getUserProfile(user.uid).subscribe(profiles=>{
          this.user_profiles = profiles.map(profile=>{
            let uid = profile.payload.doc.id;
            let data = profile.payload.doc.data();
            return {uid, ...data};
          });
        })
      }
    })

  }

  initializeApp() {
    this.platform.ready().then(() => {

      if(this.swUpdate.isEnabled){
        this.swUpdate.available.subscribe(()=>{
          this.toastController.create({
            message: "New RotaNinja version available. Reloading...",
            duration: 2000
          })
          .then(toast=>{
            toast.present().then(()=>{
              window.location.reload();
            })
          });
        });
      }

      window.addEventListener('beforeinstallprompt', (e) => {
        console.log('beforeinstallprompt Event fired');
        // Prevent Chrome 67 and earlier from automatically showing the prompt
        e.preventDefault();
        // Stash the event so it can be triggered later.
        this.deferredPrompt = e;
        // Update UI notify the user they can add to home screen
        this.showInstallBanner();
      });

      if(!window.navigator.onLine){
        this.toastController.create({
          message: "You are offline...",
          duration: 2000
        })
        .then(toast=>{
          toast.present();
        });
      }
    });
  }


  showInstallBanner() {
    if (this.deferredPrompt !== undefined && this.deferredPrompt !== null) {
      // Show the prompt
      this.deferredPrompt.prompt();
      // Wait for the user to respond to the prompt
      this.deferredPrompt.userChoice
      .then((choiceResult) => {
        if (choiceResult.outcome === 'accepted') {
          console.log('User accepted the A2HS prompt');
        } else {
          console.log('User dismissed the A2HS prompt');
        }
        // We no longer need the prompt.  Clear it up.
        this.deferredPrompt = null;
      });
    }
  }

  signOut(){
    this.authService.signOut().then(res=>{
      if(res){
        this.router.navigate(['home']);
      }
    });
  }
}
