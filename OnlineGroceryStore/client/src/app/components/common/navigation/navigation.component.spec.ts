import { TestBed, async, ComponentFixture } from '@angular/core/testing';

// Modules

import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NavigationComponent } from '../navigation/navigation.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';

describe("component : NavigationComponent", () =>{
  let component : NavigationComponent;
  let fixture :ComponentFixture<NavigationComponent>;

  beforeEach(()=>{
    TestBed.configureTestingModule({

      
      imports:[ReactiveFormsModule,FormsModule,HttpClientTestingModule,RouterTestingModule.withRoutes([])],
      declarations:[NavigationComponent]
    });

    fixture = TestBed.createComponent(NavigationComponent);

    component = fixture.componentInstance;
    fixture.detectChanges()
    component.ngOnInit();

  });


  it('Navgation check',()=>{
    let status=window.setInterval(() => component.tick(), 600000);
    component.username="Test"
    let username1=component.getUsername()
    expect(status).toBe(11)
    expect(username1).toBeUndefined
    console.log("user",username1,status)
    // expect(component.statusChecker.toFixed).toBeFalsy();
  

  })

  
})