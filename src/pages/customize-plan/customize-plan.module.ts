import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CustomizePlanPage } from '../customize-plan/customize-plan';

@NgModule({
  declarations: [
    CustomizePlanPage,
  ],
  imports: [
    IonicPageModule.forChild(CustomizePlanPage),
  ],
})
export class ContributePageModule {}
