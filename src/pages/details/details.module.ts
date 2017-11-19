import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { Details } from './details';
import { ScrollTabsComponentModule } from '../../components/scrolltabs';
import { ShareModule } from '../share/share.module';

@NgModule({
  declarations: [
    Details
  ],
  imports: [
    ShareModule,
    ScrollTabsComponentModule,
    IonicPageModule.forChild(Details),
  ],
  exports: [
    Details
  ]
})
export class DetailsModule {}
