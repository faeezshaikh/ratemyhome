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
import {AngularFireAuthModule } from 'angularfire2/auth';
import { LoginPage } from '../pages/login/login';
import { LoginProvider } from '../providers/login/login';
import { PlansPage } from '../pages/plans/plans';
import { CartPage } from '../pages/cart/cart';
import { Stripe } from '@ionic-native/stripe';
import { CheckoutPage } from '../pages/checkout/checkout';
import { CheckOrderStatusPage } from '../pages/check-order-status/check-order-status';
import {AngularGooglePlaceModule} from 'angular-google-place';

const firebaseConfig = {
  apiKey: "AIzaSyAzT9HZCjvdeVnFBvDk48HaCDOcFX0LA30",
  authDomain: "ratemyhome-ceeb9.firebaseapp.com",
  databaseURL: "https://ratemyhome-ceeb9.firebaseio.com",
  projectId: "ratemyhome-ceeb9",
  storageBucket: "",
  messagingSenderId: "980899854920"
};




@NgModule({
  declarations: [
    MyApp,
    ListPage,
    DetailsPage,
    MycontributionsPage,
    LoginPage,
    PlansPage,
    CartPage,
    CheckoutPage,
    CheckOrderStatusPage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    HttpClientModule,
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    AngularGooglePlaceModule,
    AngularFireModule.initializeApp(firebaseConfig),
    IonicModule.forRoot(MyApp),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    ListPage,
    DetailsPage,
    MycontributionsPage,
    LoginPage,
    PlansPage,
    CartPage,
    CheckoutPage,
    CheckOrderStatusPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    FirebaseProvider,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    FirebaseProvider,
    LoginProvider,
    Stripe
  ]
})
export class AppModule {}
