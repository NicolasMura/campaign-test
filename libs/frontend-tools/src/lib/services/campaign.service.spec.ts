import { HttpClient } from '@angular/common/http';
import { fakeAsync, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { Observable } from 'rxjs';
import { Brand, getBrandMock } from '@campaign-test/models';
import { environment } from '../../environment';
import { CampaignService } from './campaign.service';
import { NotificationService } from './notification.service';
import { ErrorHandlingService } from './error-handling.service';

export class TestUtilsService {
  static createSpyObj (baseName:string, methodNames:string[]): SpyObject {
    const obj: any = {};

    for (let i = 0; i < methodNames.length; i++) {
      obj[methodNames[i]] = jest.fn();
    }
    return {[baseName]:()=>obj};
  };
}

export class SpyObject {
  [key: string]: ()=>{[key:string]:jest.Mock} ;
}

// Fake todos and response object
const mockedBrands: Brand[] = [
  getBrandMock({name: 'Fake Brand 1'}),
  getBrandMock({name: 'Fake Brand 2'}),
  getBrandMock({name: 'Fake Brand 3'})
];
// const okResponse = new Response(JSON.stringify(brands), {
//   status: 200,
//   statusText: 'OK',
// });

// JSON Mocks (if we don't user real API)
const MOCK_URL_BRANDS = './assets/json-mocks/brands.json';
const MOCK_URL_PAYLOAD_RMP  = './assets/json-mocks/payload-rmp.json';

describe('CampaignService', () => {
  let campaignService: CampaignService;
  let httpTestingController: HttpTestingController;
  const httpClientSpy = {
    get: jest.fn()
  };
  // const spyHttpClient: SpyObject = TestUtilsService.createSpyObj('get',['toPromise']);

  // const httpMock = {
  //   get: jest.fn((brands: Brand[]) => brands)
  // };
  // const notificationServiceMock = {
  //   get: jest.fn()
  // };
  // const errorHandlingServiceMock = {
  //   get: jest.fn()
  // };

  // const httpMock = jest
  // .spyOn(global, 'fetch')
  // .mockImplementation(() =>
  //   Promise.resolve({ json: () => Promise.resolve([]) })
  // )

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
      ],
      providers:[
        { provide: NotificationService, useValue: {} },
        { provide: ErrorHandlingService, useValue: {} },
        // { provide: HttpClient, useValue: httpClientSpy }
        // { provide: HttpClient, useValue: spyHttpClient }
        // { provide: HttpClient, useValue: httpMock }
      ]
    }).compileComponents();
    campaignService = TestBed.inject(CampaignService);
    // service = new CampaignService(
    //   httpMock as any,
    //   notificationServiceMock as any,
    //   errorHandlingServiceMock as any
    // );
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(campaignService).toBeTruthy();
  });

  it('gets all the brands from API', async () => {
    // // const expectedBrands: Brand[] = await campaignService.getAllBrands();
    // httpClientSpy.get.mockReturnValueOnce(mockedBrands);

    // const [err, actualBrands] = await campaignService.getAllBrands();

    // expect(actualBrands).toEqual(mockedBrands);



    // const mockTemplates: Template[] = [/* you know how a template should look like so mock it*/];
    // make HTTP call take flight
    campaignService.getAllBrandsFromApi().subscribe((brands: Brand[]) => {
      console.log('BOB inside subscribe');
      console.log(brands);
      expect(brands).toEqual(mockedBrands);
      // expect(mockLoggingService.logger).toHaveBeenCalledWith(`User viewed templates: ${templates}`);
    });

    // have a handle on the HTTP call that is about to take flight
    const req = httpTestingController.expectOne(campaignService.baseUrlCampaign);
    // const req = httpTestingController.expectOne(MOCK_URL_BRANDS);

    console.log('BOB');
    expect(req.request.method).toEqual('GET');
    // send this request for the next HTTP call
    req.flush(mockedBrands);
  });

  // it('gets all the brands from middleware', fakeAsync(() => {
  //   // httpClientSpy.get.mockReturnValueOnce(mockedBrands);

  //   campaignService.getAllBrandsFromApi().subscribe((brands: Brand[]) => {
  //     expect(brands).toEqual(mockedBrands);
  //     // expect(mockLoggingService.logger).toHaveBeenCalledWith(`User viewed templates: ${templates}`);
  //   });

  //   // have a handle on the HTTP call that is about to take flight
  //   const req = httpTestingController.expectOne(campaignService.baseUrlCampaign);

  //   expect(req.request.method).toEqual('GET');
  //   // send this request for the next HTTP call
  //   req.flush(mockedBrands);
  // }));
});
