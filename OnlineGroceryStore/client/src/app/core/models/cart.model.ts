import { User } from './user.model';
// import { Grocery } from './grocery.model';

import { Grocery } from '../models/grocery.model';

export class Cart {
  constructor(
    public user: User,
    public groceries: Grocery[],
    public totalPrice: number
  ) { }
}
