import { Campaign } from '../models/campaign.model';
import { CampaignStatus } from '../interfaces/campaign.interface';


const getDefaults = (): Campaign => ({
  campaignName: 'Fake Campaign',
  advice: false,
  brand: {
    brandId: 1,
    name: 'Fake Brand'
  },
  submittedDate: '2021-08-01T12:00:26.6666667+00:00',
  requestStatus: {
    requestStatusId: 1,
    name: CampaignStatus.DRAFT,
    value: 'draft',
    step: 1
  }
});

export const getCampaignMock = (campaign?: Partial<Campaign>): Campaign => ({
  ...getDefaults(),
  ...campaign
});
