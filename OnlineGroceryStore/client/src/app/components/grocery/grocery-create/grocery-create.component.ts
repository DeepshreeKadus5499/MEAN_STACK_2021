// Decorators and Lifehooks
import { Component, OnInit } from '@angular/core';

// Forms
import { FormControl, FormGroup, Validators, AbstractControl } from '@angular/forms';

// Router
import { Router } from '@angular/router';

// Services
import { GroceryService } from '../../../core/services/grocery.service';

// Custom Validators
import { isUrlValidator } from '../../../core/directives/is-url.directive';
import { isIsbnValidator } from '../../../core/directives/is-productid.directive';

@Component({
  selector: 'app-grocery-create',
  templateUrl: './grocery-create.component.html',
  styleUrls: ['./grocery-create.component.css']
})
export class GroceryCreateComponent implements OnInit {
  createGroceryForm: FormGroup;

  constructor(
    private router: Router,
    private groceryService: GroceryService
  ) { }

  ngOnInit(): void {
    this.createGroceryForm = new FormGroup({
      'name': new FormControl('', [
        Validators.required
      ]),
      'brand': new FormControl('', [
        Validators.required
      ]),
      'category': new FormControl('', [
        Validators.required
      ]),
      'mfgyear': new FormControl('', [
        Validators.required
      ]),
      'description': new FormControl('', [
        Validators.required,
        Validators.minLength(10)
      ]),
      'cover': new FormControl('', [
        Validators.required,
        // isUrlValidator
      ]),
      'productid': new FormControl('', [
        Validators.required,
        // isIsbnValidator
      ]),
      'quantity': new FormControl('', [
        Validators.required,
        Validators.min(0)
      ]),
      'price': new FormControl('', [
        Validators.required,
        Validators.min(0)
      ])
    });
  }

  onSubmit(): void {
    this.groceryService
      .createGrocery(this.createGroceryForm.value)
      .subscribe((res) => {
        this.router.navigate([`/grocery/details/${res.data._id}`]);
      });
  }

  get name(): AbstractControl {
    return this.createGroceryForm.get('name');
  }

  get brand(): AbstractControl {
    return this.createGroceryForm.get('brand');
  }

  get category(): AbstractControl {
    return this.createGroceryForm.get('category');
  }

  get mfgyear(): AbstractControl {
    return this.createGroceryForm.get('mfgyear');
  }

  get description(): AbstractControl {
    return this.createGroceryForm.get('description');
  }

  get cover(): AbstractControl {
    return this.createGroceryForm.get('cover');
  }

  get productid(): AbstractControl {
    return this.createGroceryForm.get('productid');
  }

  get quantity(): AbstractControl {
    return this.createGroceryForm.get('quantity');
  }

  get price(): AbstractControl {
    return this.createGroceryForm.get('price');
  }

}
