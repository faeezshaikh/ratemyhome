import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FirebaseProvider } from '../../providers/firebase/firebase';


@IonicPage()
@Component({
  selector: 'page-check-order-status',
  templateUrl: 'check-order-status.html',
})
export class CheckOrderStatusPage {

  cartItems:any;
  orderId:any;
  totalAmt:number;
  totalMeals:number;
  orderStatus:any;
  constructor(public navCtrl: NavController, public navParams: NavParams,private firebaseProvider: FirebaseProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CheckOrderStatusPage');
  }

  getOrderStatus() {


    this.firebaseProvider.getOrder(this.orderId).subscribe(res => {
      console.log('RESULT:',res);
      
      this.orderStatus = res.status;
      this.totalAmt = res.cardInfo.amount;
      this.totalMeals = res.totalMeals;
  });

    this.firebaseProvider.getCartItems(this.orderId).subscribe(res => {
      this.cartItems = res;
      this.firebaseProvider.getCartItemsBreakfast(this.orderId).subscribe(results => {
        results.forEach(item => {
          item.bfast = true;
          this.cartItems.push(item);
        });
        console.log("Items:",this.cartItems);
        
      });
    });


  }

}
