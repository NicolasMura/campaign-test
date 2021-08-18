import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HarnessLoader, parallel } from '@angular/cdk/testing';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { MatTableHarness } from '@angular/material/table/testing';
import { MatSelectHarness } from '@angular/material/select/testing';
import { MatInputHarness } from '@angular/material/input/testing';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { CampaignService, FrontendToolsModule } from '@campaign-test/frontend-tools';
import { Brand, Campaign, getBrandMock, getCampaignMock } from '@campaign-test/models';
import { MaterialModule } from '@campaign-test/vendors';
import { of } from 'rxjs';
import { CampaignListComponent } from './campaign-list.component';

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

describe('CampaignListComponent', () => {
  let component: CampaignListComponent;
  let fixture: ComponentFixture<CampaignListComponent>;
  let loader: HarnessLoader;

  const campaignServiceMock = {
    getAllCampaigns: jest.fn().mockReturnValue(of(mockedCampaigns)),
    availableBrands: mockedBrands,
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CampaignListComponent ],
      imports: [
        BrowserAnimationsModule,
        RouterTestingModule,
        FormsModule,
        MaterialModule,
        FrontendToolsModule
      ],
      providers: [
        { provide: CampaignService, useValue: campaignServiceMock }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CampaignListComponent);
    component = fixture.componentInstance;
    loader = TestbedHarnessEnvironment.loader(fixture);
    fixture.detectChanges();
  });

  it('creates', () => {
    expect(component).toBeTruthy();
  });

  it('gets all the campaigns', () => {
    expect(campaignServiceMock.getAllCampaigns).toHaveBeenCalled();
    expect(component.dataSource.data).toBe(mockedCampaigns);
  });

  it('displays the different kinds of rows in the campaigns table', async () => {
    const table = await loader.getHarness(MatTableHarness);
    const headerRows = await table.getHeaderRows();
    const rows = await table.getRows();
    expect(headerRows.length).toBe(1);
    expect(rows.length).toBe(mockedCampaigns.length);
  });

  it('displays name of first campaign', async () => {
    const table = await loader.getHarness(MatTableHarness);
    const firstRow = (await table.getRows())[0];
    const cells = await firstRow.getCells({columnName: 'campaignName'});
    const cellTexts = await parallel(() => cells.map(cell => cell.getText()));
    expect(cellTexts).toEqual([mockedCampaigns[0].campaignName]);
  });

  it('filters campaigns with free text input and single brand select input', async () => {
    const inputField = await loader.getHarness(MatInputHarness)
    const select = await loader.getHarness(MatSelectHarness);
    const table = await loader.getHarness(MatTableHarness);

    expect(await select.isMultiple()).toBe(false);
    expect(await select.isOpen()).toBe(false);

    await inputField.setValue('Fake Campaign 1');
    expect(fixture.componentInstance.campaignService.searchInput).toEqual('Fake Campaign 1');

    let rows = await table.getRows();
    expect(rows.length).toBe(2);

    await select.open();
    const options = await select.getOptions();

    expect(options.length).toBe(mockedBrands.length + 1);

    await options[1].click();
    expect(fixture.componentInstance.campaignService.selectedBrand?.brandId).toEqual(mockedBrands[0].brandId);
    expect(await select.getValueText()).toBe(mockedBrands[0].name);

    rows = await table.getRows();
    expect(rows.length).toBe(1);
  });
});
