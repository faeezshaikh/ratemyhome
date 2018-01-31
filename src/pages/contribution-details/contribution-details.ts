import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Web3ServiceProvider } from '../../providers/web3-service/web3-service';

/**
 * Generated class for the ContributionDetailsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-contribution-details',
  templateUrl: 'contribution-details.html',
})
export class ContributionDetailsPage {
  poolBalance: string;
  myContribution: string;

  constructor(public navCtrl: NavController, public navParams: NavParams,private web3Service: Web3ServiceProvider) {
    this.poolBalance = this.web3Service.getPoolBalance();
    this.myContribution=  this.web3Service.getMyContribution();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ContributionDetailsPage');
  }

  cancel() {

    this.navCtrl.pop();
  }

}
