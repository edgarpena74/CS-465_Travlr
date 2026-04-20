/* 
Imports  
- Component: Decorator that marks a class and an Angular components

- OnInit: Lifecycle hook called after Angular has initialized all
          data-bound properties of a directive.
          
          - Basic Explanation: OnInit is used to run setup code when the component 
            first loads, such as retrieving data or initializing values.

- Input: Enables Angular inputs in directives and components. 
        - Optional inputswith initial value
        - Required inputs that consumers need to set
        
        - * This essentially allows data exchange from trip-listing component
*/
import { Component, OnInit, Input } from '@angular/core';

/* 
CommonModule: Provides common Angular directives and pipes for use in component
  - Allows us to use features like ngIf, ngFor and
    built in pipes such as date and currency
*/
import { CommonModule } from '@angular/common';

import { Router } from '@angular/router';

import { Trip } from '../models/trip';

@Component({
  selector: 'app-trip-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './trip-card.html',
  styleUrl: './trip-card.css',
})
export class TripCard implements OnInit {
  /* 
    Enable data exchange from trip-listing component
    - The "trip" data gets passed from the 
      #ngFor loop inside of trip-listing.html
    - Each item from the trips array get passed 
      individually into this input property.
  */
  @Input('trip') trip: any;

  // Define contructor with router param
  constructor(private router: Router) {}

  /* 
    Angular lifecycle hook that runs once 
    when the component initializes.

    - Returns nothing
  */
  ngOnInit(): void {}

  public editTrip(trip: Trip) {
    localStorage.removeItem('tripCode');
    localStorage.setItem('tripCode', trip.code);
    this.router.navigate(['edit-trip']);
  }
}
