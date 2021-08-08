import { Campaign } from '../models/campaign.model';


const getDefaults = (): Campaign => ({
  campaignName: 'Fake Campaign',
});

export const getCampaignMock = (campaign?: Partial<Campaign>): Campaign => ({
  ...getDefaults(),
  ...campaign
});
