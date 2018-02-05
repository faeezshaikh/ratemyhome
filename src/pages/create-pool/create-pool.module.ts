import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CreatePoolPage } from './create-pool';

@NgModule({
  declarations: [
    CreatePoolPage,
  ],
  imports: [
    IonicPageModule.forChild(CreatePoolPage),
  ],
})
export class CreatePoolPageModule {}
