import { Brand } from '../models/brand.model';


const getDefaults = (): Brand => ({
  name: 'Fake Brand',
});

export const getBrandMock = (brand?: Partial<Brand>): Brand => ({
  ...getDefaults(),
  ...brand
});
