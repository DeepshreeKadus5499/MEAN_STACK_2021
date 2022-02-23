import { TestBed, async, ComponentFixture } from '@angular/core/testing';

// Modules

import { HttpClientTestingModule } from '@angular/common/http/testing';
import { GroceryEditComponent } from '../grocery-edit/grocery-edit.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';

describe("component : GroceryEditComponent", () =>{
  let component : GroceryEditComponent;
  let fixture :ComponentFixture<GroceryEditComponent>;

  beforeEach(()=>{
    TestBed.configureTestingModule({

      
      imports:[ReactiveFormsModule,FormsModule,HttpClientTestingModule,RouterTestingModule.withRoutes([])],
      declarations:[GroceryEditComponent]
    });

    fixture = TestBed.createComponent(GroceryEditComponent);

    component = fixture.componentInstance;
    fixture.detectChanges()
    component.ngOnInit();

  });


  it('form invalid when empty',()=>{
    expect(component.editGroceryForm.valid).toBeFalsy();
  

  })

  it('check edit form fields by setting values',()=>{
    component.editGroceryForm.controls['name'].setValue("Soup");
    component.editGroceryForm.controls['brand'].setValue("Nestle");
    component.editGroceryForm.controls['cover'].setValue("abc.jpg");
    component.editGroceryForm.controls['category'].setValue("soup");
    component.editGroceryForm.controls['mfgyear'].setValue("2022");
    component.editGroceryForm.controls['productid'].setValue("12345");

    expect(component.editGroceryForm.controls.name.value).toBe("Soup")
    expect(component.editGroceryForm.controls.brand.value).toBe("Nestle")
    expect(component.editGroceryForm.controls.cover.value).toBe("abc.jpg")
    expect(component.editGroceryForm.controls.category.value).toBe("soup")
    expect(component.editGroceryForm.controls.mfgyear.value).toBe("2022")
    expect(component.editGroceryForm.controls.productid.value).toBe("12345")
  })
  

 
})