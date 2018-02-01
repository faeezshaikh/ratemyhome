import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { MycontributionsPage } from '../pages/mycontributions/mycontributions';
import { Web3ServiceProvider } from '../providers/web3-service/web3-service';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = ListPage;
  myBalance:string;

  pages: Array<{title: string, component: any,icon:string}>;

  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen,private web3Service: Web3ServiceProvider) {
    this.initializeApp();
    this.myBalance = this.web3Service.getMyCurrentBalance();

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Upcoming ICOs', component: ListPage, icon:'fa fa-cart-plus' },
      { title: 'My contributions', component: MycontributionsPage, icon:'fa fa-users' }
      // { title: 'Home', component: HomePage, icon:'fa fa-users' }
    ];

  }

  refresh() {
    this.myBalance = this.web3Service.getMyCurrentBalance();
  }
  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }
}
