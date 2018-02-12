import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database-deprecated';
import {AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';


@Injectable()
export class FirebaseProvider {



  constructor(public afd: AngularFireDatabase, private afAuth : AngularFireAuth) { }
  getIcoList() {
    return this.afd.list('/mealList/');
  }

  getBreakfastList() {
    return this.afd.list('/breakfastList/');
  }
  getMyContributions(id: number) {
    id = 1;
    return this.afd.list('/contributions/' + id + '/');
  }

  getItemDetails(id: number) {
    console.log('Fetching Details for: ', id);
    return this.afd.object('/mealDetails/' + id + '/');
  }

  updateItem(item,isBreakfast) {
    // console.log('Updating for  ',item.$key);
    let str:string;
    if(!isBreakfast) {
      str = '/mealList/';
    } else {
      str =  '/breakfastList/';
    }
    this.afd.object(str + item.$key)
    .update({ count4oz: item.count4oz, count8oz: item.count8oz });
  // console.log('Update successful');
  }  
  
  
  addItem(name) {
    this.afd.list('/shoppingItems/').push(name);
  }

  removeItem(id) {
    this.afd.list('/shoppingItems/').remove(id);
  }



 

  isUserLoggedin() {
    // return this.isLoggedin;
    // return firebase.auth().currentUser
  }
}