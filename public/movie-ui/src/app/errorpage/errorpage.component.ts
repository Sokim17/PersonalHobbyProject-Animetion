import { Component } from '@angular/core';

@Component({
  selector: 'app-errorpage',
  templateUrl: './errorpage.component.html',
  styleUrls: ['./errorpage.component.css']
})
export class ErrorpageComponent {
  errorMessage:string = "Oops, it seems the page you are trying to reach is not available!";
  clickToHomePage:string = "Click to go back to Animetion.";
}
