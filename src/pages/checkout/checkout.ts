import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Stripe } from '@ionic-native/stripe';
import { Http, Headers } from '@angular/http';

@IonicPage()
@Component({
  selector: 'page-checkout',
  templateUrl: 'checkout.html',
})
export class CheckoutPage {
  cardinfo: any = {
    number: '4242424242424242',
    expMonth: '01',
    expYear: '2020',
    cvc: '123'
  }

  constructor(public navCtrl: NavController, public navParams: NavParams,public stripe: Stripe, public http: Http) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CheckoutPage');
  }

  pay() {
    console.log('Paying...');
    
    this.stripe.setPublishableKey('pk_test_T8prTKTUFNC3Z47mJCTg6ZNa');
    this.stripe.createCardToken(this.cardinfo).then((token) => {
      console.log('Received Token from Stripe:', token);
      console.log('JSON Version: Received Token from Stripe:', JSON.stringify(token));
      
      var data = 'stripetoken=' + token + '&amount=50';
      var headers = new Headers();
      // headers.append('Conent-Type', 'application/x-www-form-urlencoded');
      headers.append('Conent-Type', 'application/json');
      this.http.post('http://localhost:3333/processpay', data, { headers: headers }).subscribe((res) => {
        if (res.json().success)
        alert('transaction Successfull!!')  
      })
    }).catch(err => {
      alert(err);
      console.log('Error !!!',err);
      
    })
  }
}
