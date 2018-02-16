import { Component,ViewChild } from '@angular/core';
import { NavController, NavParams, ModalController, Content } from 'ionic-angular';
import { FirebaseListObservable } from 'angularfire2/database-deprecated';
import { FirebaseProvider } from './../../providers/firebase/firebase';
import { DetailsPage } from '../details/details';
import * as firebase from 'firebase/app';
import { CartPage } from '../cart/cart';
// import {Content } ;
 

@Component({
  selector: 'page-list',
  templateUrl: 'list.html'
})
export class ListPage {
  entreesList: any;
  breakfastList:any;
  banner:string;
  maxAllowedMeals:number;
  // totalMeals:number=0;
  poolSegment:string = "presale";
  orderId:any;
  order:any = {};
  warning = '' ;
  @ViewChild(Content) content: Content;

  constructor(public navCtrl: NavController, public navParams: NavParams, public firebaseProvider: FirebaseProvider,public modalCtrl: ModalController) {

    let key;
    let selectedMealPlan = navParams.get('plan');
    this.orderId = navParams.get('orderKey');
    this.order = navParams.get('order');
    // this.totalMeals = this.order.totalMeals;

    this.entreesList = this.order.entreesList;
    this.breakfastList = this.order.breakfastList;
    if(selectedMealPlan == 2) {
      this.banner = 'Plan: 2 meals per day (14 | week)';
      this.maxAllowedMeals = 14;
    } else if (selectedMealPlan == 3) {
      this.banner = 'Plan: 3 meals per day (21 | week)';
      this.maxAllowedMeals = 21;
    }
    if(this.order.totalMeals > this.maxAllowedMeals) {
      this.warning = "Please remove items from cart.";
    }
  }

  scrollToTop() {
    this.content.scrollToTop();
  }

  checkout() {
    console.log('Checking out');
    
  }

  itemTapped(event, item) {
    this.openModal(item);
  }


  openModal(item) {
    
        console.log("Item key for Opening modal ==> ", item.id);
        let modal = this.modalCtrl.create(DetailsPage, { id:item.id});
        modal.present();
      }

  increment(meal,isBreakfast:boolean,is8oz:boolean) {
    if(this.order.totalMeals >= this.maxAllowedMeals) { // This will change for 21 meals 
      return;
    } else {
      is8oz ? meal.count8oz++ : meal.count4oz++;
      this.order.totalMeals++;
      this.firebaseProvider.updateOrder(this.orderId,this.order);
      let fbMeal;
       this.firebaseProvider.getItem(this.orderId,meal.id,isBreakfast).subscribe(res => {
        fbMeal =res[0];
        fbMeal.count4oz = meal.count4oz;
        fbMeal.count8oz = meal.count8oz;

        if(fbMeal.count4oz > 0 || fbMeal.count8oz > 0) fbMeal.inCart = true;
        if(fbMeal.count4oz == 0 && fbMeal.count8oz == 0) fbMeal.inCart = false;

        this.firebaseProvider.updateItem(fbMeal,isBreakfast,this.orderId);
      });
    }
  }


  decrement(meal,isBreakfast:boolean,is8oz:boolean) {
   
    
     let x ;
     if(is8oz) {
        x = meal.count8oz; 
      } else { 
        x = meal.count4oz;
      }
      
    if(x > 0)  {
      x--; 
      this.order.totalMeals--;
      this.firebaseProvider.updateOrder(this.orderId,this.order);
      if(is8oz) {
        meal.count8oz = x;
      } else { 
        meal.count4oz = x;
      }
      let fbMeal;
      this.firebaseProvider.getItem(this.orderId,meal.id,isBreakfast).subscribe(res => {
       fbMeal =res[0];
       fbMeal.count4oz = meal.count4oz;
       fbMeal.count8oz = meal.count8oz;
       if(fbMeal.count4oz > 0 || fbMeal.count8oz > 0) fbMeal.inCart = true;
       if(fbMeal.count4oz == 0 && fbMeal.count8oz == 0) fbMeal.inCart = false;
       this.firebaseProvider.updateItem(fbMeal,isBreakfast,this.orderId);
     });
    }

      if(x == 0) return;
  }


  showCart(){
    this.navCtrl.push(CartPage, {order: this.order,orderId:this.orderId});
  }

}
