import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import {AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { ListPage } from '../list/list';
import { FirebaseProvider } from '../../providers/firebase/firebase';
import { LoginProvider } from '../../providers/login/login';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

 
  constructor(public navCtrl: NavController, public navParams: NavParams, 
    private afAuth : AngularFireAuth,private fbService: FirebaseProvider,private login: LoginProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  loginWithFacebook() {
    this.login.loginWithFacebook().then(res => {
      this.navCtrl.setRoot(ListPage);
    })
  }

  logoutOfFacebook() {
    this.login.logoutOfFacebook();
    this.navCtrl.setRoot(LoginPage);
  }

}
