import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { CampaignService, FrontendToolsModule } from '@campaign-test/frontend-tools';
import { Brand, Campaign, getBrandMock, getCampaignMock } from '@campaign-test/models';
import { MaterialModule } from '@campaign-test/vendors';
import { of } from 'rxjs';
import { CampaignUpdateComponent } from './campaign-update.component';
import { CampaignComponentsModule } from '../components/campaign-components.module';

// Fake brands / campaigns
const mockedBrands: Brand[] = [
  getBrandMock({ brandId: 1, name: 'Fake Brand 1' }),
  getBrandMock({ brandId: 2, name: 'Fake Brand 2' }),
  getBrandMock({ brandId: 3, name: 'Fake Brand 3' })
];
const mockedCampaigns: Campaign[] = [
  getCampaignMock({ campaignName: 'Fake Campaign 1', brand: mockedBrands[0] }),
  getCampaignMock({ campaignName: 'Fake Campaign 1 bis', brand: mockedBrands[1] }),
  getCampaignMock({ campaignName: 'Fake Campaign 2', brand: mockedBrands[2] }),
  getCampaignMock({ campaignName: 'Fake Campaign 3', brand: mockedBrands[2] })
];

describe('CampaignUpdateComponent', () => {
  let component: CampaignUpdateComponent;
  let fixture: ComponentFixture<CampaignUpdateComponent>;

  const campaignServiceMock = {
    getAllCampaigns: jest.fn().mockReturnValue(of(mockedCampaigns)),
    availableBrands: mockedBrands,
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CampaignUpdateComponent ],
      imports: [
        BrowserAnimationsModule,
        RouterTestingModule,
        FormsModule,
        MaterialModule,
        FrontendToolsModule,
        CampaignComponentsModule
      ],
      providers: [
        { provide: CampaignService, useValue: campaignServiceMock }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CampaignUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('creates', () => {
    expect(component).toBeTruthy();
  });
});
