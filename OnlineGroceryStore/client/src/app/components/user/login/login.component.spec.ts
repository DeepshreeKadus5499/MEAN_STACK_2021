import { TestBed, async, ComponentFixture } from '@angular/core/testing';

// Modules

import { HttpClientTestingModule } from '@angular/common/http/testing';
import { LoginComponent } from './login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';

describe("component : login", () =>{
  let component : LoginComponent;
  let fixture :ComponentFixture<LoginComponent>;

  beforeEach(()=>{
    TestBed.configureTestingModule({

      
      imports:[ReactiveFormsModule,FormsModule,HttpClientTestingModule,RouterTestingModule.withRoutes([])],
      declarations:[LoginComponent]
    });

    fixture = TestBed.createComponent(LoginComponent);

    component = fixture.componentInstance;
    fixture.detectChanges()
    component.ngOnInit();

  });


  it('form invalid when empty',()=>{
    expect(component.loginForm.valid).toBeFalsy();
  

  })

  it('username field validity',()=>{
    let username=component.loginForm.controls['username'];
    expect(username.valid).toBeFalsy();
    let errors = {};
    errors=username.errors
    expect(errors['required']).toBeTruthy();
    username.setValue("Test")
    errors=username.errors || {};
    expect(errors['pattern']).toBeUndefined();

  })

  it('password field validity',()=>{
    let password=component.loginForm.controls['password'];
    expect(password.valid).toBeFalsy();
  })

  it('check login fields by setting values',()=>{
    // expect(component.loginForm.valid).toBeFalsy();
    component.loginForm.controls['username'].setValue("Test");
    component.loginForm.controls['password'].setValue("Test@123");


    expect(component.loginForm.valid).toBeTruthy();

    expect(component.loginForm.controls.username.value).toBe("Test")
    expect(component.loginForm.controls.password.value).toBe("Test@123")
  })

 
})