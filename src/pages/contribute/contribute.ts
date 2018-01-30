import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController,AlertController,ToastController} from 'ionic-angular';

/**
 * Generated class for the ContributePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

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

  constructor(public navCtrl: NavController, public navParams: NavParams,public viewCtrl: ViewController,
    public alertCtrl: AlertController,public toastCtrl: ToastController) {
    this.icotitle = navParams.get('icotitle');
    this.presaleBonus = navParams.get('presaleBonus');
    this.presaleMin = navParams.get('presaleMin');
    this.presalePrice = navParams.get('presalePrice');

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
            this.dismiss();
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
