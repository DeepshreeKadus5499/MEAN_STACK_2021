import { TestBed, async, ComponentFixture } from '@angular/core/testing';

// Modules

import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RegisterComponent } from './register.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';

describe("component : register", () =>{
  let component : RegisterComponent;
  let fixture :ComponentFixture<RegisterComponent>;

  beforeEach(()=>{
    TestBed.configureTestingModule({

      
      imports:[ReactiveFormsModule,FormsModule,HttpClientTestingModule,RouterTestingModule.withRoutes([])],
      declarations:[RegisterComponent]
    });

    fixture = TestBed.createComponent(RegisterComponent);

    component = fixture.componentInstance;
    fixture.detectChanges()
    component.ngOnInit();

  });


  it('form invalid when empty',()=>{
    expect(component.registerForm.valid).toBeFalsy();
  

  })

  it('username field validity',()=>{
    let username=component.registerForm.controls['username'];
    expect(username.valid).toBeFalsy();
    let errors = {};
    errors=username.errors
    expect(errors['required']).toBeTruthy();
    username.setValue("Test")
    errors=username.errors || {};
    expect(errors['pattern']).toBeUndefined();

  })

  it('password field validity',()=>{
    let password=component.registerForm.controls['password'];
    expect(password.valid).toBeFalsy();
  })

  it('check register fields by setting values',()=>{
    component.registerForm.controls['username'].setValue("Test");
    component.registerForm.controls['password'].setValue("Test@123");
    expect(component.registerForm.controls.username.value).toBe("Test")
    expect(component.registerForm.controls.password.value).toBe("Test@123")
  })
  
  it('email should be correct',()=>{

    fixture.whenStable().then(()=>{
      let email = component.registerForm.controls['email'];
      expect(email).toBeTruthy()
      component.registerForm.controls['email'].setValue("Test@gmail.com");
      expect(component.registerForm.controls.email.value).toBe("Test@gmail.com")
      
    })
  })
 
})