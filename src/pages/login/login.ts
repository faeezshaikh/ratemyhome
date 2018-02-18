import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';

// import {AngularFireAuth } from 'angularfire2/auth';
// import * as firebase from 'firebase/app';
// import { ListPage } from '../list/list';
// import { FirebaseProvider } from '../../providers/firebase/firebase';
import { LoginProvider } from '../../providers/login/login';
import { PlansPage } from '../plans/plans';


@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  rootPage: any = PlansPage; // This is overriden by the rootPage in app.component.ts
  toastMsg:any;
 
  constructor(public navCtrl: NavController, public navParams: NavParams, private toast:ToastController,
    private login: LoginProvider) {
      this.toastMsg = this.toast;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  loginWithFacebook() {
    let that = this;
    this.login.loginWithFacebook().then(res => {
      this.navCtrl.setRoot(this.rootPage);
    }).catch(function(error) {
      console.log("Error with Facebook:" ,error.message);
      that.toastMsg(error.message,7000);
    });;
  }

  logoutOfFacebook() {
    this.login.logoutOfFacebook();
    this.navCtrl.setRoot(LoginPage);
  }

  loginWithGoogle() {
    let that = this;
    this.login.loginWithGoogle().then(res => {
      this.navCtrl.setRoot(this.rootPage);
    }).catch(function(error) {
      console.log("Error with Google:" ,error.message);
      that.toastMsg(error.message,7000);
    });;
  }
  loginWithTwitter() {
    let that = this;
    console.log('Calling login with Twitter');
    this.login.loginWithTwitter().then(res => {
      this.navCtrl.setRoot(this.rootPage);
    }).catch(function(error) {
      console.log("Error with Twitter:" ,error.message);
      that.toastMsg(error.message,7000);
    });
  }

}
