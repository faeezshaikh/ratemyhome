import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';
import { ListPage } from '../pages/list/list';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { FirebaseProvider } from '../providers/firebase/firebase';

import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http'; 
import { AngularFireDatabaseModule } from 'angularfire2/database-deprecated';
import { AngularFireModule } from 'angularfire2';
import { DetailsPage } from '../pages/details/details';
import { MycontributionsPage } from '../pages/mycontributions/mycontributions';
import { ContributionDetailsPage } from '../pages/contribution-details/contribution-details';
import {AngularFireAuthModule } from 'angularfire2/auth';
import { LoginPage } from '../pages/login/login';
import { LoginProvider } from '../providers/login/login';
import { CustomizePlanPage } from '../pages/customize-plan/customize-plan';
import { PlansPage } from '../pages/plans/plans';

const firebaseConfig = {
  apiKey: "AIzaSyBDue_wbx8sEmNvUeev6uJgN6fgV5ahgmc",
  authDomain: "finebites-ab56b.firebaseapp.com",
  databaseURL: "https://finebites-ab56b.firebaseio.com",
  projectId: "finebites-ab56b",
  storageBucket: "",
  messagingSenderId: "478181878634"
};




@NgModule({
  declarations: [
    MyApp,
    ListPage,
    DetailsPage,
    CustomizePlanPage,
    MycontributionsPage,
    ContributionDetailsPage,
    LoginPage,
    PlansPage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    HttpClientModule,
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    AngularFireModule.initializeApp(firebaseConfig),
    IonicModule.forRoot(MyApp),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    ListPage,
    DetailsPage,
    CustomizePlanPage,
    MycontributionsPage,
    ContributionDetailsPage,
    LoginPage,
    PlansPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    FirebaseProvider,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    FirebaseProvider,
    LoginProvider
  ]
})
export class AppModule {}
