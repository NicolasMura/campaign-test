import { IBrand } from '../interfaces/brand.interface';


export class Brand implements IBrand {
  brandId: number;
  name: string;

  constructor(brand: Brand) {
    this.brandId = brand.brandId;
    this.name = brand.name;
  }
}
