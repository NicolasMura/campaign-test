import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SomethingIsBrokenComponent } from '@campaign-test/frontend-tools';


const routes: Routes = [
  {
    path: '',
    redirectTo: 'campaigns',
    pathMatch: 'full'
  },
  {
    path: 'campaigns',
    loadChildren: () => import('./modules/campaign/campaign.module').then(m => m.CampaignModule)
  },
  {
    path: '**',
    component: SomethingIsBrokenComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
