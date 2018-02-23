import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import {AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
// import { FirebaseProvider } from '../../providers/firebase/firebase';


@Injectable()
export class LoginProvider {
  // isApp = (!document.URL.startsWith("http") || document.URL.startsWith("http://localhost:8080"));
  isApp = true;
  // https://forum.ionicframework.com/t/how-to-determine-if-browser-or-app/89149/15
  constructor(public http: HttpClient,private afAuth : AngularFireAuth) {
    console.log('Hello LoginProvider Provider');
  }

  loginWithFacebook() {
    console.log('Login with FB called');
   // return this.afAuth.auth.signInWithRedirect(new firebase.auth.FacebookAuthProvider());

   if(this.isApp) 
   return this.afAuth.auth.signInWithRedirect(new firebase.auth.FacebookAuthProvider());
  else 
  return this.afAuth.auth.signInWithPopup(new firebase.auth.FacebookAuthProvider());

  }

  loginWithTwitter() {
    console.log('Login with Twitter called');
    if(this.isApp) 
      return this.afAuth.auth.signInWithRedirect(new firebase.auth.TwitterAuthProvider());
     else 
     return this.afAuth.auth.signInWithPopup(new firebase.auth.TwitterAuthProvider());
  }

  loginWithGoogle() {
    console.log('Login with Google called');
    // return this.afAuth.auth.signInWithRedirect(new firebase.auth.GoogleAuthProvider());

    if(this.isApp) 
    return this.afAuth.auth.signInWithRedirect(new firebase.auth.GoogleAuthProvider());
   else 
   return this.afAuth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());

    // const provider = new firebase.auth.GoogleAuthProvider();
    // return  firebase.auth().signInWithRedirect(provider).then( () => {
    //   firebase.auth().getRedirectResult().then( result => {
    //     // This gives you a Google Access Token.
    //     // You can use it to access the Google API.
    //     var token = result.credential.accessToken;
    //     // The signed-in user info.
    //     var user = result.user;
    //     console.log(token, user);
    //   }).catch(function(error) {
    //     // Handle Errors here.
    //     console.log(error.message);
    //   });
    // });
  }

  logoutOfFacebook() {
    console.log('Logout of FB called');
    this.afAuth.auth.signOut();
  }
}
