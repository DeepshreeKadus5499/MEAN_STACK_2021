import { Component, Input } from '@angular/core';

@Component({
  selector: 'hello',
  template: `<h1>Welcome!</h1>`,
  styles: [`h1 { font-family: Lato; }`]
})
export class WelcomeComponent  {
  @Input() name: string;
}
