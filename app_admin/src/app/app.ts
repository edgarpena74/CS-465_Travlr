/* 
---------------------------
			ANGULAR IMPORTS
--------------------------
*/
/* 
Component: Decorator that defines this class as an Angular component
signal: Creates a reactive state variable that updates the UI automatically
*/
import { Component, signal } from '@angular/core';

// RouterOutlet: Displays routed components inside the application view
import { RouterOutlet } from '@angular/router';

// CommonModule: Provides common Angular directives like ngIf and ngFor
import { CommonModule } from '@angular/common';

/* 
-------------------------
			MODULE IMPORTS
-------------------------
*/
// Imports Trip Listing component
import { TripListing } from './trip-listing/trip-listing';

// Imports Navbar component
import { Navbar } from './navbar/navbar';

/* 
------------------------------------
			COMPONENT CONFIGURATION
------------------------------------
*/
/* 

Imports:

RouterOutlet: Renders components based on the current route

CommonModule: Enables use of built-in Angular directives

Navbar: Displays the navigation bar across the application

TripListing: Displays the list of trips in the main view

*/
@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CommonModule, Navbar],

  templateUrl: './app.html',
  styleUrl: './app.css',
})

/* 
----------------------------
			COMPONENT CLASS
----------------------------
*/
export class App {
  // Changed to "Travlr Getaways Admin!" in module 6
  /* 

  NOTE: An Angular signal is used to manage state. 
  
  - This creates a reactive state for variable "title".
  - The value can be read using Title in the templete.
  - If the value changes, Angular will automatically update the UI.

  */
  protected readonly title = signal('Travlr Getaways Admin!');
}
