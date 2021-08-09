import { IMedia } from '../interfaces/media.interface';


export class Media implements IMedia {
  mediaId: number;
  name: string;
  value: string;

  constructor(media: Media) {
    this.mediaId = media.mediaId;
    this.name = media.name;
    this.value = media.value;
  }
}
