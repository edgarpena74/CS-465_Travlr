/* 
---------------------------
			ANGULAR IMPORTS
--------------------------
*/
/* 
Component: Decorator that defines this class as an Angular component
OnInit: Lifecycle hook used to run code when the component initializes
*/
import { Component, OnInit } from '@angular/core';

// CommonModule: Provides common Angular directives like ngIf and ngFor
import { CommonModule } from '@angular/common';

/* 
RouterLink: Enables navigation between routes
RouterLinkActive: Applies styling to active route links
*/
import { RouterLink, RouterLinkActive } from '@angular/router';

/* 
-----------------------------
			MODULE IMPORTS
-----------------------------
*/
// AuthenticationService: Handles user authentication and login state
import { AuthenticationService } from '../services/authentication';

// RouterModule: Provides routing functionality for the application
import { RouterModule } from '@angular/router';

/* 
----------------------------------------
			COMPONENT CONFIGURATION
----------------------------------------
*/
@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})

/* 
----------------------------
			COMPONENT CLASS
----------------------------
*/
export class Navbar implements OnInit {
  // Injects authentication service for login state management
  constructor(private authenticationService: AuthenticationService) {}

  // Lifecycle hook that runs when component initializes
  ngOnInit() {}

  // Returns true if user is logged in
  public isLoggedIn(): boolean {
    return this.authenticationService.isLoggedIn();
  }

  // Logs the user out of the application
  public onLogout(): void {
    return this.authenticationService.logout();
  }
}
