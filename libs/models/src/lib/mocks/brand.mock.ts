import { Brand } from '../models/brand.model';


const getDefaults = (): Brand => ({
  brandId: 1,
  name: 'Fake Brand'
});

export const getBrandMock = (brand?: Partial<Brand>): Brand => ({
  ...getDefaults(),
  ...brand
});
