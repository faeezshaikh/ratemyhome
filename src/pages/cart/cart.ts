import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FirebaseProvider } from '../../providers/firebase/firebase';
// import {Observable} from 'rxjs/Rx';
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

  noOf4ozItems:number = 0;
  noOf8ozItems:number = 0;
  product4oz:number=1;
  product8oz:number=1;
  totalAmount:number;
  constructor(public navCtrl: NavController, public navParams: NavParams,private firebaseProvider: FirebaseProvider) {
    // this.order = navParams.get('order');
    this.orderId = navParams.get('orderId');
    this.order = this.firebaseProvider.getOrder(this.orderId).subscribe(res => {
      this.order = res;
      
      if(this.order.maxallowed == this.order.totalMeals) {
        this.readyToCheckout = true;
      }
    });

  

     this.firebaseProvider.getCartItems(this.orderId).subscribe(res => {
      this.cartItems = res;
      this.firebaseProvider.getCartItemsBreakfast(this.orderId).subscribe(results => {
        results.forEach(item => {
          item.bfast = true;
          this.cartItems.push(item);
        });
        this.cartItems.forEach(cItem => {
          // console.log('CartItem 4oz:',cItem.count4oz);
          // console.log('CartItem 8oz:',cItem.count8oz);
          
          if(cItem.count4oz > 0) this.noOf4ozItems = this.noOf4ozItems + cItem.count4oz;
          if(cItem.count8oz > 0) this.noOf8ozItems = this.noOf8ozItems + cItem.count8oz;
        });
        // console.log('4 oz items x', this.noOf4ozItems);
        // console.log('8 oz items x', this.noOf8ozItems);
        this.product4oz = this.noOf4ozItems*9;  // Rates set by business.
        this.product8oz = this.noOf8ozItems*12;
        this.totalAmount = this.product4oz + this.product8oz;
        
      });
    });
    

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CartPage');
  }
  checkout() {
    // console.log('Opening checkout');
    this.navCtrl.push(CheckoutPage);
    
  }

}
