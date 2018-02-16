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
  cartItems: any;
  constructor(public navCtrl: NavController, public navParams: NavParams,private firebaseProvider: FirebaseProvider) {
    this.order = navParams.get('order');
    this.orderId = navParams.get('orderId');
    console.log('Got order..', this.order);
    console.log('Got orderId..', this.orderId);

    let res = this.firebaseProvider.getCartItems(this.orderId).subscribe(res => {
      console.log("Results ===>" ,res);
      this.cartItems = res;

      this.firebaseProvider.getCartItemsBreakfast(this.orderId).subscribe(results => {
        results.forEach(item => {
          this.cartItems.push(item);
        })
        console.log('Final Cart items', this.cartItems);
        
      });
    });
    

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CartPage');
  }

}
