import { TestBed, async, ComponentFixture } from '@angular/core/testing';

// Modules

import { HttpClientTestingModule } from '@angular/common/http/testing';
import { GroceryCreateComponent } from '../grocery-create/grocery-create.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';

describe("component : GroceryCreateComponent", () =>{
  let component : GroceryCreateComponent;
  let fixture :ComponentFixture<GroceryCreateComponent>;

  beforeEach(()=>{
    TestBed.configureTestingModule({

      
      imports:[ReactiveFormsModule,FormsModule,HttpClientTestingModule,RouterTestingModule.withRoutes([])],
      declarations:[GroceryCreateComponent]
    });

    fixture = TestBed.createComponent(GroceryCreateComponent);

    component = fixture.componentInstance;
    fixture.detectChanges()
    component.ngOnInit();

  });


  it('form invalid when empty',()=>{
    expect(component.createGroceryForm.valid).toBeFalsy();
  

  })

 

  it('check create form fields by setting values',()=>{
    component.createGroceryForm.controls['name'].setValue("Soup");
    component.createGroceryForm.controls['brand'].setValue("Nestle");
    component.createGroceryForm.controls['cover'].setValue("abc.jpg");
    component.createGroceryForm.controls['category'].setValue("soup");
    component.createGroceryForm.controls['mfgyear'].setValue("2022");
    component.createGroceryForm.controls['productid'].setValue("12345");

    expect(component.createGroceryForm.controls.name.value).toBe("Soup")
    expect(component.createGroceryForm.controls.brand.value).toBe("Nestle")
    expect(component.createGroceryForm.controls.cover.value).toBe("abc.jpg")
    expect(component.createGroceryForm.controls.category.value).toBe("soup")
    expect(component.createGroceryForm.controls.mfgyear.value).toBe("2022")
    expect(component.createGroceryForm.controls.productid.value).toBe("12345")
  })
  
 
 
})