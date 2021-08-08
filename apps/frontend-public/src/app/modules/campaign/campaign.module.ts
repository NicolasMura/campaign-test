import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CampaignRoutingModule } from './campaign-routing.module';
import { CampaignListComponent } from './campaign-list/campaign-list.component';
import { MaterialModule } from '@campaign-test/vendors';


@NgModule({
  declarations: [
    CampaignListComponent
  ],
  imports: [
    CommonModule,
    CampaignRoutingModule,
    MaterialModule
  ]
})
export class CampaignModule { }
