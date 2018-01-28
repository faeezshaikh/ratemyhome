import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database-deprecated';

@Injectable()
export class FirebaseProvider {

 constructor(public afd: AngularFireDatabase) { }

 getShoppingItems() {
   return this.afd.list('/shoppingItems/');
 }

 getIcoList() {
  return this.afd.list('/icoList/');
}

 addItem(name) {
   this.afd.list('/shoppingItems/').push(name);
 }

 removeItem(id) {
   this.afd.list('/shoppingItems/').remove(id);
 }
}