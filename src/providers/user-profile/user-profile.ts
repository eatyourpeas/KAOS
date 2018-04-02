import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore'
import {  AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import md5 from 'crypto-md5';

/*
  Generated class for the UserProfileProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/

export interface UserProfile { id: string, title: string, first_name: string, second_name: string, uid: string, role: string, secondary_role: string, service: string, bio: string, mobile: string, admin: boolean, email: string, centre: string, first_time: boolean }

@Injectable()
export class UserProfileProvider {

  userProfiles: Observable<UserProfile[]>
  //userProfile: Observable<UserProfile>
  userProfileCollection: AngularFirestoreCollection<UserProfile>
  myAvatar;

  constructor(public http: HttpClient, public afs: AngularFirestore) {
    this.userProfileCollection = afs.collection('UserProfiles');
  }

  getProfileForUser(user_id: string): Observable<UserProfile[]>{
    this.userProfileCollection = this.afs.collection<UserProfile>('UserProfiles', ref => ref.where("uid", "==", user_id))
    this.userProfiles = this.userProfileCollection.snapshotChanges().map(actions =>{
      return actions.map(action =>{
        const data = action.payload.doc.data() as UserProfile;
        const id = action.payload.doc.id;
        return { id, ...data };
      })
    });

    return this.userProfiles;

  }

  updateProfile(profile_id: string, newProfile: any){
    return this.userProfileCollection.doc(profile_id).update(newProfile);
  }

  getAllProfiles(){
    this.userProfileCollection = this.afs.collection<UserProfile>('UserProfiles', ref => ref.orderBy("second_name"));
    return this.userProfileCollection.valueChanges(); /*.map(actions =>{
      return actions.map(action =>{
        const data = action.payload.doc.data() as UserProfile;
        const id = action.payload.doc.id;
        return { id, ...data };
      })
    });
    */
    //return this.userProfiles;
  }

getAvatarURLForUserId(user_id: string): Promise<string>{

    return new Promise((resolve, reject) =>{
      let myProfile = this.getProfileForUser(user_id);
      myProfile.subscribe(res =>{
        let myEmail = res[0].email.toLowerCase();
        let hash = md5(myEmail, 'hex');
        let final_url = "https://gravatar.com/avatar/" + hash + "?d=mm";
        resolve(final_url);
        reject("/assets/imgs/heads/doctor.jpg");
      });
    })

}

getAvatarURLForEmail(email: string): string{
  let hash = md5(email.toLowerCase(), 'hex');
  let final_url = "https://gravatar.com/avatar/" + hash + "?d=mm";
  return final_url;
}

userIsLoggingInForFirstTime(user_id): Promise<boolean>{

  return new Promise((resolve, reject)=>{
    let myProfile = this.getProfileForUser(user_id);
    myProfile.subscribe(res =>{
      if(res[0]){
        if(res[0].first_time){
          resolve(true);
        } else {
          resolve(false);
        }
      } else {
        reject(false);
      }
    })
  });
}

setUserHasLoggedInForFirstTimeAndChangedPassword(user_id): Promise<boolean>{
  return new Promise((resolve, reject)=>{
    let myProfile = this.getProfileForUser(user_id);
    myProfile.subscribe(res =>{
      res[0].first_time = false;
      let profile_id = res[0].id;
      this.userProfileCollection.doc(profile_id).update(res[0]).then(updatedObj =>{
        if(updatedObj){
          resolve(true);
        } else {
          resolve(false);
        }
      })
    })
  });
}

}
