import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ListPage } from '../list/list';
import { FirebaseProvider } from '../../providers/firebase/firebase';


@IonicPage()
@Component({
  selector: 'page-plans',
  templateUrl: 'plans.html',
})
export class PlansPage {

  order = {
    userId: 'faeez',
    breakfastList: [],
    entreesList: [],
    totalMeals: 0
  };
  orderKey: any;
  entreesList: any;
  breakfastList: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public firebaseProvider: FirebaseProvider) {

    this.orderKey = this.firebaseProvider.getOpenOrderId();
    if (this.orderKey == null) {
      console.log('Open Order id was null..Creating new order');
      this.orderKey = this.firebaseProvider.addOpenOrder(this.order);
      this.firebaseProvider.setOpenOrderId(this.orderKey);


      // This is where the new order is first populated with the master Entrees list and Master Breakfast list. For existing orders skip it.

      this.firebaseProvider.getEntreesList().subscribe(res => {
        this.entreesList = res;
        this.order.entreesList = this.entreesList;
        console.log('Attempting to update entreeslist');

        this.firebaseProvider.updateOrder(this.orderKey, this.order);
        console.log('Got Entrees list', this.entreesList);
      });


      this.firebaseProvider.getBreakfastList().subscribe(res => {
        this.breakfastList = res;
        this.order.breakfastList = this.breakfastList;
        console.log('Attempting to update breakfastlist');
        this.firebaseProvider.updateOrder(this.orderKey, this.order);
        console.log('Got breakfastList list', this.breakfastList);
      });



    } else {
      console.log('Found existing order id in Session..Fetching its details', this.orderKey);
    }


  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PlansPage');
  }

  itemTapped(event, item) {
    this.navCtrl.push(ListPage, {
      plan: item,
      orderKey: this.orderKey
    });
  }

}
