// Decorators and Lifehooks
import { Component, OnInit } from '@angular/core';

// Forms
import { FormControl, FormGroup, Validators } from '@angular/forms';

// Router
import { Router, ActivatedRoute } from '@angular/router';

// Services
import { GroceryService } from '../../../core/services/grocery.service';

@Component({
  selector: 'app-grocery-delete',
  templateUrl: './grocery-delete.component.html',
  styleUrls: ['./grocery-delete.component.css']
})
export class GroceryDeleteComponent implements OnInit {
  deleteGroceryForm: FormGroup;
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
        this.deleteGroceryForm.patchValue({ ...res.data });
      });
  }

  initForm(): void {
    this.deleteGroceryForm = new FormGroup({
      'name': new FormControl('', [
        Validators.required
      ]),
      'brand': new FormControl('', [
        Validators.required
      ]),
      'category': new FormControl('', [
        Validators.required
      ]),
      'description': new FormControl('', [
        Validators.required,
        Validators.minLength(10)
      ]),
      'price': new FormControl('', [
        Validators.required,
        Validators.min(0)
      ])
    });
  }

  onSubmit(): void {
   this.groceryService
      .deleteGrocery(this.id)
      .subscribe(() => {
        this.router.navigate(['/home']);
      });
  }

}
