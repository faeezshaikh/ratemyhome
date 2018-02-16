import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FirebaseProvider } from '../../providers/firebase/firebase';
import {Observable} from 'rxjs/Rx';


@IonicPage()
@Component({
  selector: 'page-cart',
  templateUrl: 'cart.html',
})
export class CartPage {

  order: {};
  orderId: any;
  cartItems: [{}];
  constructor(public navCtrl: NavController, public navParams: NavParams,private firebaseProvider: FirebaseProvider) {
    this.order = navParams.get('order');
    this.orderId = navParams.get('orderId');
    console.log('Got order..', this.order);
    console.log('Got orderId..', this.orderId);

    this.firebaseProvider.getCartItems(this.orderId).subscribe(res => {
      console.log('Got final list',res);
    })

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CartPage');
  }

}
