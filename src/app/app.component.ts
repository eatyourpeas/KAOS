import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { QuizPage } from '../pages/quiz/quiz'
import { ListPage } from '../pages/list/list';
import { TeamMembersPage } from '../pages/team-members/team-members';
import { ContactsPage } from '../pages/contacts/contacts';
import { AboutPage } from '../pages/about/about';

import { LoginPage } from '../pages/login/login';

//import { AuthData } from '../providers/auth/auth';
import firebase from 'firebase';
import { AngularFireAuth } from 'angularfire2/auth';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = HomePage;
  //rootPage: any; //= LoginPage; -force login on open

  pages: Array<{title: string, component: any}>;
  email: any;
  isAuth: boolean = false;

  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen, public afAuth: AngularFireAuth) {
    this.initializeApp();
  //  firebase.initializeApp(firebaseConfig);

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Home', component: HomePage },
      { title: 'About KAOS', component: AboutPage },
      { title: 'Meet The Team', component: TeamMembersPage },
      { title: 'Resources', component: ListPage },
      { title: 'Quiz', component: QuizPage },
      { title: 'Useful Contacts', component: ContactsPage }
    ];

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
      this.statusBar.styleDefault();
      this.splashScreen.hide();

      this.afAuth.authState.subscribe(res => {
        if (res && res.uid) {
          //you are signed in
          this.email = res.email;
          this.isAuth = true;
        } else {

          //redirect to login - should never be necessary - used if force login on open
        //  this.nav.setRoot("LoginPage");
        }
      });

    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario

    // Ensure we can log out of Firebase and reset the root page
    if(page.component){
      this.nav.setRoot(page.component);
    } else {
      firebase.auth().signOut();
      this.isAuth = false;
      //this.nav.setRoot("LoginPage"); - used if force login on open
    }

  }

  openSignOut(){
    firebase.auth().signOut();
    this.isAuth = false;
  }

  openSignIn(){
    this.nav.setRoot(LoginPage);
  }
}
