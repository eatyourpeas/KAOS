import { Component, OnInit, ViewChild } from '@angular/core';
import { AlertController, ToastController, IonItemSliding, IonContent } from '@ionic/angular'
import { AuthService } from '../../services/auth.service';
import { DatesService } from '../../services/dates.service';
import { UserprofileService } from '../../services/userprofile.service';
import * as moment from 'moment';


@Component({
  selector: 'app-roster',
  templateUrl: './roster.page.html',
  styleUrls: ['./roster.page.scss'],
})
export class RosterPage implements OnInit {

  @ViewChild(IonItemSliding) itemSliding: IonItemSliding;
  @ViewChild(IonContent) content: IonContent;

  // user_dates;
  user_id;
  all_dates;
  this_year_dates;
  all_my_dates;
  all_users;
  all_profiles;

  select_years;
  this_month;
  monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  showSpinner: boolean;

  constructor(
    private authService: AuthService,
    private datesService: DatesService,
    private userProfileService: UserprofileService,
    private alertController: AlertController,
    private toastController: ToastController
  ) {

    const end_of_this_month = moment().endOf('month').startOf('day');
    const start_of_this_month = moment().startOf('month').startOf('day');

    this.userProfileService.allUsers().subscribe(snap => {
      this.showSpinner = false;
      this.all_profiles = snap.map(profile => {
        const uid: string = profile.payload.doc.id;
        const data: any = profile.payload.doc.data();
        const surname = profile.payload.doc.data()['second_name'];
        return {uid, surname, ... data };
      }).sort((a, b) => (a.surname < b.surname) ? -1 : 1);
    });

  this.select_years = this.datesService.monthsFromThisYear();
  const month = moment().month();
  const year = moment().year();

  this.this_month = this.monthNames[month] + ' ' + year;

  this.authService.user.subscribe(user => {
    this.user_id = user.uid;
    this.datesService.datesForUser(this.user_id).subscribe(snap => {
      this.all_my_dates = snap.map(date => {
        const uid = date.payload.doc.id;
        const day = date.payload.doc.data()['date'].toDate();
        const format = date.payload.doc.data()['format'];
        return {uid, day, format};
      }).sort((a, b) => {
        return a.day - b.day;
      });
    });
    this.runQuery(start_of_this_month.toDate(), end_of_this_month.toDate());
  });
}

runQuery(start_date: Date, end_date: Date) {
  this.showSpinner = true;
  this.datesService.allDates(start_date, end_date).subscribe(snap => {
    this.showSpinner = false;
    let today = '';
    this.all_dates = snap.map(date => {
      const uid = date.payload.doc.id;
      const not_timestamp = date.payload.doc.data()['date'].toDate();
      const moment_date = moment(not_timestamp).startOf('day');
      const formatFromDate = moment_date.format('ddd Do');
      if (moment_date.isSame(moment().startOf('day'))) {
        today = 'dark';
      } else {
        today = '';
      }
      if (moment_date.weekday() === 0 || moment_date.weekday() === 6) {
        today = 'light'; // this is a weekend
      }

      const match = this.all_my_dates.some(date => {
        return moment(date.day).isSame(moment_date);
      });
      if (match) {
        today = 'tertiary';
      }
      const data: any = date.payload.doc.data();
      return { uid, not_timestamp, today, formatFromDate,  ... data };
    }).sort((a, b) => {
      return a.not_timestamp - b.not_timestamp;
    });
  });
}

  ngOnInit() { }

  selectMonth() {
    const split_string = this.this_month.split(' ');
    const month = split_string[0];
    const month_number = this.monthNames.indexOf(month);
    const year = split_string[1];
    const start_selected_month = moment().year(year).month(month_number).date(1).startOf('day');
    const end_of_selected_month = start_selected_month.clone().endOf('month').startOf('day');
    this.runQuery(start_selected_month.toDate(), end_of_selected_month.toDate());
  }

  swap(date) {
    console.log(date);
  }

  allocate(date) {
    this.showDialog(date);
  }

  async showDialog(date) {
    const options = [];
    this.all_profiles.forEach(profile => {
      const option = {
        type: 'radio',
        label: profile.title + ' ' + profile.first_name + ' ' + profile.second_name,
        value: {
          uid: profile.uid,
          name: profile.title + ' ' + profile.first_name + ' ' + profile.second_name,
          email: profile.email
        }
      }
      options.push(option);
    });

    this.alertController.create({
      subHeader: 'Select User',
      inputs: options,
      buttons: [{
        text: 'Allocate',
        handler: (data) => {
          console.log(data)
          this.itemSliding.closeOpened();
          if (data) { // did select a user to allocate
            if (date.uid === '') { // there is no allocated date yet
             this.datesService.allocateNewDate(date.day, data.uid, data.name, data.email).then(response => {
                // should update
              }).catch(error => {
                this.toastController.create({
                  message: error,
                  duration: 3000
                }).then(toast => {
                  toast.present();
                })
              }); // end catch
            } else { // there is already an allocated date
              this.datesService.updateExistingDate(date.uid, data.uid, data.name, data.email).then(response => {
                // should update
                console.log(response)
              }).catch(error => {
                this.toastController.create({
                  message: error,
                  duration: 3000
                }).then(toast => {
                  toast.present();
                })
              }); // end catch
            }

          }
        }
      }, {
        text: 'Cancel'
      }]
    }).then(alert => {
      alert.present();
    });
  }

  start() {

  }

  wholeYear() {
    this.datesService.createNewDatesForYear().then(() => {
      console.log('success');
    }).catch(error => {
      console.log(error.message);
      
    });
  }

}
