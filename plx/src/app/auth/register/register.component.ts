import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/core/user.service';
import { passwordsMatch } from '../utils';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  errorMessage: string = '';

  passwordControl = new FormControl(null, [Validators.required, Validators.minLength(8)]);

  get passwordsGroup(): FormGroup {
    return this.registerFormGroup.controls['passwords'] as FormGroup;
  }

  registerFormGroup: FormGroup = this.formBuilder.group({
    'username': new FormControl('', [Validators.required, Validators.minLength(5)]),
    'email': new FormControl('', [Validators.required, Validators.email]),
    'passwords': new FormGroup({
      'password': this.passwordControl,
      'password2': new FormControl('', [passwordsMatch(this.passwordControl)])
    }),
    'phone_number': new FormControl('', [Validators.required, Validators.minLength(8), Validators.maxLength(10)]),
  })

  constructor(private formBuilder: FormBuilder, private userService: UserService, private router: Router) { }

  ngOnInit(): void {
  }

  handleRegister(): void {
    const { username, email, passwords, phone_number } = this.registerFormGroup.value;

    const body: {username: string, email: string, password: string, phone_number: string} = {
      username: username,
      email: email,
      password: passwords.password,
      phone_number: phone_number
    }

    this.userService.register(body).subscribe({
      next: user => {
        console.log(body);
        let userData = {
          email: body.email,
          username: body.username,
          sessionToken: user.sessionToken,
          objectId: user.objectId
        }
        this.userService.setUserData(userData)
        this.router.navigate(['/profile']);
      },
      complete: () => {

      },
      error: (err) => {
        this.errorMessage = err.error.error;
      }
    })
  }
}
