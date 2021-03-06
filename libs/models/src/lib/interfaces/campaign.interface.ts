import { Brand } from "../models/brand.model";
import { Media } from "../models/media.model";


export interface ICampaign {
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
  },
  media: Media[];
  decisionDeadline: string;
}

export enum CampaignStatus {
  DRAFT = 'DRAFT',
  TO_REVIEW = 'TO_REVIEW',
  VALIDATED = 'VALIDATED',
  REJECTED = 'REJECTED',
  TO_MODIFY = 'TO_MODIFY',
  SUBMITTED = 'SUBMITTED'
}

export enum CampaignStatusIcons {
  DRAFT = 'hourglass_empty',
  TO_REVIEW = 'hourglass_empty',
  VALIDATED = 'task_alt',
  REJECTED = 'cancel',
  TO_MODIFY = 'hourglass_empty',
  SUBMITTED = 'send'
}
