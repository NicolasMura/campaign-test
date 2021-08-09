import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { NotificationService } from '@campaign-test/frontend-tools';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { Brand, Campaign, Media } from '@campaign-test/models';
import { MatCheckboxChange } from '@angular/material/checkbox';
// import { fadeInOutAnimation } from 'projects/lib-mycloud/src/lib/shared/animations/animations';


/**
 * Campaign Form (update) Component
 * @Note this component can easily be adapted to be reusable in a create view
 */
@Component({
  selector: 'campaign-test-campaign-form',
  templateUrl: './campaign-form.component.html',
  styleUrls: ['./campaign-form.component.scss'],
  // animations: [fadeInOutAnimation]
})
export class CampaignFormComponent implements OnInit {
  /**
   * Campaign input
   */
  @Input() public set campaign(campaign: Campaign) {
    if (campaign) {
      console.log(campaign);
      this.campaignForm.addControl('requestId', new FormControl({ value: campaign.requestId, disabled: true }));

      this.campaignForm.patchValue({
        brandId: campaign.brand.brandId,
        campaignName: campaign.campaignName,
        decisionDeadline: campaign.decisionDeadline
      });

      this.campaignForm.removeControl('media');
      this.campaignForm.addControl(
        'media',
        new FormArray(
          campaign.media.map((media: Media) => new FormControl(media)),
          Validators.required
        )
      );

      this.showFormLoadingSpinner = false;
    }
  };
  /**
   * Available brands input
   */
  @Input() public set availableBrands(brands: Brand[]) {
    if (brands?.length > 0) {
      this.campaignForm.enable();
      this.brands = brands;
    }
  }
  /**
   * Available brands
   */
  public brands: Brand[] = [];
  /**
   * Action output (create or update)
   */
  @Output() private action: EventEmitter<string> = new EventEmitter<string>();
  /**
   * Campaign form displayed in template
   */
  public campaignForm: FormGroup;
  /**
   * Boolean that allows to display a loading spinner if form is being built
   */
  public showFormLoadingSpinner = true;
  /**
   * Boolean that allows to display a loading spinner on submit button if form is being submitted
   */
  public submitLoadingSpinner = false;
  /**
   * Errors management
   */
  public errors: {
    update: boolean,            // true if campaign update fails
    getAvailableBrands: boolean // true if available brands can't be retrieved
  } = {
    update: false,
    getAvailableBrands: false
  };
  /**
   * Available medias
   */
  medias: Media[] = [
    new Media({ mediaId: 1, name: 'LABELING_PACKAGING', value: 'Label/Packaging' }),
    new Media({ mediaId: 2, name: 'NEW_PRODUCT_INNOVATION', value: 'New Product/innovation' }),
    new Media({ mediaId: 3, name: 'OOH', value: 'OOH' }),
    new Media({ mediaId: 4, name: 'PRINT', value: 'Print' }),
    new Media({ mediaId: 5, name: 'SPONSORSHIP', value: 'Sponsorship' }),
    new Media({ mediaId: 6, name: 'PROMOTIONS', value: 'Promotions' }),
    new Media({ mediaId: 7, name: 'RADIO', value: 'Radio' }),
    new Media({ mediaId: 8, name: 'WEBSITE', value: 'Website' }),
    new Media({ mediaId: 9, name: 'SOCIAL_MEDIA', value: 'Social Media' }),
    new Media({ mediaId: 10, name: 'TVC_ONLINE_VIDEOS', value: 'TVC/Online videos' }),
    new Media({ mediaId: 11, name: 'OTHERS', value: 'Others' }),
    new Media({ mediaId: 12, name: 'COLLABORATION', value: 'Collaboration' })
  ];

  constructor(
    private notificationService: NotificationService
  ) {
    // initialize form
    this.campaignForm = new FormGroup({
      brandId: new FormControl('', Validators.required),
      campaignName: new FormControl('', Validators.required),
      media: new FormArray([], Validators.required),
      decisionDeadline: new FormControl('', Validators.required)
    });

    this.campaignForm.disable();
  }

  ngOnInit(): void {
    console.log('Bouh');
  }

  check(media: Media): boolean {
    return this.campaignForm.get('media')?.value.some((m: Media) => m.mediaId === media.mediaId);
  }

  onCbChange(event: MatCheckboxChange, media: Media): void {
    const array: FormArray = this.campaignForm.get('media') as FormArray;

    console.log(event);
    if (event.checked) {
      array.push(new FormControl(media));
    } else {
      let i = 0;
      (array.controls as FormControl[]).forEach((item: FormControl) => {
        if ((item.value as Media).mediaId == media.mediaId) {
          array.removeAt(i);
          return;
        }
        i++;
      });
    }
  }

  /**
   * Update campaign
   */
   public updateCampaign(): void {
    // if (this.permissionForm.valid) {
    //   this.submitLoadingSpinner = true;
    //   this.permissionForm.disable();

    //   this.permissionService.updatePermission(this.permissionForm.getRawValue())
    //     .subscribe((updatedPermission: Permission) => {
    //       this.submitLoadingSpinner = false;
    //       this.permissionForm.enable();
    //       this.notificationService.sendNotification('Permission updated successfully', '', { duration: 5000 });
    //       this.action.emit('update');
    //     }, error => {
    //       console.error(error);
    //       this.submitLoadingSpinner = false;
    //       this.errors.update = true;
    //       this.permissionForm.enable();
    //     });
    // }
  }

}
