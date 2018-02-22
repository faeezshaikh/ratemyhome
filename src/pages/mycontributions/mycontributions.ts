import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FirebaseProvider } from './../../providers/firebase/firebase';
import { FirebaseListObservable } from 'angularfire2/database-deprecated';
// import { ContributionDetailsPage } from '../contribution-details/contribution-details';
import { LoginProvider } from '../../providers/login/login';


@IonicPage()
@Component({
  selector: 'page-mycontributions',
  templateUrl: 'mycontributions.html',
})
export class MycontributionsPage {
  mycontributions:FirebaseListObservable<any[]>;

  constructor(public navCtrl: NavController, public navParams: NavParams,  public firebaseProvider: FirebaseProvider,
  private loginService: LoginProvider) {
    // this.mycontributions = this.firebaseProvider.getMyContributions(1);
  }

  logoutOfFacebook() {
    console.log('Logout of FB called');
    this.loginService.logoutOfFacebook();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MycontributionsPage');
  }

  itemTapped(event, item) {
    console.log("Contribution ==> ", item);
    this.navCtrl.push(ContributionDetailsPage, {
      contribution: item
    });
  }

}
