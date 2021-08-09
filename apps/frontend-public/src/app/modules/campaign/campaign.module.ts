import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MaterialModule } from '@campaign-test/vendors';
import { CampaignRoutingModule } from './campaign-routing.module';
import { CampaignListComponent } from './campaign-list/campaign-list.component';
import { CampaignUpdateComponent } from './campaign-update/campaign-update.component';
import { CampaignComponentsModule } from './components/campaign-components.module';
import { FrontendToolsModule } from '@campaign-test/frontend-tools';


@NgModule({
  declarations: [
    CampaignListComponent,
    CampaignUpdateComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    MaterialModule,
    CampaignRoutingModule,
    CampaignComponentsModule,
    FrontendToolsModule
  ]
})
export class CampaignModule { }
