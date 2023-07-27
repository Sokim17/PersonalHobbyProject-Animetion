import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

import { environment } from 'src/environments/environment';

import { UserDataService } from '../user-data.service';


export class User {
  #name!: string;
  #username!: string;
  #password!: string;

  get name(): string {
    return this.#name;
  }
  get username(): string {
    return this.#username;
  }
  get password(): string {
    return this.#password;
  }
  constructor(name: string, username: string, password: string) {
    this.#name = name;
    this.#username = username;
    this.#password = password;
  }
  toJSON(): any {
    const user_json = environment.NAME_TOJSON_REGISTER + this.name + environment.USERNAME_TOJSON_REGISTER + this.username + environment.PASSWORD_TOJSON_REGISTER + this.password + environment.CLOSE_TOJSON_REGISTER
    return JSON.parse(user_json);
  }
}

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})

export class RegisterComponent {

  user: User = new User("", "", "");
  successMessage: string = "";
  errorMessage: string = "";
  isSuccess: boolean = false;
  isError: boolean = false;
  registrationForm!: FormGroup;

  constructor(private _formBuilder: FormBuilder, private _userService: UserDataService) {
  }

  ngOnInit() {
    this.registrationForm = this._formBuilder.group({
      name: "",
      username: "",
      password: ""
    });
  }

  register() {
    const _user: User = new User(this.registrationForm.value.name, this.registrationForm.value.username, this.registrationForm.value.password);
    this._userService.registerUser(_user).subscribe({
      next: () => this.OnRegisterSuccess(),
      error: (error) => this.OnRegisterError(error),
      complete: () => { 
        this.registrationForm = this._formBuilder.group({
          name: "",
          username: "",
          password: ""
        });
      }
    });
  }

  OnRegisterSuccess(): void {
    this.successMessage = environment.ON_REGISTER_SUCCESS;
    this.isSuccess = true;
    this.isError = false;
    this.errorMessage = "";
  }

  OnRegisterError(error: any): void {
    this.successMessage = "";
    this.errorMessage = environment.ON_REGISTER_FAILED;
    this.isError = true;
    this.isSuccess = false;
  }
}
