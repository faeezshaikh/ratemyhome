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

  constructor(public navCtrl: NavController, public navParams: NavParams, public firebaseProvider: FirebaseProvider,public modalCtrl: ModalController) {
    this.icoList = this.firebaseProvider.getIcoList();

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

  increment(meal) {
    meal.count++;
    this.totalMeals++;
  }


  decrement(meal) {
    if(meal.count > 0)  {
      meal.count--; 
      this.totalMeals--;
    }

      if(meal.count == 0) return
  }

  public notify() {
    console.log("Toggled: "+ this.isToggled); 
    if(this.isToggled) this.mealSize = '8 oz at $12 per meal'; // Will change for 3 meals.
    else this.mealSize = '4 oz at $9 per meal';
  }
}
