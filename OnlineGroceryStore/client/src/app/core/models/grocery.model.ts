import { Comment } from './comment.model';

export class Grocery {
  constructor(
    public _id: string,
    public name: string,
    public brand: string,
    public category: string,
    public mfgyear: number,
    public description: string,
    public cover: string,
    public productid: string,
    public quantity: number,
    public price: number,
    public qty?: number,
    public creationDate?: Date,
    public currentRating?: number,
    public ratingPoints?: number,
    public ratedCount?: number,
    public purchasesCount?: number,
    public comments?: Comment[]
  ) { }
}
