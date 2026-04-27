/* 
---------------------------
			ANGULAR IMPORTS
--------------------------
*/
/* 
Inject: Allows manual injection of a dependency token 
Injectable: Marks this class for dependency injection
*/
import { Inject, Injectable } from '@angular/core';

/* 
----------------------------------------------
			MODULE IMPORTS
----------------------------------------------
*/

// BROWSER_STORAGE: Injection token for accessing browser storage
import { BROWSER_STORAGE } from '../storage';

// User: Model representing user data
import { User } from '../models/user';

// AuthResponse: Model representing authentication response data
import { AuthResponse } from '../models/auth-response';

// TripDataService: Service for handling API requests
import { TripDataService } from './trip-data';

/* 
------------------------------
			SERVICE CLASS
-----------------------------
*/
@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  // Setup our storage and service access
  constructor(
    @Inject(BROWSER_STORAGE) private storage: Storage,
    private TripDataService: TripDataService,
  ) {}

  // variable to handle authentication resonses
  authResp: AuthResponse = new AuthResponse();

  // get our token from our storage provider.
  // NOTE: For this application we habe decided that we will name
  // the key for our token 'travlr-token'
  public getToken(): string {
    let out: any;
    out = this.storage.getItem('travlr-token');

    // Make sure we return a string even if we dont
    // have a token
    if (!out) {
      return '';
    }
    return out;
  }

  // Save our token to our Storage provider
  // NOTE: For this application we habe decided that we will name
  // the key for our token 'travlr-token'
  public saveToken(token: string): void {
    this.storage.setItem('travlr-token', token);
  }

  // Logout of our application and remove the JWT from storage
  public logout(): void {
    this.storage.removeItem('travlr-token');
  }

  // Boolean to determine if we are logged in and the token is still valid.
  // Even if we have a token we will still have to reauthentication if token
  // is expired.
  public isLoggedIn(): boolean {
    const token: string = this.getToken();
    if (token) {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return payload.exp > Date.now() / 1000;
    } else {
      return false;
    }
  }

  // Retrieve the current user.
  // This function should only be called after the calling method has
  // checked to make sure that the user idLoggedIn.
  public getCurrentUser(): User {
    const token: string = this.getToken();
    const { email, name } = JSON.parse(atob(token.split('.')[1]));
    return { email, name } as User;
  }

  // Login method that leverages the login method in tripDataService
  // Because that method returns an observable, we subscribe to the
  // result and only process when the Observable condition is satisfied
  // Uncomment the two console.log messages for additional debugging
  // information.
  public login(user: User, passwd: string): void {
    this.TripDataService.login(user, passwd).subscribe({
      next: (value: any) => {
        if (value) {
          console.log(value);
          this.authResp = value;
          this.saveToken(this.authResp.token);
        }
      },
      error: (error: any) => {
        console.log('Error: ' + error);
      },
    });
  }

  // Register method that leverages the register method in
  // tripDataService
  //
  // Because that method returns an observable, we subscribe to the
  // result and only process when the Observable condition is satisfied
  // Uncomment the two console.log messages for additional debugging
  // information. Please Note: This method is nearly identical to the
  // login method because the behavior of the API logs a new user in
  // immediately upon registration

  public register(user: User, passwd: string): void {
    this.TripDataService.register(user, passwd).subscribe({
      next: (value: any) => {
        if (value) {
          console.log(value);
          this.authResp = value;
          this.saveToken(this.authResp.token);
        }
      },
      error: (error: any) => {
        console.log('Error: ' + error);
      },
    });
  }
}
