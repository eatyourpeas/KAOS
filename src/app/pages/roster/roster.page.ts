import { Component, OnInit, ViewChild } from '@angular/core';
import { AlertController, ToastController, IonItemSliding, IonContent } from '@ionic/angular'
import { AuthService } from "../../services/auth.service";
import { DatesService } from "../../services/dates.service";
import { UserprofileService } from "../../services/userprofile.service";
import * as moment from 'moment';


@Component({
  selector: 'app-roster',
  templateUrl: './roster.page.html',
  styleUrls: ['./roster.page.scss'],
})
export class RosterPage implements OnInit {

  @ViewChild(IonItemSliding) itemSliding: IonItemSliding;
  @ViewChild(IonContent) content: IonContent;

  //user_dates;
  user_id;
  all_dates;
  this_year_dates;
  all_my_dates;
  all_users;
  all_profiles;

  select_years;
  this_month;
  monthNames = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];

  constructor(
    private authService: AuthService,
    private datesService: DatesService,
    private userProfileService: UserprofileService,
    private alertController: AlertController,
    private toastController: ToastController
  ) {

    let end_of_this_month = moment().endOf('month').startOf('day');
    let start_of_this_month = moment().startOf('month').startOf('day');

    this.userProfileService.allUsers().subscribe(profiles=>{
      this.all_profiles = profiles;
    });

  this.select_years = this.datesService.monthsFromThisYear();
  let month = moment().month();
  let year = moment().year();

  this.this_month = this.monthNames[month] + " " + year;

  this.authService.user.subscribe(user=>{
    this.user_id = user.uid;
    this.datesService.datesForUser(this.user_id).subscribe(snap=>{
      this.all_my_dates = snap.map(date=>{
        let uid = date.payload.doc.id;
        let day = date.payload.doc.data()["date"].toDate();
        let format = date.payload.doc.data()["format"];
        return {uid, day, format};
      }).sort((a,b)=> {
        return a.day - b.day;
      });
    });
    this.runQuery(start_of_this_month.toDate(), end_of_this_month.toDate());
  })

}

runQuery(start_date: Date, end_date: Date){
  this.datesService.allDates(start_date, end_date).subscribe(snap=>{
    let today = "";
    this.all_dates = snap.map(date=>{
      let uid = date.payload.doc.id;
      let not_timestamp = date.payload.doc.data()["date"].toDate();
      let moment_date = moment(not_timestamp).startOf("day");
      if(moment_date.isSame(moment().startOf('day'))){
        today = "dark";
      } else {
        today = "";
      }
      if(moment_date.weekday()==0 || moment_date.weekday()==6){
        today = "light"; //this is a weekend
      }
      let match = this.all_my_dates.some(date=>{
        return moment(date.day).isSame(moment_date);
      });
      if(match){
        today = "tertiary";
      }
      let data = date.payload.doc.data();
      return { uid, not_timestamp, today,  ...data };
    }).sort((a,b)=>{
      return a.not_timestamp - b.not_timestamp;
    });
  });
}

  ngOnInit() { }

  selectMonth(){
    let split_string = this.this_month.split(" ");
    let month = split_string[0];
    let month_number = this.monthNames.indexOf(month);
    let year = split_string[1];
    let start_selected_month = moment().year(year).month(month_number).date(1).startOf('day');
    let end_of_selected_month = start_selected_month.clone().endOf('month').startOf('day');
    this.runQuery(start_selected_month.toDate(), end_of_selected_month.toDate());
  }

  swap(date){
    console.log(date);
  }

  allocate(date){
    this.showDialog(date);
    // this.authService.auth.user.subscribe(res=>{
    //   let uid = res.uid;
    //   this.datesService.addNewDate(date, uid)
    // })
  }

  // getMyDates(){
  //   this.authService.user.subscribe(user=>{
  //     this.datesService.datesForUser(user.uid).subscribe(myDates=>{
  //         if(myDates){
  //           this.user_dates = myDates.map(date=>{
  //             let uid = date.payload.doc.id;
  //             let day = date.payload.doc.data()["date"].toDate();
  //             let format = date.payload.doc.data()["format"];
  //             return {uid, day, format};
  //           }).sort((a,b)=> {
  //             return a.day - b.day;
  //           })
  //       }
  //     });
  //   });
  // }

  // myDates(){
  //   let string = "";
  //   this.user_dates.sort((a,b)=>{return a.day - b.day}).forEach(day=>{
  //     string += day.format + " ";
  //   });
  //   console.log(string)
  //   if(string == ""){
  //     string = "You have no allocated dates yet."
  //   }
  //   this.alertController.create({
  //     subHeader:
  //   })
  // }

  async showDialog(date){
    let options = [];
    this.all_profiles.forEach(profile=>{
      let option = {
        type: 'radio',
        label: profile.title + " " + profile.first_name + " " + profile.second_name,
        value: {
          uid: profile.uid,
          name: profile.title + " " + profile.first_name + " " + profile.second_name
        }
      }
      options.push(option);
    });
    this.alertController.create({
      subHeader: "Select User",
      inputs: options,
      buttons:[{
        text: "Allocate",
        handler:(data)=>{
          console.log(data.uid + " " + data.name + " " + date.day)
          this.itemSliding.closeOpened();
          if(data){ //did select a user to allocate
            if(date.uid == ""){ //there is no allocated date yet
              this.datesService.allocateNewDate(date.day, data.uid, data.name).then(response=>{
                //should update
                console.log(response)
              }).catch(error=>{
                this.toastController.create({
                  message: error,
                  duration: 3000
                }).then(toast=>{
                  toast.present();
                })
              });
            } else { //there is already an allocated date
              console.log("there is an existing record")
              this.datesService.updateExistingDate(date.uid, data.uid, data.name).then(response=>{
                //should update
                console.log(response)
              }).catch(error=>{
                this.toastController.create({
                  message: error,
                  duration: 3000
                }).then(toast=>{
                  toast.present();
                })
              });
            }

          }
        }
      },{
        text: "Cancel"
      }]
    }).then(alert=>{
      alert.present();
    });
  }



}
