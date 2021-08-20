import { Component, OnInit, AfterViewInit, ElementRef, HostListener, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { CampaignService, CoreConstants, fadeInOutAnimation } from '@campaign-test/frontend-tools';
import { Brand, Campaign, CampaignStatus, CampaignStatusIcons } from '@campaign-test/models';


/**
 * Component that displays a list of campaigns
 */
@Component({
  selector: 'campaign-test-campaign-list',
  templateUrl: './campaign-list.component.html',
  styleUrls: ['./campaign-list.component.scss'],
  animations: [fadeInOutAnimation]
})
export class CampaignListComponent implements OnInit, AfterViewInit {
  /**
   * Campaigns list displayed columns
   */
  public displayedColumns = ['status', 'campaignName', 'advice', 'brand', 'submittedDate', 'actions'];
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
    somethingIsBroken: { // handle HTTP errors
      statusCode: string,
      statusMessage: string
    }
  } = {
    somethingIsBroken: {
      statusCode: '',
      statusMessage: ''
    }
  };
  /**
   * Set MatPaginator dynamically
   */
  @ViewChild(MatPaginator, { static: false }) private set paginate(matPaginator: MatPaginator) {
    this.dataSource.paginator = matPaginator;
  }
  /**
   * Reference to search input ElementRef for CTRL + F event binding
   */
  private searchInputRef: ElementRef = null as any;
  /**
   * Set search input ElementRef dynamically
   */
  @ViewChild('searchInputRef', { static: false }) private set input(searchInputRef: ElementRef) {
    this.searchInputRef = searchInputRef;
  }
  /**
   * Campaign available status for use in template
   */
  public campaignAvailableStatus = CampaignStatus;
  /**
   * Campaign available status icons used in template
   */
  public campaignAvailableStatusIcons = CampaignStatusIcons;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    public campaignService: CampaignService
  ) { }

  ngOnInit(): void {
    this.isListRefreshing = true;

    this.getAllCampaigns().then((campaigns: Campaign[]) => {
      this.dataSource.data = campaigns;
    }).catch(error => {
      this.errors.somethingIsBroken.statusCode = error.status && error.status !== 0 ? error.status.toString() : '0';
      this.errors.somethingIsBroken.statusMessage = error.message && error.message !== 0 ? error.message : 'Unknown error';
    }).finally(() => {
      this.isListRefreshing = false;
    });

    // Custom filtering
    this.dataSource.filterPredicate = this.createCustomFilter();
  }

  ngAfterViewInit(): void {
    // Apply search
    setTimeout(() => {
      this.applySearch();
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
        resolve(campaigns);
      }, error => {
        console.error(error);
        reject(error);
      });
    });
  }

  /**
   * Custom filter for Material Table
   */
  private createCustomFilter(): (campaign: Campaign, filter: string) => boolean {
    const filterFunction = (campaign: Campaign, filter: string): boolean => {
      const userSearch: { searchInput: string, selectedBrand: Brand | null } = JSON.parse(filter);
      if (!userSearch.searchInput) {
        userSearch.searchInput = '';
      }
      if (!userSearch.selectedBrand) {
        userSearch.selectedBrand = null;
      }

      return ((campaign?.campaignName?.trim().replace(/\s/g, '').toLowerCase().indexOf(userSearch.searchInput.trim().replace(/\s/g, '').toLowerCase()) !== -1)
        || (campaign?.brand?.name?.trim().replace(/\s/g, '').toLowerCase().indexOf(userSearch.searchInput.trim().replace(/\s/g, '').toLowerCase()) !== -1))
        && (this.campaignService.selectedBrand ? campaign.brand.brandId === this.campaignService.selectedBrand.brandId : true);
    };

    return filterFunction;
  }

  /**
   * Apply user search for real-time filtering
   */
  public applySearch(): void {
    this.dataSource.filter = JSON.stringify({ searchInput: this.campaignService.searchInput, selectedBrand: this.campaignService.selectedBrand });
  }

  /**
   * Route to campaign update page
   */
  public goToCampaignUpdate(campaign: Campaign): void {
    // Normally, we should only need the campaign id: we should then be able to retrieve the campaign details from API with its requestId and test if it exists or not
    // Here we have no endpoint yet for that, hence we use the service variable this.campaignService.selectedCampaign to store the details
    this.campaignService.selectedCampaign = campaign;

    this.router.navigate(
      [ campaign.requestId, CoreConstants.routePath.campaigns.update ],
      {
        relativeTo: this.route
      }
    );
  }

  /**
   * Scan for CTRL + F event
   */
  @HostListener('window:keydown', ['$event'])
  onKeyPress($event: KeyboardEvent): void {
    if (($event.ctrlKey || $event.metaKey) && $event.code === 'KeyF') {
      $event.preventDefault(); // to prevent the browser from opening its own default search box
      this.searchInputRef.nativeElement.focus();
    }
  }

}
