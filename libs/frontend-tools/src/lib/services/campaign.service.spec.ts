import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { Brand, Campaign, getBrandMock, getCampaignMock } from '@campaign-test/models';
import { CampaignService } from './campaign.service';
import { NotificationService } from './notification.service';
import { ErrorHandlingService } from './error-handling.service';


// Fake brands / campaigns
const mockedBrands: Brand[] = [
  getBrandMock({ brandId: 1, name: 'Fake Brand 1' }),
  getBrandMock({ brandId: 2, name: 'Fake Brand 2' }),
  getBrandMock({ brandId: 3, name: 'Fake Brand 3' })
];
const mockedCampaigns: Campaign[] = [
  getCampaignMock({ campaignName: 'Fake Campaign 1' }),
  getCampaignMock({ campaignName: 'Fake Campaign 2' }),
  getCampaignMock({ campaignName: 'Fake Campaign 3' })
];

// let campaignsListUrl: string;
let campaignsListMockUrl: string;
// let brandsListUrl: string;
let brandsListMockUrl: string;

describe('CampaignService', () => {
  let campaignService: CampaignService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
      ],
      providers:[
        { provide: NotificationService, useValue: {} },
        { provide: ErrorHandlingService, useValue: {} }
      ]
    }).compileComponents();
    campaignService = TestBed.inject(CampaignService);

    // campaignsListUrl = `${campaignService.baseUrlCampaign}/campaigns`;
    campaignsListMockUrl = './assets/json-mocks/payload-rmp.json';
    // brandsListUrl = `${campaignService.baseUrlCampaign}/brands`;
    brandsListMockUrl = './assets/json-mocks/brands.json';

    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(campaignService).toBeTruthy();
  });

  it('gets all the brands from API', async () => {
    // make HTTP call take flight
    campaignService.getAllBrandsFromApi().subscribe((brands: Brand[]) => {
      expect(brands).toEqual(mockedBrands);
    });

    // have a handle on the HTTP call that is about to take flight
    // const req = httpTestingController.expectOne(brandsListUrl);
    const req = httpTestingController.expectOne(brandsListMockUrl);

    expect(req.request.method).toEqual('GET');

    // send this request for the next HTTP call
    req.flush(mockedBrands);
  });

  it('gets all the campaigns from API', async () => {
    // make HTTP call take flight
    campaignService.getAllCampaignsFromApi().subscribe((response: { totalVolume: number, requests: Campaign[]}) => {
      expect(response.requests).toEqual(mockedCampaigns);
    });

    // have a handle on the HTTP call that is about to take flight
    // const req = httpTestingController.expectOne(campaignsListUrl);
    const req = httpTestingController.expectOne(campaignsListMockUrl);

    expect(req.request.method).toEqual('GET');

    // send this request for the next HTTP call
    req.flush(mockedCampaigns);
  });

  // @TODO
  // it('gets all the brands from middleware', fakeAsync(() => {
  // }));

  // @TODO
  // it('gets all the campaigns from middleware', fakeAsync(() => {
  // }));
});
