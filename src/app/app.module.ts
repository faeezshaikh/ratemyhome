import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { FirebaseProvider } from '../providers/firebase/firebase';

import { HttpModule } from '@angular/http';
import { AngularFireDatabaseModule } from 'angularfire2/database-deprecated';
import { AngularFireModule } from 'angularfire2';
import { IcodetailsPage } from '../pages/icodetails/icodetails';
import { ContributePage } from '../pages/contribute/contribute';
import { MycontributionsPage } from '../pages/mycontributions/mycontributions';
import { ContributionDetailsPage } from '../pages/contribution-details/contribution-details';

const firebaseConfig = {
  apiKey: "AIzaSyDYKbBWdcmhEVRBUPeEQA1aklPATJfK-Wc",
  authDomain: "poolico-86069.firebaseapp.com",
  databaseURL: "https://poolico-86069.firebaseio.com",
  projectId: "poolico-86069",
  storageBucket: "",
  messagingSenderId: "740732068871"
};


@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ListPage,
    IcodetailsPage,
    ContributePage,
    MycontributionsPage,
    ContributionDetailsPage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    AngularFireDatabaseModule,
    AngularFireModule.initializeApp(firebaseConfig),
    IonicModule.forRoot(MyApp),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ListPage,
    IcodetailsPage,
    ContributePage,
    MycontributionsPage,
    ContributionDetailsPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    FirebaseProvider,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    FirebaseProvider
  ]
})
export class AppModule {}
