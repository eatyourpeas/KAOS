import {Injectable} from '@angular/core';
import firebase from 'firebase';
//import { HttpClientModule } from '@angular/common/http';

@Injectable()
export class AuthData {
  constructor() {}

  public currentuser: any;

  loginUser(email: string, password: string): Promise<any> {
    this.currentuser = firebase.auth().signInWithEmailAndPassword(email, password);
    return this.currentuser;
  }

  signupUser(email: string, password: string): Promise<any> {
    return firebase
    .auth()
    .createUserWithEmailAndPassword(email, password)
    .then( newUser => {
      firebase
      .database()
      .ref('/userProfile')
      .child(newUser.uid)
      .set({ email: email });
    });
  }

  logoutUser(): Promise<void> {
    return firebase.auth().signOut();
  }

  resetPassword(email: string): Promise<void> {
    return firebase.auth().sendPasswordResetEmail(email);
  }

}
