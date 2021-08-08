import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { CampaignService } from '@campaign-test/frontend-tools';
import { Brand, Campaign } from '@campaign-test/models';


/**
 * Component that displays a list of campaigns
 */
@Component({
  selector: 'campaign-test-campaign-list',
  templateUrl: './campaign-list.component.html',
  styleUrls: ['./campaign-list.component.scss']
})
export class CampaignListComponent implements OnInit {
  /**
   * Campaigns list displayed columns
   */
  public displayedColumns = ['status', 'campaignName', 'advice', 'brand', 'submittedDate'];
  /**
   * Campaigns data source for Material Table
   */
  public dataSource: MatTableDataSource<Campaign> = new MatTableDataSource<Campaign>([]);
  /**
   * Boolean that indicates if campaigns list is being refreshed
   */
  public isListRefreshing = false;
  /**
   * Error management
   */
  public errors: {
    somethingIsBroken: {
      statusCode: string,
      statusMessage: string
    }
  } = {
    somethingIsBroken: {
      statusCode: '',
      statusMessage: ''
    }
  };

  constructor(
    private campaignService: CampaignService
  ) { }

  ngOnInit(): void {
    this.isListRefreshing = true;

    this.getAllCampaigns().then((campaigns: Campaign[]) => {
      this.dataSource.data = campaigns;
      this.getAllBrands();
    }).catch(error => {
      this.errors.somethingIsBroken.statusCode = error.status && error.status !== 0 ? error.status.toString() : '0';
      this.errors.somethingIsBroken.statusMessage = error.message && error.message !== 0 ? error.message : 'Unknown error';
    }).finally(() => {
      this.isListRefreshing = false;
    });
  }

  /**
   * Get all campaigns
   */
   private getAllCampaigns(): Promise<Campaign[]> {
    return new Promise((resolve, reject) => {
      this.campaignService.getAllCampaigns()
      .toPromise()
      .then((campaigns: Campaign[]) => {
        console.log(campaigns);
        resolve(campaigns);
      }, error => {
        console.error(error);
        reject(error);
      });
    });
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

}
