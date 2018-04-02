//import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore'
import {  AngularFirestoreCollection } from 'angularfire2/firestore';
import { AuthData } from '../auth/auth';
import { Observable } from 'rxjs/Observable';
import moment from 'moment';

/*
  Generated class for the DatesProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/

export interface RosterDate { id: string, user: string, date: Date }

@Injectable()
export class DatesProvider {

  rosterDates: Observable<RosterDate[]>
  private datesCollection: AngularFirestoreCollection<RosterDate>

  constructor(public afs: AngularFirestore, auth: AuthData) {
    // console.log('Hello DatesProvider Provider');


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

  getAllDatesForUserId(userId: string){
    this.datesCollection = this.afs.collection<RosterDate>('Dates', ref => ref.where("user", "==", userId));
    this.rosterDates = this.datesCollection.snapshotChanges().map(actions =>{
      return actions.map(action =>{
        const data = action.payload.doc.data() as RosterDate;
        const id = action.payload.doc.id;
        return { id, ...data };
      })
    });
    return this.rosterDates;
  }

}
