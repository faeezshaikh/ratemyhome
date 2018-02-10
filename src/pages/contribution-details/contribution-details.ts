import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams ,ToastController,AlertController} from 'ionic-angular';


@IonicPage()
@Component({
  selector: 'page-contribution-details',
  templateUrl: 'contribution-details.html',
})
export class ContributionDetailsPage {
  poolBalance: string;
  myContribution: string;

  constructor(public navCtrl: NavController,public toastCtrl: ToastController, public navParams: NavParams,public alertCtrl: AlertController,) {
    this.getBalances();
  }

  getBalances() {
  
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad ContributionDetailsPage');
  }

  cancel() {
    this.navCtrl.pop();
  }

  withdraw(amount:any) {
    console.log('Requesting withdrawal for ' + amount + ' ETH...');
  
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
            
            this.withdraw(contribution);
         
          }
        }
      ]
    });
    confirm.present();
  }

}
