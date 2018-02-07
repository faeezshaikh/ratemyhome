import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Web3ServiceProvider } from '../../providers/web3-service/web3-service';

@IonicPage()
@Component({
  selector: 'page-create-pool',
  templateUrl: 'create-pool.html',
})
export class CreatePoolPage {

  constructor(public navCtrl: NavController, public navParams: NavParams,private web3Service: Web3ServiceProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CreatePoolPage');
  }

  createPool() {
    this.web3Service.createPool();
  }

}
