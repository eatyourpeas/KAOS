import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { AngularFirestore } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import { AuthData } from '../../providers/auth/auth';
import { DatesProvider } from '../../providers/dates/dates'
import { UserProfileProvider } from '../../providers/user-profile/user-profile';
import moment from 'moment';


export interface RosterDate { id?: string, user: string, date: Date };
export interface RosterDetails { date: string, user_id: string, user_title: string, user_first_name: string, user_second_name: string, user_email: string, user_mobile: string, user_isAdmin: boolean};
export interface RosterDateFormat { year: number, month: number, date: number }
export interface SwapRequest { id?: string, request_date: Date, requester_id: string, requester_name: string, requester_email: string, recipient_id: string, recipient_name: string, recipient_email: string, swap_from_date_id: string, swap_from_date: string, swap_to_date_id: string, swap_to_date: string, notification: boolean, consumed: boolean, consumed_timestamp: Date }

@IonicPage()
@Component({
  selector: 'page-roster',
  templateUrl: 'roster.html',
})


export class RosterPage {

  currentEvents=[];
  roster_date: string;
  selectedDate: Date;
  selectedDateID: string;
//  thisWeeksDates;
  currentUser: any;
  firstdate: Date;
  seconddate: Date;
  loggedInUserName: string;
  loggedInUserEmail: string;

  swapAlertDate;
  swapAlertDates=[];
  swapRequest : SwapRequest;
  thereAreOutstandingSwaps: boolean;
  outstandingSwaps = [];
  numberOfOutstandingSwaps = 0;
  swapsForAlert = [];

  KAOSClinicianOnCall;
  KAOSClinicianOnCallUID;
  KAOSClinicianOnCallEmail;

