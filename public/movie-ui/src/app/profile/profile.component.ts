import { Component } from '@angular/core';
import { environment } from 'src/environments/environment';
import { AuthenticationService } from '../authentication.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})

export class ProfileComponent {
  title:string = environment.PAGE_TITLE
  constructor(private _authentication:AuthenticationService){}
  
  get name(): string {
    return this._authentication.name;

  }
}
