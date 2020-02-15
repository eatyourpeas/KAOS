import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class UserprofileService {

  userProfile: any;

  constructor(private afs: AngularFirestore, private auth: AuthService) {
   }

   getUserProfile(user_id) {
      return this.afs.collection('UserProfiles', ref => ref.where('uid', '==', user_id)).snapshotChanges();
   }

  allActiveUsers() {
      return this.afs.collection('UserProfiles').snapshotChanges();
  }

  allUsers() {
    return this.afs.collection('UserProfiles').snapshotChanges();
  }

  userProfileForUserId(user_id): Promise<any> {
    return new Promise((resolve, reject) => {
      this.afs.collection('UserProfiles').valueChanges().subscribe(userProfile => {
        resolve(userProfile);
      });
    });
  }

  getCurrentUserProfile(): Promise<any> {
    return new Promise((resolve) => {
      this.auth.user.subscribe(user => {
        if (user) {
          this.afs.collection('UserProfiles').doc(user.uid).valueChanges().subscribe(profile => {
            resolve(profile);
          });
        } else {
          resolve(false);
        }
      });

    });
  }

  updateProfile(profile_id, profile): Promise<any> {
    return new Promise((resolve, reject) => {
      this.afs.collection('UserProfiles').doc(profile_id).update(profile).then(() => resolve(true)).catch(error => {
        reject(error.message);
      });
    });
  }

  deleteProfile(profile_id) {
    return this.afs.collection('UserProfiles').doc(profile_id).delete();
  }

  createProfile(user_id, profile) {
    return this.afs.collection('UserProfiles').doc(user_id).set(profile);
  }

  createNewUser(user_details) {
    return this.afs.collection('NewTempUsers').add(user_details);
  }

  updateFirstTime(user_id) {
    return this.afs.collection('UserProfiles').doc(user_id).update({first_time: false});
  }

  retireUser(user_id) {
    return this.afs.collection('UserProfiles').doc(user_id).update({retired: true});
  }

  activateUser(user_id) {
    return this.afs.collection('UserProfiles').doc(user_id).set({retired: false}, {merge: true});
  }
}