  loggedInUserIsAdmin = false;
  thereIsAKAOSClinicianAvailableToday = false;
  KAOSClinicians = [];

//  rosterDetails: RosterDetails;
  thisWeeksRoster = [];
  myEvent: RosterDateFormat;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public alertCtrl: AlertController,
    public datesProvider: DatesProvider,
    public userProfileProvider: UserProfileProvider,
    public auth: AuthData,
    public afs: AngularFirestore
) {

  }

  addRosterDate(){

    this.userProfileProvider.getAllProfiles().subscribe(res=>{
      res.forEach(doc=>{
        let KAOSClinician = {
          type: 'radio',
          label: doc.title + " " + doc.first_name + " " + doc.second_name,
          value: doc.uid
        }
        this.KAOSClinicians.push(KAOSClinician);
      });

      let prompt = this.alertCtrl.create({
          title: 'Allocate Shift on ' + this.roster_date,
          message: 'Select KAOS Clinician',
          inputs : this.KAOSClinicians,
          buttons: [
            {
              text: 'Cancel',
              handler: (data: any) => {
                console.log('Cancel clicked');
                this.KAOSClinicians = [];
              }
            },
            {
              text: 'Save',
              handler: (data: any) => {

                const rosterDate: RosterDate = {
                  user: data,
                  date: this.selectedDate
                }
                this.datesProvider.addDateForUser(rosterDate);
                this.KAOSClinicians = [];
              }
            }
          ]
        })
    prompt.present();
    })
  }

  ionViewWillEnter(){
    this.getAllUserDates()
      .then(res=>{
        this.currentEvents = [];
        this.currentEvents = res;
      })
      .catch(error =>{ console.log(error)});

    this.getThisWeeksDates()
      .then(res =>{
        this.thisWeeksRoster = [];
        this.thisWeeksRoster = res;
      })
      .catch(error =>{
        console.log(error)
    });
    this.getOutstandingSwaps()
      .then()
      .catch(error =>{ console.log(error)});
  }

  ionViewDidLoad() {

    this.userProfileProvider.getProfileForUser(this.auth.getLoggedInUserId()).subscribe(res =>{
      if(res[0]){
        this.loggedInUserIsAdmin = res[0].admin;
        this.loggedInUserName = res[0].title + " " + res[0].first_name + " " + res[0].second_name;
        this.loggedInUserEmail = res[0].email;
      }
    });
  }

  onDaySelect(e){
    this.selectedDate = new Date(e.year, e.month, e.date);
    this.roster_date = moment(this.selectedDate).format("ddd DD MMM YYYY"); //this is the date string for the UI

    this.datesProvider.getUserForDate(this.selectedDate).subscribe(res=>{
      if(res.length > 0){
        this.selectedDateID = res[0].id; //id of selected date
        this.userProfileProvider.getProfileForUser(res[0].user).subscribe(result => {
          if(result[0]){
            this.KAOSClinicianOnCall = result[0].title + " " + result[0].first_name + " " + result[0].second_name;
            this.KAOSClinicianOnCallUID = result[0].uid;
            this.KAOSClinicianOnCallEmail = result[0].email;
            if(this.KAOSClinicianOnCallUID != this.auth.getLoggedInUserId()){
                this.thereIsAKAOSClinicianAvailableToday = true;
            } else {
              this.thereIsAKAOSClinicianAvailableToday = false;
            }
          } else {
            this.KAOSClinicianOnCall = "Unregistered Clinician is on call today";
          }
        })
      } else {
        this.thereIsAKAOSClinicianAvailableToday = false;
        this.KAOSClinicianOnCall = "There is no one on call today.";
      }
    })
  }

  requestSwap(){

    if (this.KAOSClinicianOnCallUID == ""){
      console.log("there is no clinician on call today");
      return;
    }
    if(this.auth.getLoggedInUserId() == this.KAOSClinicianOnCallUID){
      console.log("you can't swap with yourself");
      return;
    }
    if(this.KAOSClinicianOnCall){

      //which date do you want to swap against dialog
      let prompt = this.alertCtrl.create({
      title: 'Swap Request',
      message: 'Which date are you offering in return?',
      inputs : this.swapAlertDates,
      buttons: [
                  {
                    text: 'Cancel',
                    handler: (data: any) => {
                      console.log('Cancel clicked');
                    }
                  },
                  {
                    text: 'Swap',
                    handler: (selection: any) => {
                      //make the swap

                      let swap_from_date = "";
                      this.swapAlertDates.forEach(swap=>{
                        if(swap.value == selection[0]){
                          swap_from_date = swap.label;
                        }
                      });

                      this.swapRequest = {
                        request_date: new Date(),
                        requester_id: this.auth.getLoggedInUserId(),
                        requester_name: this.loggedInUserName,
                        requester_email: this.loggedInUserEmail,
                        recipient_id: this.KAOSClinicianOnCallUID,
                        recipient_name: this.KAOSClinicianOnCall,
                        recipient_email: this.KAOSClinicianOnCallEmail,
                        swap_from_date_id: selection[0],
                        swap_from_date: swap_from_date,
                        swap_to_date_id: this.selectedDateID,
                        swap_to_date: moment(this.selectedDate).format("ddd DD MMM YYYY"),
                        notification: false,
                        consumed: false,
                        consumed_timestamp: null
                      }

                      this.datesProvider.saveSwapRequest(this.swapRequest).then(doc =>{
                        console.log("swap request saved");
                        let toast = this.alertCtrl.create({
                          title: "KAOS Swap",
                          message: "Your swap request has been sent to " + this.KAOSClinicianOnCall,
                          buttons:[
                            {
                              text: "OK",
                              handler:()=>{

                              }
                            }
                          ]
                        });
                        toast.present();
                      }).catch(error =>{
                        console.log(error);
                      });
                    }
                  }
                ]
        })
        prompt.present();


    } else {
      console.log("there is noone to swap with");
    }
  }

  onMonthSelect(e){

  }

  swap(){
    let prompt = this.alertCtrl.create({
    title: 'Outstanding Swap Requests',
    message: 'Which swap are you agreeing to?',
    inputs : this.swapsForAlert,
    buttons: [
                {
                  text: 'Cancel',
                  handler: (data: any) => {
                    console.log('Cancel clicked');
                  }
                },
                {
                  text: 'Accept',
                  handler: (selection: any) => {

                    for(let i=0; i<selection.length; i++){

                      let swap = this.datesProvider.getSwap(selection[i]);

                      swap.subscribe(returnedSwap =>{ //must only cycle here once
                          //update the from date which comes which from the requester
                          returnedSwap.forEach(eachReturnedSwap=>{
                            let newFromDate: RosterDate = {
                              user: eachReturnedSwap.recipient_id, //is now the recipient
                              date: new Date(eachReturnedSwap.swap_from_date)
                            }

                            //update the to date which comes from the recipient
                            let newToDate: RosterDate = {
                              user: eachReturnedSwap.requester_id, //is now the requester
                              date: new Date(eachReturnedSwap.swap_to_date)
                            }

                            this.datesProvider.updateDate(eachReturnedSwap.swap_from_date_id, newFromDate);
                            this.datesProvider.updateDate(eachReturnedSwap.swap_to_date_id, newToDate);
                            this.datesProvider.consumeSwap(selection[i]);
                            this.numberOfOutstandingSwaps --;
                            if(this.numberOfOutstandingSwaps == 0){
                              this.thereAreOutstandingSwaps = false;
                            } else {
                              this.thereAreOutstandingSwaps = true;
                            }
                          })
                      });
                    }
                    this.getAllUserDates().then(res=>{console.log("now got all the user dates again")});;
                    this.getThisWeeksDates().then(res=>{console.log("now got this weeks dates again")});;
                    this.getOutstandingSwaps().then(res=>{console.log("now got the outstanding swaps again")});
                  }
                }
              ]
      })
      prompt.present();
  }
  doRefresh(refresher){

    this.getOutstandingSwaps().then(res=>{ refresher.complete()})
    this.getThisWeeksDates();
    this.getAllUserDates();
  }

  getThisWeeksDates(): Promise<any>{
    let thisWeeksRosterNow = [];
    return new Promise<any>((resolve, reject)=>{
    let thisWeeksDates = this.datesProvider.getThisWeeksDates().subscribe(res=>{
      if(res.length > 0){
        res.forEach(doc =>{
          this.userProfileProvider.getProfileForUser(doc.user).subscribe(res =>{
            let rosterDetails = {
              date: moment(doc.date).format("ddd DD MMM YYYY"),
              user_id: doc.user,
              user_title: res[0].title,
              user_first_name: res[0].first_name,
              user_second_name: res[0].second_name,
              user_email: res[0].email,
              user_mobile: res[0].mobile,
              user_isAdmin: res[0].admin
            }
            thisWeeksRosterNow.push(rosterDetails);
          })
        })
        resolve(thisWeeksRosterNow);
      } else {
        resolve(thisWeeksRosterNow) //superfluous - there are no dates
      }
      reject("should not get this far")
    });
  });
}



  getAllUserDates(): Promise<any>{
    this.swapAlertDates = [];
    let myCurrentEvents = []
    return new Promise<any>((resolve, reject)=>{
      this.datesProvider.getAllDatesForUserId(this.auth.getLoggedInUserId()).subscribe(res=>{
        if(res != null){
          res.forEach(my_roster =>{

            let anEvent = {
              year: my_roster.date.getFullYear(),
              month: my_roster.date.getMonth(),
              date: my_roster.date.getDate()
            }

            myCurrentEvents.push(anEvent);

            this.swapAlertDate = {
              value: my_roster.id,
              type: "checkbox",
              label: moment(my_roster.date).format("ddd DD MMM YYYY"),
            } //my on call dates for swap alert

            this.swapAlertDates.push(this.swapAlertDate); //these are the dates for the alert
          });

          resolve(myCurrentEvents);
        } else {
          resolve(myCurrentEvents);
        }
        reject("should never get here");
      });
    })

  }

  getOutstandingSwaps():Promise<any>{
    this.swapsForAlert = [];
    return new Promise<any>((resolve, reject)=>{
      this.datesProvider.outstandingSwaps(this.auth.getLoggedInUserId())
      .subscribe(res => {
        if(res.length > 0){
          this.thereAreOutstandingSwaps = true;
          this.numberOfOutstandingSwaps = res.length;
          res.forEach(swap =>{
            let newSwap = {
              value: swap.id,
              type: "checkbox",
              label: swap.requester_name + "\'s " + swap.swap_from_date
            }
            this.swapsForAlert.push(newSwap);
          });
          resolve(this.swapsForAlert);
        } else {
          resolve(this.swapsForAlert);
        }
        reject("should never get here");
      });
    });
  }

}
