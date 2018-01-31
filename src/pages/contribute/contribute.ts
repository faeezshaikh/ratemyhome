import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController,AlertController,ToastController} from 'ionic-angular';
import { Web3ServiceProvider } from '../../providers/web3-service/web3-service';


@IonicPage()
@Component({
  selector: 'page-contribute',
  templateUrl: 'contribute.html',
})
export class ContributePage {
  icotitle: string;
  presaleMin: string;
  presaleBonus: string;
  presalePrice:string;
  contribution = 0;
  poolBalance:string;

  constructor(public navCtrl: NavController, public navParams: NavParams,public viewCtrl: ViewController,
    public alertCtrl: AlertController,public toastCtrl: ToastController, public web3Service: Web3ServiceProvider) {
    this.icotitle = navParams.get('icotitle');
    this.presaleBonus = navParams.get('presaleBonus');
    this.presaleMin = navParams.get('presaleMin');
    this.presalePrice = navParams.get('presalePrice');
    this.poolBalance = this.web3Service.getPoolBalance();

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ContributePage');
  }
  dismiss() {
    this.viewCtrl.dismiss();
  }

  showConfirm(contribution:number ) {
    let confirm = this.alertCtrl.create({
      title: 'Contribute to this ICO?',
      message: 'Are you sure you want to send ' + contribution + ' ETH to this ICO?',
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
            this.web3Service.contribute(contribution);
            this.poolBalance = this.web3Service.getPoolBalance();
            this.presentToast(contribution);
          }
        }
      ]
    });
    confirm.present();
  }

  presentToast(contribution) {
    let toast = this.toastCtrl.create({
      message: contribution + ' ETH successfully sent to the ICO smart contract.',
      duration: 3000
    });
    toast.present();
  }


}
