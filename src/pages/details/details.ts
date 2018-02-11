import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { FirebaseProvider } from './../../providers/firebase/firebase';
import { FirebaseObjectObservable } from 'angularfire2/database-deprecated';
import { CustomizePlanPage } from '../customize-plan/customize-plan';


@IonicPage()
@Component({
  selector: 'page-icodetails',
  templateUrl: 'details.html',
})
export class DetailsPage {

  ico:any;
  
  public icoDetails$: FirebaseObjectObservable<any>;
  constructor(public navCtrl: NavController, public navParams: NavParams,
            public firebaseProvider: FirebaseProvider,public modalCtrl: ModalController) {
    this.ico = this.navParams.get('ico');
  
    this.icoDetails$ = this.firebaseProvider.getIcoDetails(this.ico.id);
    console.log("Ico Details ===> ", this.icoDetails$);


  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad IcodetailsPage');
  }

  openModal(icodetails) {
    
        console.log("Ico details ==> ", icodetails);
        let modal = this.modalCtrl.create(CustomizePlanPage, { icotitle: icodetails.title,
               presaleMin: icodetails.presaleMinimum, 
               presaleBonus: icodetails.presaleBonu,
              presalePrice: icodetails.presalePrice,
            status:icodetails.status,
          id:icodetails.$key});
        modal.present();
      }

}
