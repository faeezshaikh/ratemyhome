import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ContributionDetailsPage } from './contribution-details';

@NgModule({
  declarations: [
    ContributionDetailsPage,
  ],
  imports: [
    IonicPageModule.forChild(ContributionDetailsPage),
  ],
})
export class ContributionDetailsPageModule {}
