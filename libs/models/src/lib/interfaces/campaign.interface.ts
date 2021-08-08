import { Brand } from "../models/brand.model";


export interface ICampaign {
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
}

export enum CampaignStatus {
  DRAFT = 'DRAFT',
  TO_REVIEW = 'TO_REVIEW',
  VALIDATED = 'VALIDATED',
  REJECTED = 'REJECTED',
  TO_MODIFY = 'TO_MODIFY',
  SUBMITTED = 'SUBMITTED'
}
