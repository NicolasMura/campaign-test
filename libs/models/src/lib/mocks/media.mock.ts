import { Media } from '../models/media.model';


const getDefaults = (): Media => ({
  mediaId: 1,
  name: 'Fake Media',
  value: 'Fake value'
});

export const getMediaMock = (media?: Partial<Media>): Media => ({
  ...getDefaults(),
  ...media
});
