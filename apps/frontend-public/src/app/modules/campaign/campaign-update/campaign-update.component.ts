import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CoreConstants, CampaignService, NotificationService, fadeInOutAnimation } from '@campaign-test/frontend-tools';
import { Brand, Campaign } from '@campaign-test/models';


@Component({
  selector: 'campaign-test-campaign-update',
  templateUrl: './campaign-update.component.html',
  styleUrls: ['./campaign-update.component.scss'],
  animations: [fadeInOutAnimation]
})
export class CampaignUpdateComponent implements OnInit {
  /**
   * Campaign displayed in the form
   */
  public campaign: Campaign = null as any;
  /**
   * Boolean that allows to display a loading spinner if form is being built or submitted
   */
  public showFormLoadingSpinner = true;
  /**
   * Error management
   */
  public errors: {
    getAvailableBrands: boolean // true if available brands can't be retrieved,
    somethingIsBroken: {
      statusCode: string,
      statusMessage: string
    }
  } = {
    getAvailableBrands: false,
    somethingIsBroken: {
      statusCode: '',
      statusMessage: ''
    }
  };

  constructor(
    private router: Router,
    public route: ActivatedRoute,
    public campaignService: CampaignService,
    private notificationService: NotificationService
  ) { }

  ngOnInit(): void {
    const requestId = this.route.snapshot.paramMap.get('requestId');

    if (!requestId) {
      this.router.navigate([CoreConstants.routePath.campaigns.root]);
    }

    // Normally, we should be able to access directly to this route, retrieve the campaign details from API with its requestId and then test if it exists or not
    // Here we have no endpoint yet for that, hence we use the service variable this.campaignService.selectedCampaign to store details
    if (this.campaignService.selectedCampaign) {
      this.campaign = this.campaignService.selectedCampaign;

      // Get brands if needed
      if (this.campaignService.allBrands?.length === 0) {
        this.getAllBrands().then().catch(error => {
          this.errors.somethingIsBroken.statusCode = error.status && error.status !== 0 ? error.status.toString() : '0';
          this.errors.somethingIsBroken.statusMessage = error.message && error.message !== 0 ? error.message : 'Unknown error';
          this.errors.getAvailableBrands = true;
        }).finally(() => {
          this.showFormLoadingSpinner = false;
        });
      } else {
        this.showFormLoadingSpinner = false;
      }
    } else {
      this.router.navigate([CoreConstants.routePath.campaigns.root]);
    }
  }

  /**
   * Get all brands
   */
  private getAllBrands(): Promise<Brand[]> {
    return new Promise((resolve, reject) => {
      this.campaignService.getAllBrands()
      .toPromise()
      .then((brands: Brand[]) => {
        console.log(brands);
        resolve(brands);
      }, error => {
        console.error(error);
        reject(error);
      });
    });
  }

  /**
   * Go back to campaigns list
   */
  public goBackToCampaignsList(): void {
    this.router.navigate([CoreConstants.routePath.campaigns.root]);
  }

}








// import { Component, OnInit } from '@angular/core';
// import { CoreConstants } from 'projects/lib-mycloud/src/lib/core/core-constants';
// import { PermissionService } from 'projects/lib-mycloud/src/lib/shared/services/permission.service';
// import { NotificationService } from 'projects/lib-mycloud/src/lib/shared/services/notification.service';
// import { Permission } from 'projects/lib-mycloud/src/lib/shared/models/permission.model';
// import { fadeInOutAnimation } from 'projects/lib-mycloud/src/lib/shared/animations/animations';
// import { Campaign } from '@campaign-test/models';

// /*
//  * Permission Update Page Component
//  */
// @Component({
//   selector: 'mc-admin-permission-update',
//   templateUrl: './admin-permission-update.component.html',
//   styleUrls: ['./admin-permission-update.component.scss'],
//   animations: [fadeInOutAnimation]
// })
// export class AdminPermissionUpdateComponent implements OnInit {
//   /**
//    * Permission displayed in form
//    */
//   public permission: Permission;
//   /**
//    * Boolean that allows to display a loading spinner if form is being built or submitted
//    */
//   public showFormLoadingSpinner = true;

//   constructor(
//     private router: Router,
//     public route: ActivatedRoute,
//     private permissionService: PermissionService,
//     protected notificationService: NotificationService
//   ) {}

//   ngOnInit(): void {
    
//   }

//   /**
//    * Go back to permissions list
//    */
//   public goToPermissionsList(): void {
//     this.router.navigate([CoreConstants.routePath.admin.permissions.root]);
//   }
// }
