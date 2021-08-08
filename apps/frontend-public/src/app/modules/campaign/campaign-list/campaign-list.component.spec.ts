import { ComponentFixture, TestBed } from '@angular/core/testing';
import { getBrandMock } from '@campaign-test/models';
import { CampaignListComponent } from './campaign-list.component';

// Fake todos and response object
const brands = [
  getBrandMock({name: 'Fake Brand 1'}),
  getBrandMock({name: 'Fake Brand 2'}),
  getBrandMock({name: 'Fake Brand 3'})
];

describe('CampaignListComponent', () => {
  let component: CampaignListComponent;
  let fixture: ComponentFixture<CampaignListComponent>;

  const campaignServiceMock = {
    getAllBrands: jest.fn(() => brands)
   };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CampaignListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CampaignListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('gets all the brands', async () => {
    const brandsSpy = campaignServiceMock.getAllBrands();

    const actualBrands = await campaignServiceMock.getAllBrands();

  });
});
