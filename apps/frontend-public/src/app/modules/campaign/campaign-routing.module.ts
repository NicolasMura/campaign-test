import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CoreConstants } from '@campaign-test/frontend-tools';
import { CampaignListComponent } from './campaign-list/campaign-list.component';
import { CampaignUpdateComponent } from './campaign-update/campaign-update.component';


const routes: Routes = [
  {
    path: '',
    component: CampaignListComponent
  },
  {
    path: `:requestId/${CoreConstants.routePath.campaigns.update}`,
    component: CampaignUpdateComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CampaignRoutingModule { }
