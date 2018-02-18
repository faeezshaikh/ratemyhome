// import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { AngularFireDatabase } from 'angularfire2/database-deprecated';
// import {AngularFireAuth } from 'angularfire2/auth';
// import * as firebase from 'firebase/app';
// import {Observable} from 'rxjs/Rx';
// import * as _ from 'lodash';

@Injectable()
export class FirebaseProvider {

  openOrderId:any = null;
   /// Active filter rules
   filters = {}
   cartItems:any;

  getOpenOrderId() {
    return this.openOrderId;
  }
  setOpenOrderId(orderId) {
    this.openOrderId = orderId;
  }

  constructor(public afd: AngularFireDatabase) { }
 
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
    // console.log('Updating for .... ',str + item.$key);
    this.afd.object(str + item.$key)
    .update(item);
  }  

 

  getPath(isBreakfast,orderId) {
    let str;
    if(!isBreakfast) {
      str = '/orders/' + orderId + '/entreesList/';
    } else {
      str =  '/orders/' + orderId + '/breakfastList/';
    }
    return str;
  }
  getItem(orderId,mealId,isBreakfast) {
   let str = this.getPath(isBreakfast,orderId);
    return  this.afd.list(str,{
       query: {
         orderByChild:'id',
         equalTo:mealId
       }
     });
   }
  

  // See documentation : https://angularfirebase.com/lessons/multi-property-data-filtering-with-firebase-and-angular-4/
  getCartItems(orderId) {
    console.log('Called Get Cart Items');
 
    return this.afd.list('/orders/' + orderId + '/entreesList/', {
      query: {
        orderByChild: 'inCart',
        equalTo: true
      }
    });
   
  }

  getCartItemsBreakfast(orderId){
    console.log('Called Get Cart Items Breakfast');
    return this.afd.list('/orders/' + orderId + '/breakfastList/', {
      query: {
        orderByChild: 'inCart',
        equalTo: true
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
    // console.log('Updating order with key:', key);
    this.afd.list('/orders/').update(key,order);
  }
  removeItem(id) {
    this.afd.list('/shoppingItems/').remove(id);
  }

}