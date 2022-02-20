import { User } from './user.model';
import { Grocery } from './grocery.model';

export class Comment {
  constructor(
    public _id: string,
    public user: User,
    public content: string,
    public grocery: Grocery,
    public creationDate?: Date
  ) { }
}
