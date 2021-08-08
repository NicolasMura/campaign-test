import { ICampaign } from '../interfaces/campaign.interface';


export class Campaign implements ICampaign {
  campaignName: string;

  constructor(campaign: Campaign) {
    this.campaignName = campaign.campaignName;
  }
}
