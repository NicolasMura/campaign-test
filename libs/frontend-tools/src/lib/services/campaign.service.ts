import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { delay, catchError, map, mergeMap } from 'rxjs/operators';
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
        delay(1000),
        map((brands: Brand[]) => {
          const brandsWellFormatted = brands.map((brand: Brand) => new Brand({
            brandId: brand.brandId,
            name: brand.name
          }));
          // console.log(brandsWellFormatted[0].constructor.name);
          return brandsWellFormatted;
        }),
        catchError(error => this.handleError(error))
      )
      // .toPromise()
      // .then((brands: Brand[]) => [null, brands] as any)
      // // .catch(err => {
      // //   this.handleErrorTest(err)
      // //   return [err]
      // // });
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
        delay(1000),
        map((response: { totalVolume: number, requests: Campaign[]}) => response.requests),
        map((campaigns: Campaign[]) => {
          const campaignsWellFormatted = campaigns.map((campaign: Campaign) => new Campaign({
            campaignName: campaign.campaignName,
            advice: campaign.advice,
            brand: campaign.brand,
            submittedDate: campaign.submittedDate,
            requestStatus: campaign.requestStatus
          }));
          // console.log(campaignsWellFormatted[0].constructor.name);
          return campaignsWellFormatted;
        }),
        catchError(error => this.handleError(error))
      )
      // .toPromise()
      // .then((campaigns: Campaign[]) => [null, campaigns] as any)
      // // .catch(err => {
      // //   this.handleErrorTest(err)
      // //   return [err]
      // // });
  }
}
