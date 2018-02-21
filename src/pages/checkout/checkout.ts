import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Stripe } from '@ionic-native/stripe';
import { Http } from '@angular/http';



@IonicPage()
@Component({
  selector: 'page-checkout',
  templateUrl: 'checkout.html',
})
export class CheckoutPage {
  cardinfo: any = {
    number: '4242424242424242',
    expMonth: 12,
    expYear: 2020,
    cvc: '123',
    name: 'John Smith', // card holder name (optional)
    address_line1: '123 Some Street', // address line 1 (optional)
    address_line2: 'Suite #220', // address line 2 (optional)
    address_city: 'Toronto', // city (optional)
    address_state: 'Ontario', // state/province (optional)
    address_country: 'Canada', // country (optional)
    postalCode: '63101', // Postal Code / Zip Code (optional)
    currency: 'USD' // Three-letter ISO currency code (optional)
  }
  amount:any;

  constructor(public navCtrl: NavController, public navParams: NavParams,public stripe: Stripe, public http: Http) {
    this.amount = this.navParams.get('amt');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CheckoutPage');
  }

  pay() {
    console.log('Paying...');
    
    this.stripe.setPublishableKey('pk_test_T8prTKTUFNC3Z47mJCTg6ZNa');

    // this.stripe.createCardToken(this.cardinfo,onSuccess, onError);
    // Your Stripe token is: tok_1BxkHCAPEFpkLkhT5Zz9zcgX.
    this.stripe.createCardToken(this.cardinfo).then((tokenObj) => {
      console.log('Received Token from Stripe:', tokenObj);
      console.log('JSON Version: Received Token from Stripe:', JSON.stringify(tokenObj));
      console.log('Token id:',tokenObj.id);
      

     
      // this.http.post('http://localhost:3333/processpay', {tokenid: tokenObj.id})
      this.http.get('http://localhost:3333/processpay/'+ tokenObj.id + '/' + this.amount)
      .subscribe((res) => {
        if (res.json().success)
        alert('transaction Successfull!!')  
      })
    }).catch(err => {
      alert(err);
      console.log('Error !!!',err);
      
    })
      
    //   var data = 'stripetoken=' + token + '&amount=50';
    //   var headers = new Headers();
    //   headers.append('Conent-Type', 'application/json');


    //   this.http.post('http://localhost:3333/processpay', data, { headers: headers }).subscribe((res) => {
    //     if (res.json().success)
    //     alert('transaction Successfull!!')  
    //   })
    // }).catch(err => {
    //   alert(err);
    //   console.log('Error !!!',err);
    // })
  }

// 

}
