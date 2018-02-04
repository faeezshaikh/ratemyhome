import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams ,ToastController,AlertController} from 'ionic-angular';
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

  constructor(public navCtrl: NavController,public toastCtrl: ToastController, public navParams: NavParams,private web3Service: Web3ServiceProvider,public alertCtrl: AlertController,) {
    this.getBalances();
  }

  getBalances() {
    let that = this;
     this.web3Service.getPoolBalance().then(function(res){
      that.poolBalance = res;
    });
     this.web3Service.getMyContribution().then(function(res){
      that.myContribution = res;
     });
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad ContributionDetailsPage');
  }

  cancel() {
    this.navCtrl.pop();
  }

  withdraw(amount:any) {
    console.log('Requesting withdrawal for ' + amount + ' ETH...');
    this.web3Service.withdrawContribution(amount);
  }


  presentToast(contribution) {
    let toast = this.toastCtrl.create({
      message: contribution + ' ETH successfully withdrawan from the ICO smart contract.',
      duration: 3000,
      cssClass: "toastClass"
    });
    toast.present();
  }

  showConfirm(contribution:number ) {
    let confirm = this.alertCtrl.create({
      title: 'Withdraw from this ICO?',
      message: 'Are you sure you want to withdraw ' + contribution + ' ETH from this ICO?',
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
            // this.dismiss();
            this.withdraw(contribution);
            this.presentToast(contribution);
            this.getBalances();
          }
        }
      ]
    });
    confirm.present();
  }

}
