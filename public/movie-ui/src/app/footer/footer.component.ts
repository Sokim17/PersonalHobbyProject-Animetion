import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent {
  year = new Date();
  name:string = "Sokim NAM";
  copyright:string = "Maharishi International University. All Rights Reserved.";
}
