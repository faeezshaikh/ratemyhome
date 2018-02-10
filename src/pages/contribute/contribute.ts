import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController,AlertController,ToastController} from 'ionic-angular';
import { FirebaseProvider } from '../../providers/firebase/firebase';


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
  icodetailsId:string;

  tokenAddress:string;
  tokenAmount:any;
  tokenBalance:any;
  icoContractAddress:any;

  meals:number=2;
  size:number=8;
  cost:number;

  
  

  constructor(public navCtrl: NavController, public navParams: NavParams,public viewCtrl: ViewController,
    public alertCtrl: AlertController,public toastCtrl: ToastController, public firebaseProvider: FirebaseProvider) {
    this.icotitle = navParams.get('icotitle');
    this.presaleBonus = navParams.get('presaleBonus');
    this.presaleMin = navParams.get('presaleMin');
    this.presalePrice = navParams.get('presalePrice');
    this.status = navParams.get('status');
    this.icodetailsId = navParams.get('id');




    console.log("Contract address...",this.icoContractAddress);
    
    console.log("MEals ", this.meals);
    console.log("≠Size ", this.size);

  }


  getContractAddress() {
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad ContributePage');
  }
  dismiss() {
    this.viewCtrl.dismiss();
  }

  isOpen() {
   return true;
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

  presentToast2(msg:string) {
    let toast = this.toastCtrl.create({
      message: msg,
      duration: 3000
    });
    toast.present();
  }


  depositTokens() {
    console.log('Token Address', this.tokenAddress);
    console.log('Token tokenAmount', this.tokenAmount);
    let that = this;
    
  }

  getTokenBalance(addr:any){
    let that = this;
  }

  closePool() {
    let confirm = this.alertCtrl.create({
      title: 'Close the Pool',
      message: 'Are you sure you want to send ETH to this ICO and close the Pool?',
      buttons: [
        {
          text: 'No',
          handler: () => {
          }
        },
        {
          text: 'Yes',
          handler: () => {
            // this.dismiss();
            this.status = 'paid';
            this.firebaseProvider.updateIcodetails(this.icodetailsId,'paid');
            this.dismiss();
            this.presentToast2("Pool successfully closed. ETH sent to the ICO contract");
          }
        }
      ]
    });
    confirm.present();
  }

}
