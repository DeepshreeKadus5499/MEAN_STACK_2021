import { Component } from '@angular/core';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.css' ]
})
export class AppComponent  {
 buttonName = "Start the Quiz";
 begin = false;
 complete = false;
 questions: any;
 currentQuestion: any;
 currentIndex: number;
 score: any;
 noAnswer: any;

 constructor(){
   this.questions = [
     {
       id: 1,
       question: 'Question 1: Which is the largest country in the world by population?',
       option: [
         {optionid: 1, name: 'India'},
         {optionid: 2, name: 'USA'},
         {optionid: 3, name: 'China'},
         {optionid: 4, name: 'Russia'}
       ],
       answer: 3,
       selected: 0
     },
     {
       id: 2,
       question: 'Question 2: When did the second world war end?',
       option: [
         {optionid: 1, name: '1945'},
         {optionid: 2, name: '1939'},
         {optionid: 3, name: '1944'},
         {optionid: 4, name: '1942'}
       ],
       answer: 1,
       selected: 0
     },
     {
       id: 3,
       question: 'Question 3: Which was the first country to issue paper currency?',
       option: [
         {optionid: 1, name: 'USA'},
         {optionid: 2, name: 'France'},
         {optionid: 3, name: 'Italy'},
         {optionid: 4, name: 'China'}
       ],
       answer: 4,
       selected: 0
     },
     {
       id: 4,
       question: 'Question 5: Which city hosted the 1996 Summer Olympics?',
       option: [
         {optionid: 1, name: 'Atlanta'},
         {optionid: 2, name: 'Sydney'},
         {optionid: 3, name: 'Athens'},
         {optionid: 4, name: 'Beijing'}
       ],
       answer: 1,
       selected: 0
     },
     {
       id: 5,
       question: 'Question 5: Who invented telephone?',
       option: [
         {optionid: 1, name: 'Albert Einstein'},
         {optionid: 2, name: 'Alexander Graham Bell'},
         {optionid: 3, name: 'Isaac Newton'},
         {optionid: 4, name: 'Marie Curie'}
       ],
       answer: 2,
       selected: 0
     }
   ];

   this.currentIndex = 0;
   this.currentQuestion = this.questions[this.currentIndex];
  }
  
  next(){
    this.currentIndex++;
    this.currentQuestion = this.questions[this.currentIndex];
  }

  submit(){
    this.buttonName = "Play Again?";
    if (this.currentIndex + 1 == this.questions.length){
      this.complete = true;
      this.begin = false;
      this.score = 0;
      this.noAnswer = 0;
      this.questions.map(x => {
        if (x.selected != 0){
          if (x.selected == x.answer) {
            this.score++;
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
    this.currentIndex = 0;
    this.currentQuestion = this.questions[this.currentIndex];
    this.begin = true;
  }

}
