import { User } from './user.model';
import { Grocery } from './grocery.model';

export class Receipt {
  constructor(
    public user: User,
    public productsInfo: Grocery[],
    public totalPrice: number
  ) { }
}
