import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CheckOrderStatusPage } from './check-order-status';

@NgModule({
  declarations: [
    CheckOrderStatusPage,
  ],
  imports: [
    IonicPageModule.forChild(CheckOrderStatusPage),
  ],
})
export class CheckOrderStatusPageModule {}
