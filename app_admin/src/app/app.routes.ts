/* 
-------------------------------------
			ANGULAR ROUTING IMPORTS
-------------------------------------
*/
// Routes: Defines application routes for navigation
import { Routes } from '@angular/router';

/* 
---------------------------
			MODULE IMPORTS
---------------------------
*/
// Imports AddTrip component for creating new trips
import { AddTrip } from './add-trip/add-trip';

// Imports TripListing component to display all trips
import { TripListing } from './trip-listing/trip-listing';

// Imports EditTrip component for updating existing trips
import { EditTrip } from './edit-trip/edit-trip';

// Imports Login component for user authentication
import { Login } from './login/login';

/* 
------------------------------
			ROUTE DEFINITIONS
------------------------------
*/
// Defines application route paths and associated components
export const routes: Routes = [
  { path: 'add-trip', component: AddTrip },

  { path: 'edit-trip', component: EditTrip },

  { path: 'login', component: Login },

  /* 
  path: '' sets the default route

  component: TripListing loads the trip listing view

  pathMatch: 'full' ensures the URL must match exactly
  */
  { path: '', component: TripListing, pathMatch: 'full' },
];
