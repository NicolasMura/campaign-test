import { ICampaign, CampaignStatus } from '../interfaces/campaign.interface';
import { Brand } from './brand.model';


export class Campaign implements ICampaign {
  campaignName: string;
  advice: boolean;
  brand: Brand;
  submittedDate: string;
  requestStatus: {
    requestStatusId: number;
    name: CampaignStatus,
    value: string,
    step: number
  }

  constructor(campaign: Campaign) {
    this.campaignName = campaign.campaignName || 'Not defined';
    this.advice = typeof campaign.advice == 'boolean' ? campaign.advice : false;
    this.brand = campaign.brand || { brandId: 0, name: 'Not defined' };
    this.submittedDate = campaign.submittedDate || 'Not defined';
    this.requestStatus = campaign.requestStatus;
  }
}
