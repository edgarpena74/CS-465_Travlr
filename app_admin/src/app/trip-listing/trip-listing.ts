/* 
OnInit: Lifecycle hook called after Angular has initialized all
data-bound properties of a directive.

Basic Explanation: OnInit is used to run setup code when the component 
first loads, such as retrieving data or initializing values
*/

// Added OnInit import
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';

/* 
CommonModule: Provides common Angular directives and pipes for use in component
  - Allows us to use features like ngIf, ngFor and
    built in pipes such as date and currency
*/
import { CommonModule } from '@angular/common';

// Import modules to pull data from database
import { Trip } from '../models/trip';
import { TripDataService } from '../services/trip-data';

// Import trip card component
import { TripCard } from '../trip-card/trip-card';

// Import Router module
import { Router } from '@angular/router';

@Component({
  selector: 'app-trip-listing',
  standalone: true,
  imports: [CommonModule, TripCard],

  templateUrl: './trip-listing.html',
  styleUrl: './trip-listing.css',
  // Register TripData service as a provider
  providers: [TripDataService],
})

/* 
================================
******* DEVELOPER NOTE *********
================================


During development, an issue was encountered where trip data was successfully
retrieved from the API (confirmed through console logs), but the UI was not
updating to display the results.

This occurred because Angular’s change detection did not automatically trigger
after the asynchronous HTTP request completed.

To resolve this, ChangeDetectorRef was used with detectChanges() inside the
subscription callback. This forces Angular to update the view after the data
is assigned to the trips array.

This change ensures that the trip list renders correctly after data is loaded
from the backend API.

*/
export class TripListing implements OnInit {
  /* 

  */
  trips: Trip[] = [];
  message: string = '';

  constructor(
    private tripDataService: TripDataService,
    private router: Router,
    private changeDetectorRef: ChangeDetectorRef,
  ) {
    console.log('trip-listing constructor');
  }

  public addTrip(): void {
    this.router.navigate(['add-trip']);
  }

  // Define getStuff function
  private getStuff(): void {
    console.log('test at this.getStuff()');
    this.tripDataService.getTrips().subscribe({
      next: (value: any) => {
        console.log('getStuff() returned', value);
        this.trips = value;
        if (value.length > 0) {
          this.message = 'There are ' + value.length + ' trips available.';
        } else {
          this.message = 'There were no trips retrieved from the database';
        }
        console.log(this.message);
        this.changeDetectorRef.detectChanges();
      },
      error: (error: any) => {
        console.log('Error: ' + error);
      },
    });
  }

  /* 
    Angular lifecycle hook that runs once 
    when the component initializes.

  */
  ngOnInit(): void {
    console.log('ngOnInit');
    this.getStuff();
  }
}
