import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import {AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { ListPage } from '../list/list';
import { FirebaseProvider } from '../../providers/firebase/firebase';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

 
  // user:{
  //   email:'',
  //   name:'',
  //   pic:''
  // };
 
  constructor(public navCtrl: NavController, public navParams: NavParams, private afAuth : AngularFireAuth,private fbService: FirebaseProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  loginWithFacebook() {
    console.log('Login with FB called');
    this.afAuth.auth.signInWithPopup(new firebase.auth.FacebookAuthProvider()).then(res => {
      console.log('Login successful..', res);
      // this.user.email =  res.user.email;
      // this.user.name = res.user.displayName;
      // this.user.pic = res.user.photoURL;
      console.log('Current user..',firebase.auth().currentUser);
      
      this.navCtrl.setRoot(ListPage);
    });
    

  }

  logoutOfFacebook() {
    console.log('Logout of FB called');
    this.afAuth.auth.signOut();
    this.navCtrl.setRoot(LoginPage);
  }

}
