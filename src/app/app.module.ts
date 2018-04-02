import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';
import { SMS } from '@ionic-native/sms';

import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireDatabase, AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireModule } from "angularfire2";

import { AngularFirestoreModule } from "angularfire2/firestore"
import { AuthData } from "../providers/auth/auth"
import { MyApp } from './app.component';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { DataProvider } from '../providers/data/data';
import { WardsProvider } from '../providers/wards/wards';
import { UserProfileProvider } from '../providers/user-profile/user-profile';
import { DatesProvider } from '../providers/dates/dates';
import { FirebaseMessagingProvider } from '../providers/firebase-messaging/firebase-messaging';


export const firebaseConfig = {
  apiKey: "AIzaSyCnyK7t8ZphNQxkxwzJiKReYGVv03NFMoE",
  authDomain: "kaos-1514072349785.firebaseapp.com",
  databaseURL: "https://kaos-1514072349785.firebaseio.com",
  projectId: "kaos-1514072349785",
  storageBucket: "kaos-1514072349785.appspot.com",
  messagingSenderId: "409614203748"
};

@NgModule({
  declarations: [
    MyApp
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    HttpModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    AngularFirestoreModule.enablePersistence()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    DataProvider,
    AngularFireDatabase,
    AuthData,
    WardsProvider,
    UserProfileProvider,
    DatesProvider,
    SMS,
    FirebaseMessagingProvider
  ]
})
export class AppModule {}
