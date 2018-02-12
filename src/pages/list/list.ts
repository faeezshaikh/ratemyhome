import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { FirebaseListObservable } from 'angularfire2/database-deprecated';
import { FirebaseProvider } from './../../providers/firebase/firebase';
import { DetailsPage } from '../details/details';
 

@Component({
  selector: 'page-list',
  templateUrl: 'list.html'
})
export class ListPage {
  icoList: FirebaseListObservable<any[]>;
  poolSegment:string = "presale";
  count:number = 0;

  constructor(public navCtrl: NavController, public navParams: NavParams, public firebaseProvider: FirebaseProvider) {
    this.icoList = this.firebaseProvider.getIcoList();

  }

  itemTapped(event, item) {

    this.navCtrl.push(DetailsPage, {
      item: item
    });
  }

  increment(meal) {
    this.count++;
  }


  decrement(meal) {
    if(this.count > 0) 
      this.count--; 
  }
}
