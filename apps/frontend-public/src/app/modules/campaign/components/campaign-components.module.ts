import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CampaignFormComponent } from './campaign-form/campaign-form.component';
import { MaterialModule } from '@campaign-test/vendors';


@NgModule({
  declarations: [
    CampaignFormComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule
  ],
  exports: [
    CampaignFormComponent
  ]
})
export class CampaignComponentsModule { }
