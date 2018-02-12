import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ListPage } from '../list/list';


@IonicPage()
@Component({
  selector: 'page-plans',
  templateUrl: 'plans.html',
})
export class PlansPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PlansPage');
  }

  itemTapped(event, item) {
    
        this.navCtrl.push(ListPage, {
          plan: item
        });
      }

}
