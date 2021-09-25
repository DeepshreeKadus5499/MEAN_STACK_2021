import { Component, Input } from '@angular/core';

@Component({
  selector: 'start',
  template: `
  <div  style="margin-top: 200px; margin-bottom: 100px;"
  >
  <h1 style="text-align:center">
  <img id="output" width="50  " height="50"   src="./assets/exam.png" />
  Welcome to Online Test Application!
  <img id="output" width="50  " height="50" src="./assets/online-test.png" />
  </h1>
  </div>
  `,
  styles: [`h1 { font-family: Lato; }`]
})
export class WelcomeComponent  {
  @Input() name: string;
}
