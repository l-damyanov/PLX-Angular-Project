import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/core/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  errorMessage: string = '';

  loginFormGroup: FormGroup = this.formBuilder.group({
    'email': new FormControl('', [Validators.required, Validators.email]),
    'password': new FormControl('', [Validators.required, Validators.minLength(8)])
  })

  constructor(private formBuilder: FormBuilder, private userService: UserService, private router: Router) { }

  ngOnInit(): void {
  }

  // loginHandler(): void {
  //   console.log('Form is submitted!')
  // }

  handleLogin(): void {
    this.errorMessage = '';
    this.userService.login(this.loginFormGroup.value).subscribe({
      next: user => {
        let userData = {
          email: user.email,
          username: user.username,
          sessionToken: user.sessionToken,
          objectId: user.objectId
        }
        this.userService.setUserData(userData)
        this.router.navigate(['/profile']);
        // localStorage.setItem('token', document.cookie)
        // localStorage.setItem('email', user.email)
        // localStorage.setItem('id', user.id)
      },
      complete: () => {

      },
      error: (err) => {
        this.errorMessage = err.error.error;
      }
    })
  }

}
