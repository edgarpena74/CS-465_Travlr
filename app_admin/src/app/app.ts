import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { TripListing } from './trip-listing/trip-listing';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CommonModule],

  templateUrl: './app.html',
  styleUrl: './app.css',
})
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
