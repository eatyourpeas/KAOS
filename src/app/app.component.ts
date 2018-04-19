import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
//import { Plugins } from '@capacitor/core';
import { AuthData } from '../providers/auth/auth';
import { UserProfileProvider } from '../providers/user-profile/user-profile';
import { AngularFireAuth } from 'angularfire2/auth';


@Component({
  templateUrl: 'app.html'
})

export class MyApp {

  @ViewChild(Nav) nav: Nav;

  rootPage: any = 'HomePage';
  //rootPage: any; //= LoginPage; -force login on open

  pages: Array<{title: string, component: any}>;
  email: any;
  isAuth: boolean = false;
  myAvatar: string;
  user_id: string;

  constructor(
    public platform: Platform,
    public afAuth: AngularFireAuth,
    private profileProvider: UserProfileProvider,
    public auth: AuthData
  )
  {
    this.initializeApp();

    //removed: public statusBar: StatusBar, public splashScreen: SplashScreen,
/*
    this.fcm.getToken().then(token => {
  // Your best bet is to here store the token on the user's profile on the
  // Firebase database, so that when you want to send notifications to this
  // specific user you can do it from Cloud Functions.
  });
*/

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Home', component: 'HomePage' },
      { title: 'About KAOS', component: 'AboutPage' },
      { title: 'Meet The Team', component: 'TeamMembersPage' },
      { title: 'Resources', component: 'ListPage' },
      { title: 'Quiz', component: 'QuizPage' }
    ];

    //this.auth = authD;

    /* required if forced log in on open

    const unsubscribe = firebase.auth().onAuthStateChanged( user => {
        if (!user) {
          this.rootPage = "LoginPage";
          unsubscribe();
        } else {
          this.rootPage = HomePage;
          unsubscribe();
        }
      });
    */



  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
  //    this.statusBar.styleDefault();
  //    this.splashScreen.hide();

      this.afAuth.authState.subscribe(res => {
        if (res && res.uid) {
          console.log("you are signed in");
          //you are signed in
          this.email = res.email;
          this.isAuth = true;
          this.user_id = res.uid;

          this.profileProvider.getAvatarURLForUserId(res.uid)
          .then(result =>{
            this.myAvatar = result;
          })
          .catch(()=>{
            this.myAvatar = "/assets/imgs/heads/doctor.jpg";
          })


        } else {
          console.log("you are not signed in");
          //redirect to login - should never be necessary - used if force login on open
        //  this.nav.setRoot("LoginPage");
        }
      });

    });
  }

  ionViewDidLoad(){

  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario

    // Ensure we can log out of Firebase and reset the root page
    if(page.component){
      this.nav.setRoot(page.component);
    } else {
      this.auth.logout();
      this.isAuth = false;
      //this.nav.setRoot("LoginPage"); - used if force login on open
    }

  }

  openSignOut(){
    //firebase.auth().signOut();
    this.auth.logout();
    this.isAuth = false;
    this.nav.setRoot('HomePage');
  }

  openSignIn(){
    this.nav.setRoot('LoginPage');
  }

  openRoster(){
    this.nav.setRoot('RosterPage');
  }

  editIdent(){
    this.nav.setRoot('IdentPage', {
      user_id: this.auth.getLoggedInUserId(),
      edit: true
    });
  }
}
