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
    console.log('Getting Entrees list...');
    
    return this.afd.list('/mealList/');
  }

  getBreakfastList() {
    console.log('Getting breakfast list...');
    return this.afd.list('/breakfastList/');
  }


  getItemDetails(id: number) {
    console.log('Fetching Details for: ', id);
    return this.afd.object('/mealDetails/' + id + '/');
  }

  updateItem(item,isBreakfast,orderId) {
    console.log('Updating item: '+ item + ' order id:',orderId);
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
   // console.log('Getting path');
    let str;
    if(!isBreakfast) {
      str = '/orders/' + orderId + '/entreesList/';
    } else {
      str =  '/orders/' + orderId + '/breakfastList/';
    }
    return str;
  }
  getItem(orderId,mealId,isBreakfast) {
    console.log('Getting item: ' + orderId + ' Meal id:', mealId);
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
    console.log('Called Get Cart Items',orderId);
 
    return this.afd.list('/orders/' + orderId + '/entreesList/', {
      query: {
        orderByChild: 'inCart',
        equalTo: true
      }
    });
   
  }

  getCartItemsBreakfast(orderId){
    console.log('Called Get Cart Items Breakfast',orderId);
    return this.afd.list('/orders/' + orderId + '/breakfastList/', {
      query: {
        orderByChild: 'inCart',
        equalTo: true
      }
    });
  }


 
  addOpenOrder(order) {
    console.log('Adding order',order);
    return this.afd.list('/orders/').push(order).key;
  }

  getOrder(orderId) {
    console.log('Getting Order',orderId);
    return this.afd.object('/orders/' + orderId + '/');
  }

  updateOrder(key,order){
    console.log('Updating order with key:', key);
    this.afd.list('/orders/').update(key,order);
  }
  removeItem(id) {
    console.log('Removing item:',id);
    this.afd.list('/shoppingItems/').remove(id);
  }

}