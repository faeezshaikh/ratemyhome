import { Component } from '@angular/core';
import { NavController, NavParams, ModalController } from 'ionic-angular';
import { FirebaseListObservable } from 'angularfire2/database-deprecated';
import { FirebaseProvider } from './../../providers/firebase/firebase';
import { DetailsPage } from '../details/details';
 

@Component({
  selector: 'page-list',
  templateUrl: 'list.html'
})
export class ListPage {
  icoList: FirebaseListObservable<any[]>;
  poolSegment:string = "presale";
  count:number = 0;
  totalMeals:number=0;
  isToggled:boolean = false;
  mealSize:string = '4 oz at $9 per meal';
  selectedMealPlan:any;
  banner:string;
  breakfastList:any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public firebaseProvider: FirebaseProvider,public modalCtrl: ModalController) {
    this.icoList = this.firebaseProvider.getIcoList();

    this.breakfastList = this.firebaseProvider.getBreakfastList();
    this.selectedMealPlan = navParams.get('plan');
    if(this.selectedMealPlan == 2) {
      this.banner = 'Plan: 2 meals per day (14 | week)';
    } else if (this.selectedMealPlan == 3) {
      this.banner = 'Plan: 3 meals per day (21 | week)';
    }

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

  increment4oz(meal,isBreakfast:boolean) {
    
    if(this.totalMeals == 14) { // This will change for 21 meals 
      return;
    } else {
      meal.count4oz++;
      this.totalMeals++;
    }

    this.firebaseProvider.updateItem(meal,isBreakfast);
  }


  decrement4oz(meal,isBreakfast:boolean) {
    if(meal.count4oz > 0)  {
      meal.count4oz--; 
      this.totalMeals--;
      this.firebaseProvider.updateItem(meal,isBreakfast);
    }

      if(meal.count4oz == 0) return
  }


  increment8oz(meal,isBreakfast:boolean) {
   
    if(this.totalMeals == 14) { // This will change for 21 meals 
      return;
    } else {
      meal.count8oz++;
      this.totalMeals++;
      this.firebaseProvider.updateItem(meal,isBreakfast);
    }
  }


  decrement8oz(meal,isBreakfast:boolean) {
    if(meal.count8oz > 0)  {
      meal.count8oz--; 
      this.totalMeals--;
      this.firebaseProvider.updateItem(meal,isBreakfast);
    }

      if(meal.count8oz == 0) return;
  }

  public notify() {
    console.log("Toggled: "+ this.isToggled); 
    if(this.isToggled) this.mealSize = '8 oz at $12 per meal'; // Will change for 3 meals.
    else this.mealSize = '4 oz at $9 per meal';
  }
}
