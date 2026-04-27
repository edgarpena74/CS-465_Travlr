/* 
---------------------------
			ANGULAR IMPORTS
--------------------------
*/
/* 
Injectable: Marks this class as available for dependency injection
Provider: Defines a dependency injection provider
*/
import { Injectable, Provider } from '@angular/core';

/* 
HttpRequest: Represents an outgoing HTTP request

HttpHandler: Handles HTTP request processing

HttpEvent: Represents events returned from HTTP calls

HttpInterceptor: Interface for intercepting HTTP requests

HTTP_INTERCEPTORS: Token used to register interceptors

HttpInterceptorFn: Functional interceptor type
*/
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HTTP_INTERCEPTORS,
  HttpInterceptorFn,
} from '@angular/common/http';

/* 
Observable: Represents asynchronous data streams
*/
import { Observable } from 'rxjs';

/* 
-----------------------------
			MODULE IMPORTS
----------------------------
*/
// Modules
import { AuthenticationService } from '../services/authentication';

/* 
--------------------------------
			INTERCEPTOR CLASS
--------------------------------
*/
@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  constructor(private authenticationService: AuthenticationService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let isAuthAPI: boolean;

    console.log('Interceptor::URL ' + request.url);

    // Check if request is for login or register

    if (request.url.includes('/login') || request.url.includes('/register')) {
      isAuthAPI = true;
    } else {
      isAuthAPI = false;
    }

    // Add token if logged in and NOT auth API

    if (this.authenticationService.isLoggedIn() && !isAuthAPI) {
      const token = this.authenticationService.getToken();

      console.log(token);

      const authReq = request.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`,
        },
      });

      return next.handle(authReq);
    }

    // Otherwise send original request

    return next.handle(request);
  }
}

/* 
------------------------------------
			PROVIDER CONFIGURATION
------------------------------------
*/
export const authInterceptProvider: Provider = {
  provide: HTTP_INTERCEPTORS,
  useClass: JwtInterceptor,
  multi: true,
};
