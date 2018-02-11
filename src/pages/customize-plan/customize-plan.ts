import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController,AlertController,ToastController} from 'ionic-angular';
import { FirebaseProvider } from '../../providers/firebase/firebase';


@IonicPage()
@Component({
  selector: 'page-contribute',
  templateUrl: 'customize-plan.html',
})
export class CustomizePlanPage {
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
  total:number=168;
  perMeal:number=12;

  
  

  constructor(public navCtrl: NavController, public navParams: NavParams,public viewCtrl: ViewController,
    public alertCtrl: AlertController,public toastCtrl: ToastController, public firebaseProvider: FirebaseProvider) {
    this.icotitle = navParams.get('icotitle');
    this.presaleBonus = navParams.get('presaleBonus');
    this.presaleMin = navParams.get('presaleMin');
    this.presalePrice = navParams.get('presalePrice');
    this.status = navParams.get('status');
    this.icodetailsId = navParams.get('id');




    console.log("Contract address...",this.icoContractAddress);
    

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

  onChange(val) {
    console.log("MEals ", this.meals);
    console.log("≠Size ", this.size);

    if(this.meals == 2 && this.size == 4) { this.perMeal=9;  this.total=126;}
    if(this.meals == 2 && this.size == 8) { this.perMeal=12;  this.total=168;}
    if(this.meals == 3 && this.size == 4) { this.perMeal=8;  this.total=168;}
    if(this.meals == 3 && this.size == 8) { this.perMeal=11;  this.total=231;}
  }
  showConfirm(contribution:number ) {
    let confirm = this.alertCtrl.create({
      title: 'Add to Cart',
      message: 'Are you sure you want to add this meal to cart for a total of: $ ' + this.total,
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
            this.presentToast('Order for $' + this.total + ' successfully added to your cart.');
          }
        }
      ]
    });
    confirm.present();
  }



  presentToast(msg:string) {
    let toast = this.toastCtrl.create({
      message: msg,
      duration: 3000
    });
    toast.present();
  }





}
