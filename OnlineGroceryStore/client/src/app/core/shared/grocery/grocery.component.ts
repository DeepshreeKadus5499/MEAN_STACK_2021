// Decorators
import { Component, Input } from '@angular/core';

// Models
import { Grocery } from '../../models/grocery.model';

@Component({
  selector: 'app-grocery',
  templateUrl: './grocery.component.html',
  styleUrls: ['./grocery.component.css']
})
export class GroceryComponent {
  @Input('grocery') grocery: Grocery;

}
// console.log(Grocery)