// Decorators and Lifehooks
import { Component, OnInit } from '@angular/core';

// Services
import { GroceryService } from '../../../core/services/grocery.service';

// Models
import { Grocery } from '../../../core/models/grocery.model';

const newestGroceriesQuery = '?sort={"creationDate":-1}&limit=5';
const bestRatedGroceriesQuery = '?sort={"currentRating":-1}&limit=5';
const mostPurchasedGroceriesQuery = '?sort={"purchasesCount":-1}&limit=5';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  newestGroceries: Grocery[];
  bestRatedGroceries: Grocery[];
  mostPurchasedGroceries: Grocery[];

  constructor(private groceryService: GroceryService) { }

  ngOnInit(): void {
    this.groceryService
      .search(newestGroceriesQuery)
      .subscribe((res) => {
        this.newestGroceries = res.data;
      });

    this.groceryService
      .search(bestRatedGroceriesQuery)
      .subscribe((res) => {
        this.bestRatedGroceries = res.data;
      });

    this.groceryService
      .search(mostPurchasedGroceriesQuery)
      .subscribe((res) => {
        this.mostPurchasedGroceries = res.data;
      });
  }

}
