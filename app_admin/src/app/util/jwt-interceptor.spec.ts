/* 
-------------------------------
			ANGULAR TEST IMPORTS
------------------------------
*/

// TestBed: Configures and initializes Angular testing environment.
import { ComponentFixture, TestBed } from '@angular/core/testing';
/* 
-------------------------
			MODULE IMPORTS
-------------------------
*/
// Imports JwtInterceptor
import { JwtInterceptor } from './jwt-interceptor';
// Imports AuthenticationService
import { AuthenticationService } from '../services/authentication';

/* 
----------------
			SPEC
----------------
*/
describe('JwtInterceptor', () => {
  let interceptor: JwtInterceptor;

  beforeEach(() => {
    // Sets up testing module with interceptor and mock service
    TestBed.configureTestingModule({
      providers: [
        JwtInterceptor,
        {
          provide: AuthenticationService,
          useValue: {},
        },
      ],
    });

    // Injects interceptor instance from testing module
    interceptor = TestBed.inject(JwtInterceptor);
  });

  it('should be created', () => {
    // Verifies interceptor instance is created successfully
    expect(interceptor).toBeTruthy();
  });
});
