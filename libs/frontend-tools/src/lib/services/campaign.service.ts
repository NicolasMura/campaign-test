import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { delay, catchError, map, tap } from 'rxjs/operators';
import { environment } from '@campaign-test/frontend-tools';
import { Brand, Campaign } from '@campaign-test/models';
import { GlobalService } from './global-service.service';
import { NotificationService } from './notification.service';
import { ErrorHandlingService } from './error-handling.service';

// JSON Mocks
const MOCK_URL_BRANDS = './assets/json-mocks/brands.json';
const MOCK_URL_PAYLOAD_RMP  = './assets/json-mocks/payload-rmp.json';

/**
 * Campaign Service
 */
@Injectable({
  providedIn: 'root'
})
export class CampaignService extends GlobalService {
  /**
   * API endpoint
   */
  public baseUrlCampaign = environment.backendApi.baseUrlCampaign;
  /**
   * API endpoint
   */
  public campaignsList: Brand[] = [];
  /**
   * Selected campaign for update
   */
  public selectedCampaign: Campaign | null = null;
  /**
   * All brands
   */
  public allBrands: Brand[] = [];
  /**
   * Available brands retrieved from campaigns
   */
  public availableBrands: Brand[] = [];
  /**
   * Selected campaign for update
   */
  public selectedBrand: Brand | null = null;

  constructor(
    private http: HttpClient,
    protected notificationService: NotificationService,
    protected errorHandlingService: ErrorHandlingService
  ) {
    super(errorHandlingService);
  }

  /**
   * Retrieve the list of brands - API call
   */
   public getAllBrandsFromApi(): Observable<Brand[]> {
    // const url = `${this.baseUrlCampaign}/brands`; // API endpoint (if we use real API)
    const url = MOCK_URL_BRANDS; // Static JSON Mock (if we don't use real API)

    return this.http.get<Brand[]>(url);
  }

  /**
   * Process the list of brands - Middleware
   */
   public getAllBrands(): Observable<Brand[]> {

    return this.getAllBrandsFromApi()
      .pipe(
        // retry(3),
        // timeout(5000),
        // delay(1000),
        map((brands: Brand[]) => {
          const brandsWellFormatted: Brand[] = brands.map((brand: Brand) => new Brand({
            brandId: brand.brandId,
            name: brand.name
          }));
          // console.log(brandsWellFormatted[0].constructor.name);

          // store the value in the service
          this.allBrands = brandsWellFormatted;

          return brandsWellFormatted;
        }),
        catchError(error => this.handleError(error))
      )
  }

  /**
   * Retrieve the list of campaigns - API call
   */
   public getAllCampaignsFromApi(): Observable<{ totalVolume: number, requests: Campaign[]}> {
    // const url = `${this.baseUrlCampaign}/campaigns`; // API endpoint (if we use real API)
    const url = MOCK_URL_PAYLOAD_RMP; // Static JSON Mock (if we don't use real API)

    return this.http.get<{ totalVolume: number, requests: Campaign[]}>(url);
  }

  /**
   * Process the list of campaigns - Middleware
   */
  public getAllCampaigns(): Observable<Campaign[]> {

    return this.getAllCampaignsFromApi()
      .pipe(
        // delay(1000),
        map((response: { totalVolume: number, requests: Campaign[]}) => response.requests),
        map((campaigns: Campaign[]) => {
          const campaignsWellFormatted: Campaign[] = campaigns.map((campaign: Campaign) => new Campaign({
            requestId: campaign.requestId,
            campaignName: campaign.campaignName,
            advice: campaign.advice,
            brand: campaign.brand,
            submittedDate: campaign.submittedDate,
            requestStatus: campaign.requestStatus,
            media: campaign.media,
            decisionDeadline: campaign.decisionDeadline
          }));
          // console.log(campaignsWellFormatted[0].constructor.name);
          return campaignsWellFormatted;
        }),
        tap((campaigns: Campaign[]) => {
          if (this.availableBrands.length === 0) {
            // Get available brands
            this.availableBrands = campaigns.reduce(
              (
                result: Brand[],
                currentCampaign: Campaign
              ) => {
                const existingBrandObject: Brand | undefined = result.find(
                  (brandObject: Brand) =>
                    brandObject.name === currentCampaign.brand.name
                );
                if (!existingBrandObject) {
                  result.push(currentCampaign.brand);
                }

                return result;
              },
              []
            );
          }

          // Sort them by id
          this.availableBrands.sort((b1: Brand, b2: Brand) => b1.brandId - b2.brandId);
        }),
        catchError(error => this.handleError(error))
      )
  }

  /**
   * Update campaign - API call (Mock)
   */
  public updateCampaign(campaign: Campaign): Observable<Campaign> {
    return of(campaign).pipe(delay(1000));
  }
}
