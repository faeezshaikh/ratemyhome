import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { FirebaseListObservable } from 'angularfire2/database-deprecated';
import { FirebaseProvider } from './../../providers/firebase/firebase';
import { IcodetailsPage } from '../icodetails/icodetails';
 

@Component({
  selector: 'page-list',
  templateUrl: 'list.html'
})
export class ListPage {
  // selectedItem: any;
  // items: Array<{title: string, note: string, icon: string}>;
  icoList: FirebaseListObservable<any[]>;


  constructor(public navCtrl: NavController, public navParams: NavParams, public firebaseProvider: FirebaseProvider) {
    // If we navigated to this page, we will have an item available as a nav param
    // this.selectedItem = navParams.get('item');
    this.icoList = this.firebaseProvider.getIcoList();

   
    // this.icons = ['flask', 'wifi', 'beer', 'football', 'basketball', 'paper-plane',
    // 'american-football', 'boat', 'bluetooth', 'build'];

    // this.items = [];
    // for (let i = 1; i < 11; i++) {
    //   this.items.push({
    //     title: 'Item ' + i,
    //     note: 'This is item #' + i,
    //     icon: this.icons[Math.floor(Math.random() * this.icons.length)]
    //   });
    // }
  }

  itemTapped(event, item) {
    // That's right, we're pushing to ourselves!

    this.navCtrl.push(IcodetailsPage, {
      ico: item
    });
    // this.navCtrl.push(ListPage, {
    //   item: item
    // });
  }
}
