// Decorators and Lifehooks
import { Component, OnInit } from '@angular/core';

// Router
import { Router, ActivatedRoute } from '@angular/router';

// Services
import { GroceryService } from '../../../core/services/grocery.service';
import { CartService } from '../../../core/services/cart.service';
import { HelperService } from '../../../core/services/helper.service';

// Models
import { Grocery } from '../../../core/models/grocery.model';

@Component({
  selector: 'app-grocery-details',
  templateUrl: './grocery-details.component.html',
  styleUrls: ['./grocery-details.component.css']
})
export class GroceryDetailsComponent implements OnInit {
  grocery: Grocery;
  groceryId: string;
  userId: string;
  isLogged: boolean;
  isAdmin: boolean;
  isRated: boolean;
  isAdded: boolean;
  isBought: boolean;
  stars = ['', '', '', '', ''];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private groceryService: GroceryService,
    private cartService: CartService,
    private helperService: HelperService
  ) { }

  ngOnInit(): void {
    this.groceryId = this.route.snapshot.paramMap.get('groceryId');
    this.isLogged = this.helperService.isLoggedIn();
    this.isAdmin = this.helperService.isAdmin();
    this.userId = this.helperService.getProfile().id;

    this.groceryService
      .getSingleGrocery(this.groceryId)
      .subscribe((res) => {
        this.grocery = res.data;
        this.calcRating(this.grocery.currentRating);
      });
  }

  buyGrocery(): void {
    this.cartService
      .addToCart(this.groceryId)
      .subscribe(() => {
        this.helperService.cartStatus.next('add');
        this.isBought = true;
      }, () => {
        this.isBought = true;
      });
  }

  addToFavorites(): void {
    this.groceryService
      .addToFavourites(this.groceryId)
      .subscribe(() => {
        this.isAdded = true;
      }, () => {
        this.isAdded = true;
      });
  }

  rateGrocery(rating: number): void {
    if (!this.isRated) {
      this.isRated = true;
      this.groceryService
        .rateGrocery(this.groceryId, { rating: rating })
        .subscribe((res) => {
          this.grocery.currentRating = res.data.currentRating;
          this.grocery.ratedCount++;
          this.calcRating(this.grocery.currentRating);
        });
    }
  }

  calcRating(rating: number): void {
    this.stars = ['', '', '', '', ''];
    rating = Math.round(rating);
    for (let i = 0; i < rating; i++) {
      this.stars[i] = 'checked';
    }
  }

  resetRating(): void {
    this.calcRating(this.grocery.currentRating);
  }

  login(): void {
    this.router.navigate(['/user/login']);
  }

}
