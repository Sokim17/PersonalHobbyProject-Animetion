import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, NgForm } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  username!: string;
  password!: string;

  @ViewChild("loginForm")
  loginForm!: NgForm;

  public login() {
    console.log(this.loginForm.value);

  }



  // Reactive Form Module

  // loginForm!:FormGroup;
  // constructor(private _formBuilder:FormBuilder){
  // }
  // ngOnInit(){
  //   this.loginForm = this._formBuilder.group({
  //     username:"Sokimnam",
  //     password:"12345"
  //   });
  // }
  // login(){
  //   console.log(this.loginForm.value);

  // }
}
