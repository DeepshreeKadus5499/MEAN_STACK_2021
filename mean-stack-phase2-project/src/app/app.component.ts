import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpErrorResponse } from '@angular/common/http';
import { Question } from './question';
import { QuestionServiceService } from './question-service.service';
@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.css' ]
})
export class AppComponent  {
 buttonName = "Start the Test";
 start_test = false;
 complete = false;
 currentQue: any;
 currentIn: number;
 marks: any;
 noAnswer: any;

 arrQue:Array<Question>=[];
 constructor(public queSer:QuestionServiceService){
 this.currentIn = 0;
 this.currentQue = this.arrQue[this.currentIn];
  }
  
  next(){
    this.currentIn++;
    this.currentQue = this.arrQue[this.currentIn];
  }

  submit(){
    this.buttonName = "Start Test Again?";
    if (this.currentIn + 1 == this.arrQue.length){
      this.complete = true;
      this.start_test = false;
      this.marks = 0;
      this.noAnswer = 0;
      this.arrQue.map(x => {
        if (x.selected != 0){
          if (x.selected == x.answer) {
            this.marks++;
          }
        }
        else {
          this.noAnswer++;
        }

        x.selected = 0;
      });
    } 
  }

  start(){
    this.complete = false;
    this.currentIn = 0;
    this.currentQue = this.arrQue[this.currentIn];
    this.start_test = true;
  }

  ngOnInit(): void {
    this.queSer.loadJsonData()
    .subscribe(data=>this.arrQue=data,error=>console.log(error));
    console.log(this.arrQue)
  }

}
