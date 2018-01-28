import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { IcodetailsPage } from './icodetails';

@NgModule({
  declarations: [
    IcodetailsPage,
  ],
  imports: [
    IonicPageModule.forChild(IcodetailsPage),
  ],
})
export class IcodetailsPageModule {}
