import { Component } from '@angular/core';
import { NavController, NavParams, ModalController } from 'ionic-angular';
import { FirebaseListObservable } from 'angularfire2/database-deprecated';
import { FirebaseProvider } from './../../providers/firebase/firebase';
import { DetailsPage } from '../details/details';
import * as firebase from 'firebase/app';
 

@Component({
  selector: 'page-list',
  templateUrl: 'list.html'
})
export class ListPage {
  icoList: FirebaseListObservable<any[]>;
  entreesList: any;
  poolSegment:string = "presale";
  count:number = 0;
  totalMeals:number=0;
  mealSize:string = '4 oz at $9 per meal';
  selectedMealPlan:any;
  banner:string;
  breakfastList:any;
  maxAllowedMeals:number;
  orderId:any;

  val:number=0;

  order:any = {};

  constructor(public navCtrl: NavController, public navParams: NavParams, public firebaseProvider: FirebaseProvider,public modalCtrl: ModalController) {

    let key;
    this.selectedMealPlan = navParams.get('plan');
    this.orderId = navParams.get('orderKey');
    this.order = navParams.get('order');

    this.entreesList = this.order.entreesList;
    this.breakfastList = this.order.breakfastList;
    if(this.selectedMealPlan == 2) {
      this.banner = 'Plan: 2 meals per day (14 | week)';
      this.maxAllowedMeals = 14;
    } else if (this.selectedMealPlan == 3) {
      this.banner = 'Plan: 3 meals per day (21 | week)';
      this.maxAllowedMeals = 21;
    }
  }

  checkout() {
    console.log('Checking out');
    
    this.icoList.subscribe(items => {
      // items is an array
      items.forEach(meal => {
        let x = 'meal4oz'+meal.id;
        let y = 'meal8oz'+meal.id;

          console.log('Meal Id: '+ meal.id +' 4ozcount: ' +  (<HTMLInputElement>document.getElementById(x)).value);
          console.log('Meal Id: '+ meal.id +' 8ozcount: ' + (<HTMLInputElement>document.getElementById(y)).value);
      });
  });
  }

  itemTapped(event, item) {

    // this.navCtrl.push(DetailsPage, {
    //   item: item
    // });
    this.openModal(item);
  }


  openModal(item) {
    
        console.log("Item key for Opening modal ==> ", item.id);
        let modal = this.modalCtrl.create(DetailsPage, { id:item.id});
        modal.present();
      }

  increment(meal,isBreakfast:boolean,is8oz:boolean) {

    
    if(this.totalMeals == this.maxAllowedMeals) { // This will change for 21 meals 
      return;
    } else {
      is8oz ? meal.count8oz++ : meal.count4oz++;
      this.totalMeals++;
      let fbMeal;
       this.firebaseProvider.getEntree(this.orderId,meal.id).subscribe(res => {
        fbMeal =res[0];
        fbMeal.count4oz = meal.count4oz;
        fbMeal.count8oz = meal.count8oz;
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
      this.totalMeals--;
      if(is8oz) {
        meal.count8oz = x;
      } else { 
        meal.count4oz = x;
      }
      // this.firebaseProvider.updateItem(meal,isBreakfast);

      let fbMeal;
      this.firebaseProvider.getEntree(this.orderId,meal.id).subscribe(res => {
       fbMeal =res[0];
       fbMeal.count4oz = meal.count4oz;
       fbMeal.count8oz = meal.count8oz;
       this.firebaseProvider.updateItem(fbMeal,isBreakfast,this.orderId);
     });
    }

      if(x == 0) return
  }



}
