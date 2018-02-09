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
  status:string;

  tokenAddress:string;
  tokenAmount:any;

  constructor(public navCtrl: NavController, public navParams: NavParams,public viewCtrl: ViewController,
    public alertCtrl: AlertController,public toastCtrl: ToastController, public web3Service: Web3ServiceProvider) {
    this.icotitle = navParams.get('icotitle');
    this.presaleBonus = navParams.get('presaleBonus');
    this.presaleMin = navParams.get('presaleMin');
    this.presalePrice = navParams.get('presalePrice');
    this.status = navParams.get('status');
    let that = this;
    this.web3Service.getPoolBalance().then(function(res){
     that.poolBalance = res;
   });

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ContributePage');
  }
  dismiss() {
    this.viewCtrl.dismiss();
  }

  isOpen() {
    if(this.status == 'open') return true;
    else return false;
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
            let that = this;
            this.web3Service.contribute(contribution).then(function(res) {
                that.dismiss();
                that.presentToast(contribution);
            });
            
            this.web3Service.getPoolBalance().then(function(res){
             that.poolBalance = res;
           });
            
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

  depositTokens() {
    console.log('Token Address', this.tokenAddress);
    console.log('Token tokenAmount', this.tokenAmount);
    let that = this;
    this.web3Service.depositTokens(this.tokenAddress,this.tokenAmount).then(function(res) {
      that.presentToast(this.tokenAmount);
    });
    
  }

}
