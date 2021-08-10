import { ICampaign, CampaignStatus } from '../interfaces/campaign.interface';
import { Brand } from './brand.model';
import { Media } from './media.model';


export class Campaign implements ICampaign {
  requestId: number;
  campaignName: string;
  advice: boolean;
  brand: Brand;
  submittedDate: string;
  requestStatus: {
    requestStatusId: number;
    name: CampaignStatus,
    value: string,
    step: number
  };
  media: Media[];
  decisionDeadline: string;

  constructor(campaign: Campaign) {
    this.requestId = campaign.requestId;
    this.campaignName = campaign.campaignName || 'Not defined';
    this.advice = typeof campaign.advice == 'boolean' ? campaign.advice : false;
    this.brand = campaign.brand || { brandId: 0, name: 'Not defined' };
    this.submittedDate = campaign.submittedDate || '';
    this.requestStatus = campaign.requestStatus;
    this.media = campaign.media.map((media: Media) => new Media(media));
    this.decisionDeadline = campaign.decisionDeadline || '2000-01-01T00:00:00.00+00:00';
  }
}
