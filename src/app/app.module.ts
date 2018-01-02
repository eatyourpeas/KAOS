import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';

import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireDatabase, AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireModule } from "angularfire2";
import { AuthData } from "../providers/auth/auth"

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { QuizPage } from '../pages/quiz/quiz'
import { ListPage } from '../pages/list/list';
import { ContactsPage } from '../pages/contacts/contacts';
import { AboutPage } from '../pages/about/about';
import { TeamMembersPage } from '../pages/team-members/team-members';

import { LoginPage } from '../pages/login/login';
import { SignupPage } from '../pages/signup/signup';
import { ResetPasswordPage } from '../pages/reset-password/reset-password';


import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { DataProvider } from '../providers/data/data';
import { FlashCardComponent } from '../components/flashcard/flashcard';


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
    MyApp,
    HomePage,
    QuizPage,
    ListPage,
    FlashCardComponent,
    ContactsPage,
    AboutPage,
    TeamMembersPage,
    LoginPage,
    SignupPage,
    ResetPasswordPage
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    HttpModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    QuizPage,
    ListPage,
    ContactsPage,
    AboutPage,
    TeamMembersPage,
    LoginPage,
    SignupPage,
    ResetPasswordPage

  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    DataProvider,
    AngularFireDatabase,
    AuthData

  ]
})
export class AppModule {}
