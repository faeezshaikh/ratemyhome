import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { MycontributionsPage } from '../pages/mycontributions/mycontributions';
import { LoginPage } from '../pages/login/login';
// import { FirebaseProvider } from '../providers/firebase/firebase';
import * as firebase from 'firebase/app';
import { PlansPage } from '../pages/plans/plans';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = PlansPage;
  name:string;
  email:string;
  pic:string;

  pages: Array<{title: string, component: any,icon:string}>;

  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen) {
    this.initializeApp();
  

    this.pages = [
      { title: 'Shop Plans', component: PlansPage, icon:'fa fa-cart-plus' },
      { title: 'My Profile', component: MycontributionsPage, icon:'fa fa-users' }
    ];

  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      console.log('In Platform ready.....');
      
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      this.statusBar.backgroundColorByHexString('#FF00FF');
      this.statusBar.overlaysWebView(false);
      
   
      let that = this;
      firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
          // User is signed in.
          that.nav.setRoot(that.rootPage);
          console.log('Found user logged in!!. User details :' ,user);
          that.name = user.displayName;
          that.email = user.email;
          that.pic = user.photoURL;
          
          
        } else {
          // No user is signed in.
          that.nav.setRoot(that.rootPage);
          // that.pic = "assets/imgs/finebites-logo.png";
          // that.nav.setRoot(LoginPage);
        }
      });



      ////// Experiment ///////
      // firebase.auth().getRedirectResult().then(function(result) {
      //   if (result.credential) {
      //     var token = result.credential.accessToken;
      //     var user = result.user;
      //     console.log(token, user);

      //     that.nav.setRoot(that.rootPage);
      //     console.log('Found user logged in. User details :' ,user);
      //     that.name = user.displayName;
      //     that.email = user.email;
      //     that.pic = user.photoURL;

      //   }
      // }).catch(function(error) {
      //   // Handle Errors here.
      //   var errorMessage = error.message;
      //   console.log(errorMessage);
      //    // No user is signed in.
      //    that.nav.setRoot(LoginPage);
      // });

      ////// Experiment Till here ///////




    },err => {
      console.log("Errr in Platform ready",err);
      
    }).catch(e => {
      console.log('In Platform ready catch',e);
      
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    // this.foo(page);
    this.nav.setRoot(page.component);
  }
}
