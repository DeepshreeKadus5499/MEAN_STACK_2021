// Decorators and Lifehooks
import { Component, OnInit } from '@angular/core';

// Forms
import { FormControl, FormGroup, Validators, AbstractControl } from '@angular/forms';

// Router
import { Router, ActivatedRoute } from '@angular/router';

// Services
import { GroceryService } from '../../../core/services/grocery.service';

// Custom Validators
import { isUrlValidator } from '../../../core/directives/is-url.directive';
import { isIsbnValidator } from '../../../core/directives/is-productid.directive';

@Component({
  selector: 'app-grocery-edit',
  templateUrl: './grocery-edit.component.html',
  styleUrls: ['./grocery-edit.component.css']
})
export class GroceryEditComponent implements OnInit {
  editGroceryForm: FormGroup;
  id: string;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private groceryService: GroceryService
  ) { }

  ngOnInit(): void {
    this.initForm();
    this.id = this.route.snapshot.paramMap.get('groceryId');

    this.groceryService
      .getSingleGrocery(this.id)
      .subscribe((res) => {
        this.editGroceryForm.patchValue({ ...res.data });
      });
  }

  initForm(): void {
    this.editGroceryForm = new FormGroup({
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
        isUrlValidator
      ]),
      'productid': new FormControl('', [
        Validators.required,
        isIsbnValidator
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
      .editGrocery(this.id, this.editGroceryForm.value)
      .subscribe((res) => {
        this.router.navigate([`/grocery/details/${res.data._id}`]);
      });
  }

  get name(): AbstractControl {
    return this.editGroceryForm.get('name');
  }

  get brand(): AbstractControl {
    return this.editGroceryForm.get('brand');
  }

  get category(): AbstractControl {
    return this.editGroceryForm.get('category');
  }

  get mfgyear(): AbstractControl {
    return this.editGroceryForm.get('mfgyear');
  }

  get description(): AbstractControl {
    return this.editGroceryForm.get('description');
  }

  get cover(): AbstractControl {
    return this.editGroceryForm.get('cover');
  }

  get productid(): AbstractControl {
    return this.editGroceryForm.get('productid');
  }

  get quantity(): AbstractControl {
    return this.editGroceryForm.get('quantity');
  }

  get price(): AbstractControl {
    return this.editGroceryForm.get('price');
  }

}
