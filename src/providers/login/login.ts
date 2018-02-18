import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import {AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
// import { FirebaseProvider } from '../../providers/firebase/firebase';


@Injectable()
export class LoginProvider {

  constructor(public http: HttpClient,private afAuth : AngularFireAuth) {
    console.log('Hello LoginProvider Provider');
  }

  loginWithFacebook() {
    console.log('Login with FB called');
    return this.afAuth.auth.signInWithPopup(new firebase.auth.FacebookAuthProvider());
  }

  loginWithTwitter() {
    console.log('Login with Twitter called');
    return this.afAuth.auth.signInWithPopup(new firebase.auth.TwitterAuthProvider());
  }

  loginWithGoogle() {
    console.log('Login with Google called');
    return this.afAuth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
  }

  logoutOfFacebook() {
    console.log('Logout of FB called');
    this.afAuth.auth.signOut();
  }
}
