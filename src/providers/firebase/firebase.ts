import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database-deprecated';
import {AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import {Observable} from 'rxjs/Rx';

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
    let str:string;
    if(!isBreakfast) {
      str = '/orders/' + orderId + '/entreesList/';
    } else {
      str =  '/orders/' + orderId + '/breakfastList/';
    }
    console.log('Updating for .... ',str + item.$key);
    this.afd.object(str + item.$key)
    .update(item);
  }  

  getEntree(orderId,mealId) {
   return  this.afd.list('/orders/' + orderId + '/entreesList/',{
      query: {
        orderByChild:'id',
        equalTo:mealId
      }
    });
  }
  
  getAll4ozEntreesMoreThanZero(orderId) {
    return  this.afd.list('/orders/' + orderId + '/entreesList/',{
      query: {
        orderByChild:'count4oz',
        startAt:1
      }
    });
  }
  
  getAll8ozEntreesMoreThanZero(orderId) {
    return  this.afd.list('/orders/' + orderId + '/entreesList/',{
      query: {
        orderByChild:'count8oz',
        startAt:1
      }
    });
  }
  getAll4ozBreakfastsMoreThanZero(orderId) {
    return  this.afd.list('/orders/' + orderId + '/breakfastList/',{
      query: {
        orderByChild:'count4oz',
        startAt:1
      }
    });
  }
  
  getAll8ozBreakfastsMoreThanZero(orderId) {
    return  this.afd.list('/orders/' + orderId + '/breakfastList/',{
      query: {
        orderByChild:'count8oz',
        startAt:1
      }
    });
  }

  getCartItems(orderId) {
    console.log('Called Get Cart Items');
    
    return Observable.forkJoin([
      // this.getAll8ozBreakfastsMoreThanZero(orderId),
      // this.getAll4ozBreakfastsMoreThanZero(orderId),
      this.getAll8ozEntreesMoreThanZero(orderId),
      this.getAll4ozBreakfastsMoreThanZero(orderId)
    ])
    .map((data: any[]) => {
      let list1: any[] = data[0];
      let list2: any[] = data[1];
      // let list3: any[] = data[2];
      // let list4: any[] = data[3];
      list1.push(list2);
      // list1.push(list3);
      // list1.push(list4);
      console.log('Returning List...',list1);
      return list1;
    });

   
  }
 
  addOpenOrder(order) {
    return this.afd.list('/orders/').push(order).key;
  }

  getOrder(orderId) {
    return this.afd.object('/orders/' + orderId + '/');
  }

  updateOrder(key,order){
    // console.log('Updating order with key:', key);
    this.afd.list('/orders/').update(key,order);
  }
  removeItem(id) {
    this.afd.list('/shoppingItems/').remove(id);
  }

}