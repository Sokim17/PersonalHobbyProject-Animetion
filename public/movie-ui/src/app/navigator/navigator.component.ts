import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navigator',
  templateUrl: './navigator.component.html',
  styleUrls: ['./navigator.component.css']
})
export class NavigatorComponent {

  constructor(private _router:Router){}

  goHome(){
    this._router.navigate([""])
  }
  goToMovies(){
    this._router.navigate(["movies"])
  }
  goToRegister(){
    this._router.navigate(["register"])
  }
}
