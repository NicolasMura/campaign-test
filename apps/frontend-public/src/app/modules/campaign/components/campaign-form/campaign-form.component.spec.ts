import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CampaignService, FrontendToolsModule } from '@campaign-test/frontend-tools';
import { Brand, Campaign, getBrandMock, getCampaignMock } from '@campaign-test/models';
import { MaterialModule } from '@campaign-test/vendors';
import { of } from 'rxjs';
import { CampaignFormComponent } from './campaign-form.component';

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

describe('CampaignFormComponent', () => {
  let component: CampaignFormComponent;
  let fixture: ComponentFixture<CampaignFormComponent>;

  const campaignServiceMock = {
    getAllCampaigns: jest.fn().mockReturnValue(of(mockedCampaigns)),
    availableBrands: mockedBrands,
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CampaignFormComponent ],
      imports: [
        BrowserAnimationsModule,
        FormsModule,
        ReactiveFormsModule,
        MaterialModule,
        FrontendToolsModule
      ],
      providers: [
        { provide: CampaignService, useValue: campaignServiceMock }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CampaignFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('creates', () => {
    expect(component).toBeTruthy();
  });
});
