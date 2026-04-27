/* 
---------------------------
			ANGULAR IMPORTS
--------------------------
*/
/* 
Inject: Allows manual injection of a dependency token
Injectable: Marks this class as available for dependency injection
*/
import { Inject, Injectable } from '@angular/core';

// HttpClient: Service for making HTTP requests
import { HttpClient } from '@angular/common/http';

// Observable: Represents asynchronous data returned from API calls
import { Observable } from 'rxjs';

/* 
----------------------------
			MODULE IMPORTS
----------------------------
*/
// Trip: Model representing trip data structure
import { Trip } from '../models/trip';

// User: Model representing user data
import { User } from '../models/user';

// AuthResponse: Model representing authentication response data
import { AuthResponse } from '../models/auth-response';

// BROWSER_STORAGE: Injection token for accessing browser storage
import { BROWSER_STORAGE } from '../storage';

// Allow class to inject this class into other components or services
@Injectable({
  // Makes this a singleton and registers it globally
  providedIn: 'root',
})

/* 
------------------------------
			SERVICE CLASS
-----------------------------
*/
export class TripDataService {
  // API endpoint URLs for trip and auth requests
  private url = 'http://localhost:3000/api/trips';
  private baseUrl = 'http://localhost:3000/api';

  /* 
  Define constructor
    http: Used to make HTTP requests to the API 
    storage: Used to access browser storage (localStorage)
  */
  constructor(
    private http: HttpClient,

    @Inject(BROWSER_STORAGE) private storage: Storage,
  ) {}

  // Retrieves all trips from the API
  // Returns: A list of all trips from the database
  public getTrips(): Observable<Trip[]> {
    console.log('Inside TripDataService::getTrips');
    return this.http.get<Trip[]>(this.url);
  }

  // Retrieves a single trip using its code
  // Returns: A single trip that matches the provided trip code
  public getTrip(tripCode: string): Observable<Trip[]> {
    console.log('Inside TripdataService::getTrip');
    return this.http.get<Trip[]>(this.url + '/' + tripCode);
  }

  // Sends request to create a new trip
  // Returns: The newly created trip after it is saved to the database
  public addTrip(formData: Trip): Observable<Trip> {
    return this.http.post<Trip>(this.url, formData);
  }

  // Sends request to update an existing trip
  // Returns: The updated trip after changes are saved
  public updateTrip(formData: Trip): Observable<Trip> {
    // console log ("Inside TripDataService::addTrips")
    return this.http.put<Trip>(this.url + '/' + formData.code, formData);
  }

  // Call to our /login endpoint, returns JWT
  // Returns: Authentication response containing a JWT token
  login(user: User, passwd: string): Observable<AuthResponse> {
    console.log('Inside TripDataService::login');
    return this.handleAuthAPICall('login', user, passwd);
  }

  // Call to our /register endpoint, creates user and returns JWT
  // Returns: Authentication response containing a JWT token for the new user
  register(user: User, passwd: string): Observable<AuthResponse> {
    console.log('Inside TripDataService::register');
    return this.handleAuthAPICall('register', user, passwd);
  }

  // Handles both login and register API requests
  // Returns: Authentication response from the API (includes JWT token)
  handleAuthAPICall(endpoint: string, user: User, passwd: string): Observable<AuthResponse> {
    console.log('Inside TripDataService::handleAuthAPICall');
    let formData = { name: user.name, email: user.email, password: passwd };
    return this.http.post<AuthResponse>(this.baseUrl + '/' + endpoint, formData);
  }
}
