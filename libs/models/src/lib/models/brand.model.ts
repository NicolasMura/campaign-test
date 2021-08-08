import { IBrand } from '../interfaces/brand.interface';


export class Brand implements IBrand {
  name: string;

  constructor(brand: Brand) {
    this.name = brand.name;
  }
}
