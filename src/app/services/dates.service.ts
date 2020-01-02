import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { UserprofileService } from '../services/userprofile.service';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class DatesService {

  constructor(
    private afs: AngularFirestore,
    private ups: UserprofileService) {
  }

  datesForUser(user_id: string) {
    return this.afs.collection('Dates', ref => ref.where('user', '==', user_id)).snapshotChanges();
  }

  allDates(start_filter, end_filter) {
    // let this_year = moment().year();
    // let january = moment().set({'date': 1, 'month': 0, 'year': this_year}).startOf('day');
    // return this.afs.collection("Dates", ref=>ref.where("date","<", january.toDate())).snapshotChanges();
    return this.afs.collection('Dates', ref => ref.where('date', '>=', start_filter).where('date', '<=', end_filter)).snapshotChanges();
  }

  updateDate(date_id, fields) {
    return this.afs.collection('Dates').doc(date_id).update(fields);
  }

  monthsFromThisYear() {
    const this_year = moment().year();
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const all_year = months.map(a => {
      return {
        format: a + ' ' + this_year,
        month: a,
        year: this_year
      };
    });
    return all_year;
  }

  datesFromThisYear() {
    const this_year = moment().year();
    const january = moment().set({'date': 1, 'month': 0, 'year': this_year}).startOf('day');
    const all_year = [];
    const day_one = {
      day: january.toDate(),
      format: january.format('ddd Do MMM YYYY'),
      moment: january,
      user: '',
      user_name: ''
    };

    // this.afs.collection("Dates").add(day_one);
    all_year.push(day_one);
    while (january.year() == this_year) {

      const new_day = january.add(1, 'days');
      const new_obj = {
        day: new_day.toDate(),
        format: new_day.format('ddd Do MMM YYYY'),
        user: '',
        user_name: ''
      };
//      this.afs.collection("Dates").add(new_obj);

      all_year.push(new_obj);
    }

    return all_year;
  }

  allocateNewDate(date: Date, user_id: string, user_name: string, email: string): Promise<any> {
    const date_at_midnight = moment(date).startOf('day');
    return new Promise((resolve, reject) => {
      const new_date = {
        date: date_at_midnight.toDate(),
        user: user_id,
        user_name: user_name,
        email: email
      };
      this.afs.collection('Dates').add(new_date).then(allocation => {
        resolve(allocation);
      }).catch(error => {
        reject(error.message);
      });
    });
  }

  updateExistingDate(date_uid: string, user_id: string, user_name: string, email: string): Promise<any> {
    return new Promise((resolve, reject) => {
      const new_date = {
        'user': user_id,
        'user_name': user_name,
        'email': email
      };

      this.afs.collection('Dates').doc(date_uid).update(new_date).then(() => {
        resolve(true);
      }).catch(error => {
        reject(error);
      });
    });
  }

  createNewDatesForYear() {
    const first = moment("01-01-2020").startOf('D');
    const end = moment('12-31-2020').startOf('D');
    let batch = this.afs.firestore.batch();
    while (first.isSameOrBefore(end)){
      const new_date = {
        'date': first.clone().toDate(),
        'user': '',
        'user_name': '',
        'email': ''
      };
      const ref = this.afs.firestore.collection('Dates').doc(this.afs.createId());
      batch.set(ref, new_date);
      first.add(1, 'day');
    }
    return batch.commit();
  }
}
