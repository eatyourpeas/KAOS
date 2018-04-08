import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
//import { AngularFireDatabase } from 'angularfire2/database';

import { AngularFirestore } from 'angularfire2/firestore'
//import {  AngularFirestoreCollection } from 'angularfire2/firestore';

import { AuthData } from '../../providers/auth/auth';
import { DatesProvider } from '../../providers/dates/dates'
import { UserProfileProvider } from '../../providers/user-profile/user-profile';
import moment from 'moment';
//import { SMS } from '@ionic-native/sms';
//import { FirebaseMessagingProvider } from '../../providers/firebase-messaging/firebase-messaging';
//import { Http, Headers, RequestOptions } from '@angular/http';


export interface RosterDate { id?: string, user: string, date: Date };
export interface RosterDetails { date: string, user_id: string, user_title: string, user_first_name: string, user_second_name: string, user_email: string, user_mobile: string, user_isAdmin: boolean};
export interface RosterDateFormat { year: number, month: number, date: number }
export interface SwapRequest { id?: string, request_date: Date, requester_id: string, requester_name: string, recipient_id: string, recipient_name: string, swap_from_date_id: string, swap_from_date: string, swap_to_date_id: string, swap_to_date: string, notification: boolean, consumed: boolean, consumed_timestamp: Date }

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
  thisWeeksDates;
  currentUser: any;
  firstdate: Date;
  seconddate: Date;
  loggedInUserName: string;

  swapAlertDate;
  swapAlertDates=[];
  swapRequest : SwapRequest;
  thereAreOutstandingSwaps: boolean;
  outstandingSwaps = [];
  numberOfOutstandingSwaps = 0;
  swapsForAlert = [];

  private authP : AuthData;

  //private usersCollection: AngularFirestoreCollection;
  KAOSClinicianOnCall;
  KAOSClinicianOnCallUID;
  KAOSClinicianOnCallEmail;

  loggedInUserIsAdmin = false;
  thereIsAKAOSClinicianAvailableToday = false;
  KAOSClinicians = [];

  rosterDetails: RosterDetails;
  thisWeeksRoster = [];
  myEvent: RosterDateFormat;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public alertCtrl: AlertController,
    public datesProvider: DatesProvider,
    public userProfileProvider: UserProfileProvider,
    public auth: AuthData,
    public afs: AngularFirestore,
  //  private sms: SMS,
    //public fbmessaging: FirebaseMessagingProvider,
    //public http: Http
) {
    this.authP = auth;
  }

  ionViewWillEnter(){

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

  ionViewDidLoad() {

    this.userProfileProvider.getProfileForUser(this.authP.getLoggedInUserId()).subscribe(res =>{
      if(res[0]){
        this.loggedInUserIsAdmin = res[0].admin;
        this.loggedInUserName = res[0].title + " " + res[0].first_name + " " + res[0].second_name;
      }
    });

    this.thisWeeksDates = this.datesProvider.getThisWeeksDates().subscribe(res=>{
      if(res.length > 0){
        res.forEach(doc =>{
          this.userProfileProvider.getProfileForUser(doc.user).subscribe(res =>{
            this.rosterDetails = {
              date: moment(doc.date).format("ddd DD MMM YYYY"),
              user_id: doc.user,
              user_title: res[0].title,
              user_first_name: res[0].first_name,
              user_second_name: res[0].second_name,
              user_email: res[0].email,
              user_mobile: res[0].mobile,
              user_isAdmin: res[0].admin
            }
            this.thisWeeksRoster.push(this.rosterDetails);
          })
        })
      }
    });

    this.datesProvider.getAllDatesForUserId(this.authP.getLoggedInUserId()).subscribe(res=>{
      if(res != null){
        res.forEach(my_roster =>{
          this.myEvent = {
            year: my_roster.date.getFullYear(),
            month: my_roster.date.getMonth(),
            date: my_roster.date.getDate()
          }
          this.currentEvents.push(this.myEvent); //my on call dates for UI

          this.swapAlertDate = {
            value: my_roster.id,
            type: "checkbox",
            label: moment(my_roster.date).format("ddd DD MMM YYYY"),
          } //my on call dates for swap alert

          this.swapAlertDates.push(this.swapAlertDate);
        })
      }
    });

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
        })
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
            if(this.KAOSClinicianOnCallUID != this.authP.getLoggedInUserId()){
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
    if(this.authP.getLoggedInUserId() == this.KAOSClinicianOnCallUID){
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
                        recipient_id: this.KAOSClinicianOnCallUID,
                        recipient_name: this.KAOSClinicianOnCall,
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

                    let swap = this.datesProvider.getSwap(selection[0]);

                    swap.subscribe(returnedSwap =>{

                      //update the from date which comes which from the requester
                      let newFromDate: RosterDate = {
                        user: returnedSwap[0].recipient_id, //is now the recipient
                        date: new Date(returnedSwap[0].swap_to_date)
                      }

                      //update the to date which comes from the recipient
                      let newToDate: RosterDate = {
                        user: returnedSwap[0].requester_id, //is now the requester
                        date: new Date(returnedSwap[0].swap_from_date)
                      }

                      this.datesProvider.updateDate(returnedSwap[0].swap_from_date_id, newFromDate);
                      this.datesProvider.updateDate(returnedSwap[0].swap_to_date_id, newToDate);
                      this.datesProvider.consumeSwap(selection[0]);
                      this.numberOfOutstandingSwaps --;
                      if(this.numberOfOutstandingSwaps == 0){
                        this.thereAreOutstandingSwaps = false;
                      } else {
                        this.thereAreOutstandingSwaps = true;
                      }
                    });
                  }
                }
              ]
      })
      prompt.present();
  }


}
