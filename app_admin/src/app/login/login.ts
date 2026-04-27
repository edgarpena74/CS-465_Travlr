/* 
---------------------------
			ANGULAR IMPORTS
---------------------------
*/
/* 
Component: Decorator that defines this class as an Angular component
OnInit: Lifecycle hook used to run code when the component initializes
*/
import { Component, OnInit } from '@angular/core';

// CommonModule: Provides common Angular directives like ngIf and ngFor
import { CommonModule } from '@angular/common';

// FormsModule: Enables template-driven forms functionality
import { FormsModule } from '@angular/forms';

// Router: Enables navigation between application routes
import { Router } from '@angular/router';

/* 
----------------------------
			MODULE IMPORTS
----------------------------
*/
// AuthenticationService: Handles user authentication and login state
import { AuthenticationService } from '../services/authentication';

// User: Model representing user data
import { User } from '../models/user';

/* 
--------------------------------------
			COMPONENT CONFIGURATION
--------------------------------------
*/
@Component({
  selector: 'app-login',
  imports: [CommonModule, FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})

/* 
---------------------------
			COMPONENT CLASS
---------------------------
*/
export class Login implements OnInit {
  // Stores error message for login validation
  public formError: string = '';

  // Tracks if form has been submitted
  submitted = false;

  // Holds user login input values
  credentials = {
    name: '',
    email: '',
    password: '',
  };

  // Injects router and authentication service
  constructor(
    private router: Router,
    private authenticationService: AuthenticationService,
  ) {}

  // Lifecycle hook that runs when component initializes
  ngOnInit(): void {}

  // Handles login form submission
  public onLoginSubmit(): void {
    this.formError = '';

    if (!this.credentials.email || !this.credentials.password) {
      this.formError = 'Email and password are required, please try again';
    } else {
      this.doLogin();
    }
  }

  // Processes login request and handles navigation after authentication
  private doLogin(): void {
    let newUser = { name: this.credentials.name, email: this.credentials.email } as User;

    console.log('Login::doLogin');
    console.log(this.credentials);

    this.authenticationService.login(newUser, this.credentials.password);

    if (this.authenticationService.isLoggedIn()) {
      console.log('Router::Direct');
      this.router.navigate(['']);
    } else {
      var timer = setTimeout(() => {
        if (this.authenticationService.isLoggedIn()) {
          console.log('Router::Pause');
          this.router.navigate(['']);
        }
      }, 3000);
    }
  }
}
