import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
//import { AngularFireDatabase } from 'angularfire2/database';

import { AngularFirestore } from 'angularfire2/firestore'
//import {  AngularFirestoreCollection } from 'angularfire2/firestore';

import { AuthData } from '../../providers/auth/auth';
import { DatesProvider } from '../../providers/dates/dates'
import { UserProfileProvider } from '../../providers/user-profile/user-profile';
import moment from 'moment';
import { SMS } from '@ionic-native/sms';
import { FirebaseMessagingProvider } from '../../providers/firebase-messaging/firebase-messaging';

export interface RosterDate { id: string, user: string, date: Date };
export interface RosterDetails { date: string, user_id: string, user_title: string, user_first_name: string, user_second_name: string, user_email: string, user_mobile: string, user_isAdmin: boolean};
export interface RosterDateFormat { year: number, month: number, date: number }

@IonicPage()
@Component({
  selector: 'page-roster',
  templateUrl: 'roster.html',
})


export class RosterPage {

  currentEvents=[];
  roster_date: string;
  newDate: Date;
  thisWeeksDates;
  currentUser: any;

  private authP : AuthData;

  //private usersCollection: AngularFirestoreCollection;
  KAOSClinicianOnCall;
  KAOSClinicianOnCallUID;
  KAOSClinicianOnCallMobile;
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
    private sms: SMS,
    public fbmessaging: FirebaseMessagingProvider) {
    this.authP = auth;
  }

  ionViewWillEnter(){
    this.fbmessaging.returnMessage();
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

            const id = this.afs.createId();
            const rosterDate: RosterDate = {
              id: id,
              user: data,
              date: this.newDate
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
          this.currentEvents.push(this.myEvent);
        })
      }
    });
  }

  onDaySelect(e){
    this.newDate = new Date(e.year, e.month, e.date);
    this.roster_date = moment(this.newDate).format("ddd DD MMM YYYY"); //this is the date string for the UI

    this.datesProvider.getUserForDate(this.newDate).subscribe(res=>{
      if(res.length > 0){
        this.userProfileProvider.getProfileForUser(res[0].user).subscribe(result => {
          if(result[0]){
            this.KAOSClinicianOnCall = result[0].title + " " + result[0].first_name + " " + result[0].second_name;
            this.KAOSClinicianOnCallUID = result[0].uid;
            this.KAOSClinicianOnCallMobile = result[0].mobile;
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
    if(this.KAOSClinicianOnCallMobile != ""){
      console.log("i am calling " + this.KAOSClinicianOnCallMobile);
    //  this.sms.send(this.KAOSClinicianOnCallMobile, "Hello test call");

    } else {
      console.log("there is noone to swap with");
    }
  }

  onMonthSelect(e){

  }


}
