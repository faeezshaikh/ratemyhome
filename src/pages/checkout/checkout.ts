import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ToastController } from 'ionic-angular';
import { Stripe } from '@ionic-native/stripe';
import { Http } from '@angular/http';
import { PlansPage } from '../plans/plans';
// import * as firebase from 'firebase/app';
import { FirebaseProvider } from '../../providers/firebase/firebase';



@IonicPage()
@Component({
  selector: 'page-checkout',
  templateUrl: 'checkout.html',
})
export class CheckoutPage {
  cardinfo: any = {
    number: '',
    expMonth: '',
    expYear: '',
    cvc: '',
    name: '', // card holder name (optional)
    address_line1: '', // address line 1 (optional)
    address_city: '', // city (optional)
    address_state: '', // state/province (optional)
    address_country: '', // country (optional)
    postalCode: '', // Postal Code / Zip Code (optional)
    currency: 'USD', // Three-letter ISO currency code (optional)
    email:''
  }
  amount:any;
  order:any;
  orderId:any;
  bool:boolean = true;
  showSpinner:boolean = false;
  

  constructor(public navCtrl: NavController, public navParams: NavParams,public stripe: Stripe, 
      public http: Http,public alertCtrl: AlertController,public toastCtrl: ToastController,public firebaseProvider: FirebaseProvider) {
    this.amount = this.navParams.get('amt');
    this.orderId = this.navParams.get('orderId');
    this.order = this.navParams.get('order');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CheckoutPage');
  }

  // presentToast() {
  //   let toast = this.toastCtrl.create({
  //     message: 'Order was successfully placed.',
  //     duration: 3000
  //   });
  //   toast.present();
  // }

  populateForm() {
    if(this.bool)  {
      this.cardinfo  = {
        number: '4242424242424242',
        expMonth: 12,
        expYear: 2020,
        cvc: '123',
        name: 'John Smith', // card holder name (optional)
        address_line1: '123 Some Street', // address line 1 (optional)
        address_city: 'Las Vegas', // city (optional)
        address_state: 'NV', // state/province (optional)
        address_country: 'USA', // country (optional)
        postalCode: '63101', // Postal Code / Zip Code (optional)
        currency: 'USD', // Three-letter ISO currency code (optional),
        email: 'faeez.shaikh@gmail.com'
      }
      this.bool=false;
    } else {
      this.resetForm();
    }
  }

  resetForm() {
    this.cardinfo = {
      number: '',
      expMonth: '',
      expYear: '',
      cvc: '',
      name: '', // card holder name (optional)
      address_line1: '', // address line 1 (optional)
      address_city: '', // city (optional)
      address_state: '', // state/province (optional)
      address_country: '', // country (optional)
      postalCode: '', // Postal Code / Zip Code (optional)
      currency: 'USD', // Three-letter ISO currency code (optional)
      email:''
    }
    this.bool=true;
  }
  pay() {
    console.log('Paying...');
    // this.showConfirmation();
    // this.order.status = 'paid';
    // this.order.cardInfo = this.cardinfo;
    // this.firebaseProvider.updateOrder(this.orderId,this.order);
    // this.firebaseProvider.setOpenOrderId(null); // close the order;
    // this.navCtrl.setRoot(PlansPage);

    this.stripe.setPublishableKey('pk_test_T8prTKTUFNC3Z47mJCTg6ZNa');
    this.stripe.createCardToken(this.cardinfo).then((tokenObj) => {
      console.log('Received Token from Stripe:', tokenObj);
      console.log('JSON Version: Received Token from Stripe:', JSON.stringify(tokenObj));
      console.log('Token id:',tokenObj.id);
      this.http.get('https://finebites.herokuapp.com/processpay/'+ tokenObj.id + '/' + this.amount)
      .subscribe((res) => {
        if (res.json().success) {
          console.log('Transaction Successfull. Card was charged $' + this.amount);
          this.http.get('https://finebites.herokuapp.com/sendemail/'+ this.orderId + '/' + this.amount + '/' + this.cardinfo.email ).subscribe(res => {
            console.log(res.json());
            // alert('Order was successfully placed. You should receive confirmation by email shortly. ');
            this.showConfirmation();
            this.order.status = 'Processing';
            this.order.cardInfo = this.cardinfo;
            this.order.cardInfo.amount = this.amount;
            this.order.cardInfo.orderDate = Date.now();
            this.firebaseProvider.updateOrder(this.orderId,this.order);
            this.firebaseProvider.setOpenOrderId(null); // close the order;
            this.navCtrl.setRoot(PlansPage);
          })

        }
      })
    }).catch(err => {
      this.showSpinner = false;
      alert(err);
      console.log('Error !!!',err);
    });
      
  
  }

  showConfirm() {
    let confirm = this.alertCtrl.create({
      title: 'Confirm Purchase?',
      message: 'Are you sure you want to purchase this order for $' + this.amount + ' ?',
      buttons: [
        {
          text: 'No',
          handler: () => {
            console.log('Disagree clicked');
          }
        },
        {
          text: 'Yes',
          handler: () => {
            console.log('Agree clicked');
            this.showSpinner = true;
            this.pay();
          }
        }
      ]
    });
    confirm.present();
  }

  showConfirmation() {
    this.showSpinner = false;
    let alert = this.alertCtrl.create({
      title: 'Success',
      subTitle: 'Order was successfully placed. You should receive confirmation by email shortly.  ',
      buttons: ['OK']
    });
    alert.present();
  }

}
