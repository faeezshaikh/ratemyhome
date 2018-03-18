import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

// import {AngularFireAuth } from 'angularfire2/auth';
// import * as firebase from 'firebase/app';
// import { ListPage } from '../list/list';
// import { FirebaseProvider } from '../../providers/firebase/firebase';
import { LoginProvider } from '../../providers/login/login';
// import { PlansPage } from '../plans/plans';
import * as firebase from 'firebase/app';
import { CheckOrderStatusPage } from '../check-order-status/check-order-status'


@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  rootPage: any = CheckOrderStatusPage; // This is overriden by the rootPage in app.component.ts
  // toastMsg:any;
 
  constructor(public navCtrl: NavController, public navParams: NavParams,
    private login: LoginProvider) {
      // this.toastMsg = this.toast;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  loginWithFacebook() {
    this.login.loginWithFacebook()
    // .then(res => {
    //   this.navCtrl.setRoot(this.rootPage);
    // })
    .then( () => {
      firebase.auth().getRedirectResult().then( result => {
        // var token = result.credential.accessToken;
        // var user = result.user;
        console.log("Got Facebook Redirect Result:" , result);
      }).catch(function(error) {
        console.log(error.message);
      });
    })
    
    .catch(function(error) {
      console.log("Error with Facebook:" ,error.message);
    });
  }

  logoutOfFacebook() {
    this.login.logoutOfFacebook();
    this.navCtrl.setRoot(LoginPage);
  }

  loginWithGoogle() {
    this.login.loginWithGoogle().then(res => {
      this.navCtrl.setRoot(this.rootPage);
    }).catch(function(error) {
      console.log("Error with Google:" ,error.message);
    });;
  }
  loginWithTwitter() {
    // let that = this;
    console.log('Calling login with Twitter');
    this.login.loginWithTwitter().then(res => {
      this.navCtrl.setRoot(this.rootPage);
    }).catch(function(error) {
      console.log("Error with Twitter:" ,error.message);
      // that.toastMsg(error.message,7000);
    });
  }

}
