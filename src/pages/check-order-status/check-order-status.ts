import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FirebaseProvider } from '../../providers/firebase/firebase';

import { Address } from 'angular-google-place';


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
  orderDate:any;
  location:any;

  addressSet:boolean = false;


  constructor(public navCtrl: NavController, public navParams: NavParams,private firebaseProvider: FirebaseProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CheckOrderStatusPage');
  }
////////

  public options = {type : 'address', componentRestrictions: { country: 'USA' }};
  getAddress(place: Address) {
         console.log('Address', place);
         this.addressSet = true;
     }
  getFormattedAddress(event: any) {
        // this.addressSet = true;
         console.log(event);
     } 


     textAreaEmpty(){
      if (this.location != '') {
        console.log(this.location);
      } else {
        this.addressSet = false;
      }
    }
     ///////
  getOrderStatus() {

    // console.log('Adderess:',this.location);
    
  //   this.firebaseProvider.getOrder(this.orderId).subscribe(res => {
  //     console.log('RESULT:',res);
      
  //     this.orderStatus = res.status;
  //     this.totalAmt = res.cardInfo.amount;
  //     this.orderDate = new Date(res.cardInfo.orderDate);
  //     this.totalMeals = res.totalMeals;
  // });

    // this.firebaseProvider.getCartItems(this.orderId).subscribe(res => {
    //   this.cartItems = res;
    //   this.firebaseProvider.getCartItemsBreakfast(this.orderId).subscribe(results => {
    //     results.forEach(item => {
    //       item.bfast = true;
    //       this.cartItems.push(item);
    //     });
    //     console.log("Items:",this.cartItems);
        
    //   });
    // });


  }

}
