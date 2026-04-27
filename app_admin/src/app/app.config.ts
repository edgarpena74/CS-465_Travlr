/* 
---------------------------
      Angular Imports
--------------------------
*/

/* 
ApplicationConfig: Defines global configuration for the Angular application
importProvidersFrom: Allows importing providers from existing modules
*/
import { ApplicationConfig, importProvidersFrom } from '@angular/core';

//provideRouter: Registers application routes for navigation
import { provideRouter } from '@angular/router';

/* 
HttpClient: Service for making HTTP requests
provideHttpClient: Registers HTTP client providers
*/
import { HttpClient, provideHttpClient } from '@angular/common/http';

/* 
---------------------------
      MODULE IMPORTS
---------------------------
*/
// Imports application route definitions
import { routes } from './app.routes';

// Imports JWT interceptor provider for attaching auth tokens to requests
import { authInterceptProvider } from './util/jwt-interceptor';

/* 
----------------------------------------------
      EXPORTED FUNCTION DEFENITION
----------------------------------------------
*/

// Defines application-wide providers and configuration
export const appConfig: ApplicationConfig = {
  providers: [
    // Registers application routes for navigation
    provideRouter(routes),

    // Enables HTTP client for making API requests
    provideHttpClient(),

    // Imports HTTP client providers from Angular module system
    importProvidersFrom(HttpClient),

    // Adds JWT interceptor to attach auth token to outgoing requests
    authInterceptProvider,
  ],
};
