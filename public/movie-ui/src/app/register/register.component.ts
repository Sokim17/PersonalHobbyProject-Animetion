import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})

// export class User {
//   #name!: string;
//   #username!: string;
//   #password!: string;

//   get name(): string {
//     return this.#name;
//   }
//   get username(): string {
//     return this.#username;
//   }
//   get password(): string {
//     return this.#password;
//   }
  // constructor(name: string, username: string, password: string) {
  //   this.#name = name;
  //   this.#username = username;
  //   this.#password = password;
  // }
// }

export class RegisterComponent{
  // user!: User;
  registrationForm!: FormGroup;

  constructor(private _formBuilder: FormBuilder) {
    // this.user = new User("", "", "");
  }

  ngOnInit() {
    this.registrationForm = this._formBuilder.group({
      name: "",
      username: "",
      password: ""
    });
  }

  register() {
    // const _user: any = {
    //   name: this.registrationForm.value.name,
    //   username: this.registrationForm.value.username,
    //   password: this.registrationForm.value.password
    // };

    // console.log(this.registrationForm.value); //for FormGroup
    console.log(this.registrationForm.value);

  }
}
