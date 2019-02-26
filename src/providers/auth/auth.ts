import { Injectable } from '@angular/core';

import { AngularFireAuth } from 'angularfire2/auth';
//import firebase from 'firebase'; //previouse
import * as firebase from 'firebase/app';
//import { Observable } from 'rxjs/Observable';
//import md5 from 'crypto-md5';
//import { AngularFirestore } from 'angularfire2/firestore'
//import {  AngularFirestoreCollection } from 'angularfire2/firestore';
//import * as md5 from 'crypto-md5';

export interface UserProfile { id: string, title: string, first_name: string, second_name: string, uid: string, role: string, secondary_role: string, service: string, bio: string, mobile: string, admin: boolean, avatar: string, first_time: boolean, token: [string] }

@Injectable()
export class AuthData {
  user: firebase.User;
//  userProfile: Observable<UserProfile[]>
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
    "fleur.cantle@nhs.net",
    "barney.dunn@nhs.net"
  ];

  repopulate = [{
    "email": "kimona.colthrust@nhs.net",
    "uid": "1UMWw4J5SZZAN3VUpIB4gJv6dCC2"
  },
  {
    "email":"lizwatt@nhs.net",
    "uid":"anIUJFCfWcUwW6ZfRuVgqj07vMx1"
  },
  {
    "email":"jennifer.kalitsi@nhs.net",
    "uid":"bSUagcDrHvWjiVrpTvCgThh93g82"
  },
  {
    "email":"joan.walters@nhs.net",
    "uid":"4T1w66XRsta9s7bDLZGsirpnS1G3"
  },
  {
      "email":"sarah.clyne@nhs.net",
      "uid":"rpWVC7oAYycvj9rtThXIcQtJJ5P2"
  },
  {
    "email":"elin.fuller@nhs.net",
    "uid":"fUrnWqjeE0VC1LwDYDtc8u5KWxu1"
  },
  {
    "email":"sreenadas@nhs.net",
    "uid":"5bXBgcgS3hUmUGrmVv66POGd5yr2"
  },
  {
    "email":"tushar.vince@nhs.net",
    "uid":"E8rrLka0S3M3GY9GPv1HvtcJwac2"
  },
  {
    "email":"marianne.samyn@nhs.net",
    "uid":"6JCq5Mx3AFdC2v1Q3iR5QNmbY1R2"
  },
  {
    "email": "simon.chapman@nhs.net",
    "uid":"8ZpI89i47IM9TSzHIqrV1xm6eIr1"
  },
  {
    "email": "hannahbaynes1@nhs.net",
    "uid":"lPVpE8IXGcMpCU3Xj4qf1LZn1qv1"
  },
  {
    "email": "philip.kelly1@nhs.net",
    "uid":"8zUxsApKGedOtbLmauRXTWRkK0W2"
  },
  {
    "email": "jemma.johns@nhs.net",
    "uid":"ztRnQTHHPPeNWQyzhGbSGARAF4j2"
  },
  {
    "email": "duncanbew@nhs.net",
    "uid":"NeAw7UGBKFUJHWgxofVC4eNx8pK2"
  },
  {
    "email": "subarna.chakravorty@nhs.net",
    "uid":"wH78LblDwHT5rcAYSzhGnFyyvAH2"
  },
  {
    "email": "katehunt2@nhs.net",
    "uid":"5WHsmBGhC8TbgIa6W4rY6kzrUwy1"
  },
  {
    "email": "emer.sutherland@nhs.net",
    "uid":"eFqvz6S4tlWjuPTIgimg7h0NRx82"
  },
  {
    "email": "d.joshi@nhs.net",
    "uid":"OZ1YWpImEsW9AeHElp4HBypIbaR2"
  },
  {
    "email": "fleur.cantle@nhs.net",
    "uid":"eUjkNpXEVIdUhMCvSDw3jJ60n3y1"
  },
  {
    "email": "barney.dunn@nhs.net",
    "uid":"sFhRdXLDDmXdpsnyGqASvhMnhkJ2"
  }
];

  constructor(private firebaseAuth: AngularFireAuth) {
    firebaseAuth.authState.subscribe(user=>{
      this.user = user;
    });
  }

  signup(email: string, password: string) {
      return this.firebaseAuth
        .auth
        .createUserWithEmailAndPassword(email, password)
  /*      .then((newUser) => { ///this now happens in the cloud
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
            first_time: true,
            token: []
          };
          this.afs.collection('UserProfiles').add(newUserProfile);
        })*/
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

  getLoggedInUserEmail(){
    return this.firebaseAuth.auth.currentUser.email;
  }

  isLoggedIn(): boolean{
    return this.user !== null;
  }

  oneOffCreateProfile(){
    /*
    this.repopulate.forEach(res=>{
      let hash = md5(res.email.toLowerCase(), 'hex');
      let final_url = "https://gravatar.com/avatar/" + hash + "?d=mm";
      const newUserProfile = {
        uid: res.uid,
        email: res.email,
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
        first_time: true,
        token: []
      };
      let db = this.afs.collection('UserProfiles').doc(res.uid);
      db.set(newUserProfile);

    })
    */
  }

}
