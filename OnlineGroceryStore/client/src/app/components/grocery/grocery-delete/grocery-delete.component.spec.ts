import { TestBed, async, ComponentFixture } from '@angular/core/testing';

// Modules

import { HttpClientTestingModule } from '@angular/common/http/testing';
import { GroceryDeleteComponent } from '../grocery-delete/grocery-delete.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';

describe("component : GroceryDeleteComponent", () =>{
  let component : GroceryDeleteComponent;
  let fixture :ComponentFixture<GroceryDeleteComponent>;

  beforeEach(()=>{
    TestBed.configureTestingModule({

      
      imports:[ReactiveFormsModule,FormsModule,HttpClientTestingModule,RouterTestingModule.withRoutes([])],
      declarations:[GroceryDeleteComponent]
    });

    fixture = TestBed.createComponent(GroceryDeleteComponent);

    component = fixture.componentInstance;
    fixture.detectChanges()
    component.ngOnInit();

  });


  it('form invalid when empty',()=>{
    expect(component.deleteGroceryForm.valid).toBeFalsy();
  

  })
  it('check delete form fields by setting values',()=>{
    component.deleteGroceryForm.controls['name'].setValue("Soup");
    component.deleteGroceryForm.controls['brand'].setValue("Nestle");
    component.deleteGroceryForm.controls['price'].setValue("1234");
    component.deleteGroceryForm.controls['category'].setValue("soup");
    component.deleteGroceryForm.controls['description'].setValue("Testing");

    expect(component.deleteGroceryForm.controls.name.value).toBe("Soup")
    expect(component.deleteGroceryForm.controls.brand.value).toBe("Nestle")
    expect(component.deleteGroceryForm.controls.price.value).toBe("1234")
    expect(component.deleteGroceryForm.controls.category.value).toBe("soup")
    expect(component.deleteGroceryForm.controls.description.value).toBe("Testing")
 
  })
  
 
})