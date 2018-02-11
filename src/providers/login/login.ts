import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import {AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { FirebaseProvider } from '../../providers/firebase/firebase';
import { ListPage } from '../../pages/list/list';
import { LoginPage } from '../../pages/login/login';


@Injectable()
export class LoginProvider {

  constructor(public http: HttpClient,private afAuth : AngularFireAuth,private fbService: FirebaseProvider) {
    console.log('Hello LoginProvider Provider');
  }

  loginWithFacebook() {
    console.log('Login with FB called');
    return this.afAuth.auth.signInWithPopup(new firebase.auth.FacebookAuthProvider());
  }

  logoutOfFacebook() {
    console.log('Logout of FB called');
    this.afAuth.auth.signOut();
  }
}
