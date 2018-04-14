//import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore'
import {  AngularFirestoreCollection } from 'angularfire2/firestore';
import { AuthData } from '../auth/auth';
import { Observable } from 'rxjs/Observable';
import moment from 'moment';
import * as firebase from 'firebase/app';

/*
  Generated class for the DatesProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/

export interface RosterDate { id?: string, user: string, date: Date }
export interface SwapRequest { id?: string, request_date: Date, requester_id: string, requester_name: string, requester_email: string, recipient_id: string, recipient_name: string, recipient_email: string, swap_from_date_id: string, swap_from_date: string, swap_to_date_id: string, swap_to_date: string, notification: boolean, consumed: boolean, consumed_timestamp: Date }

@Injectable()
export class DatesProvider {

  rosterDates: Observable<RosterDate[]>
  private datesCollection: AngularFirestoreCollection<RosterDate>
  private swapsCollection: AngularFirestoreCollection<SwapRequest>

  constructor(public afs: AngularFirestore, auth: AuthData) {

  }

  addDateForUser(rosterDate: RosterDate){
    this.datesCollection = this.afs.collection('Dates');
    return this.datesCollection.add(rosterDate);
  }

  getUserForDate(date: Date){
    this.datesCollection = this.afs.collection<RosterDate>('Dates', ref => ref.where("date", "==", date));
    this.rosterDates = this.datesCollection.snapshotChanges().map(actions =>{
      return actions.map(action =>{
        const data = action.payload.doc.data() as RosterDate;
        const id = action.payload.doc.id;
        return { id, ...data };
      })
    });
    return this.rosterDates;
  }

  dateForDateID(dateid){
    this.datesCollection = this.afs.collection<RosterDate>('Dates', ref => ref.where("id", "==", dateid));
    return this.datesCollection.snapshotChanges();
  }

  getThisWeeksDates(){
    let today = new Date();
    //let dayOfWeek = moment(today).day(); //1 = monday
    let startOfWeek = moment(today).startOf('isoWeek') //Monday
    let endOfWeek = moment(today).endOf('isoWeek')//Friday
    //let roster_range
    this.datesCollection = this.afs.collection<RosterDate>('Dates', ref => ref.where("date", ">=", startOfWeek.toDate()).where("date", "<=", endOfWeek.toDate()));
    this.rosterDates = this.datesCollection.snapshotChanges().map(actions =>{
      return actions.map(action =>{
        const data = action.payload.doc.data() as RosterDate;
        const id = action.payload.doc.id;
        return { id, ...data };
      })
    });
    return this.rosterDates;
  }

  getAllDatesForUserId(userId: string):Observable<RosterDate[]>{

      this.datesCollection = this.afs.collection<RosterDate>('Dates', ref => ref.where("user", "==", userId).orderBy("date"));
      this.rosterDates = this.datesCollection.snapshotChanges().map(actions =>{
        return actions.map(action =>{
          const data = action.payload.doc.data() as RosterDate;
          const id = action.payload.doc.id;
          return { id, ...data };
        })
      });
      return this.rosterDates;

  }

  saveSwapRequest(swapRequest: SwapRequest){
    this.swapsCollection = this.afs.collection<SwapRequest>('SwapRequests');
    return this.swapsCollection.add(swapRequest);
  }

  outstandingSwaps(user_id){

    this.swapsCollection = this.afs.collection<SwapRequest>('SwapRequests', ref => ref.where('recipient_id', "==", user_id).where('consumed', "==", false));
    return this.swapsCollection.snapshotChanges().map(actions =>{
      return actions.map(action =>{
        const data = action.payload.doc.data() as SwapRequest;
        const id = action.payload.doc.id;
        return { id, ...data };
      })
    });
  }

  getSwap(swap_id: string){

    this.swapsCollection = this.afs.collection<SwapRequest>('SwapRequests', ref => ref.where(firebase.firestore.FieldPath.documentId(), "==", swap_id));
    return this.swapsCollection.snapshotChanges().map(actions =>{
      return actions.map(action =>{
        const data = action.payload.doc.data() as SwapRequest;
        const id = action.payload.doc.id;
        return { id, ...data };
      })
    });



  }

  updateDate(date_id, newDateObj){
    this.datesCollection = this.afs.collection<RosterDate>('Dates');
    this.datesCollection.doc(date_id).update(newDateObj).then(updateObj=>{
      console.log("updated!")
    }).catch(error=>{console.log(error)})
  }

  consumeSwap(swap_id){
    this.swapsCollection = this.afs.collection<SwapRequest>('SwapRequests');
    this.swapsCollection.doc(swap_id).update({consumed: true}).then(updatedObj=>{console.log("consumed")}).catch(error=>{console.log(error)});
  }

}
