import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database-deprecated';
import {AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';


@Injectable()
export class FirebaseProvider {

  openOrderId:any = null;

  getOpenOrderId() {
    return this.openOrderId;
  }
  setOpenOrderId(orderId) {
    this.openOrderId = orderId;
  }

  constructor(public afd: AngularFireDatabase, private afAuth : AngularFireAuth) { }
  // getIcoList() {
  //   return this.afd.list('/mealList/');
  // }

  getEntreesList() {
    return this.afd.list('/mealList/');
  }

  getBreakfastList() {
    return this.afd.list('/breakfastList/');
  }


  getItemDetails(id: number) {
    console.log('Fetching Details for: ', id);
    return this.afd.object('/mealDetails/' + id + '/');
  }

  updateItem(item,isBreakfast,orderId) {
    console.log('Updating for Item .... ',item);
    // console.log('Updating for .... ',item.$key);
    let str:string;
    if(!isBreakfast) {
      str = '/orders/' + orderId + '/entreesList/';
    } else {
      str =  '/orders/' + orderId + '/breakfastList/';
    }
    console.log('Updating for .... ',str + item.$key);
    this.afd.object(str + item.$key)
    .update(item);
  // console.log('Update successful');
  }  

  getEntree(orderId,mealId) {
   return  this.afd.list('/orders/' + orderId + '/entreesList/',{
      query: {
        orderByChild:'id',
        equalTo:mealId
      }
    });
  }
  
  
 
  addOpenOrder(order) {
    return this.afd.list('/orders/').push(order).key;
  }

  getOrder(orderId) {
    return this.afd.object('/orders/' + orderId + '/');
  }

  updateOrder(key,order){
    console.log('Updating order with key:', key);
    this.afd.list('/orders/').update(key,order);
  }
  removeItem(id) {
    this.afd.list('/shoppingItems/').remove(id);
  }

}