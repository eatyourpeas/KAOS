import { Injectable } from '@angular/core';

import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { Observable } from 'rxjs/Observable';
import md5 from 'crypto-md5';
import { AngularFirestore } from 'angularfire2/firestore'
//import {  AngularFirestoreCollection } from 'angularfire2/firestore';

export interface UserProfile { id: string, title: string, first_name: string, second_name: string, uid: string, role: string, secondary_role: string, service: string, bio: string, mobile: string, admin: boolean, avatar: string, first_time: boolean }

@Injectable()
export class AuthData {
  user: firebase.User;
  userProfile: Observable<UserProfile[]>
  permitted : string[] = [
    "lizwatt@nhs.net",
    "jennifer.kalitsi@nhs.net",
    "joan.walters@nhs.net",
    "sarah.clyne@nhs.net",
    "elin.fuller@nhs.net",
    "sreenadas@nhs.net",
    "tushar.vince@nhs.net",
    "marianne.samyn@nhs.net",
    "simon.chapman@nhs.net",
    "hannahbaynes1@nhs.net",
    "philip.kelly1@nhs.net",
    "jemma.johns@nhs.net",
    "duncanbew@nhs.net",
    "e.hamlyn@nhs.net",
    "subarna.chakravorty@nhs.net",
    "katehunt2@nhs.net",
    "emer.sutherland@nhs.net",
    "d.joshi@nhs.net",
    "fleur.cantle@nhs.net"
  ];

  constructor(private firebaseAuth: AngularFireAuth, public afs: AngularFirestore) {
    firebaseAuth.authState.subscribe(user=>{
      this.user = user;
    });
  }

  signup(email: string, password: string) {
      return this.firebaseAuth
        .auth
        .createUserWithEmailAndPassword(email, password)
        .then((newUser) => {
          //console.log('Success!');
          let hash = md5(email.toLowerCase(), 'hex');
          let final_url = "https://gravatar.com/avatar/" + hash + "?d=mm";

          const newUserProfile = {
            uid: newUser.uid,
            email: newUser.email,
            centre: "Kings Denmark Hill",
            title: "",
            first_name: "",
            second_name: "",
            role: "",
            secondary_role: "",
            service: "",
            mobile: "",
            bio: "",
            admin: false,
            avatar: final_url,
            first_time: true
          };
          this.afs.collection('UserProfiles').add(newUserProfile);
        })
        .then((newUser)=>{
          console.log("new profile created");
          return "Success";
        })
        .catch(err => {
          //console.log('Something went wrong:',err.message);
          return err.message;
        });
  }

  login(email: string, password: string): Promise<any> {
    return this.firebaseAuth
      .auth
      .signInWithEmailAndPassword(email, password);
  }

  resetPassword(email: string){
    return this.firebaseAuth
    .auth
    .sendPasswordResetEmail(email)
    .then(value=>{
      console.log('reset email sent');
    })
    .catch(err=>{
      console.log('something went wrong');
    });
  }

  logout() {
    this.firebaseAuth
      .auth
      .signOut();
  }

  getLoggedInUserId(){
    return this.firebaseAuth.auth.currentUser.uid;
  }

  isLoggedIn(): boolean{
    return this.user !== null;
  }

}
