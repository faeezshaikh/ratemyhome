import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FirebaseProvider } from '../../providers/firebase/firebase';
import {Observable} from 'rxjs/Rx';
import { CheckoutPage } from '../checkout/checkout';


@IonicPage()
@Component({
  selector: 'page-cart',
  templateUrl: 'cart.html',
})
export class CartPage {

  order: any;
  orderId: any;
  cartItems: any;
  readyToCheckout: boolean = false;
  constructor(public navCtrl: NavController, public navParams: NavParams,private firebaseProvider: FirebaseProvider) {
    // this.order = navParams.get('order');
    this.orderId = navParams.get('orderId');
    this.order = this.firebaseProvider.getOrder(this.orderId).subscribe(res => {
      this.order = res;
      console.log('Got order..', this.order);
      console.log('Got orderId..', this.orderId);
  
      console.log('Max allowed:',this.order.maxallowed );
      console.log('Total:',this.order.totalMeals);
      
      if(this.order.maxallowed == this.order.totalMeals) {
        this.readyToCheckout = true;
        console.log("Flag:" ,this.readyToCheckout);
        
      }
    });

  

    let res = this.firebaseProvider.getCartItems(this.orderId).subscribe(res => {
      // console.log("Results ===>" ,res);
      this.cartItems = res;

      this.firebaseProvider.getCartItemsBreakfast(this.orderId).subscribe(results => {
        results.forEach(item => {
          this.cartItems.push(item);
        })
        // console.log('Final Cart items', this.cartItems);
        
      });
    });
    

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CartPage');
  }
  checkout() {
    console.log('Opening checkout');
    this.navCtrl.push(CheckoutPage);
    
  }

}
