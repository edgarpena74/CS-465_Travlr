/* 
-------------------------------
			ANGULAR TEST IMPORTS
-------------------------------
*/
// TestBed: Configures and initializes Angular testing environment.
import { TestBed } from '@angular/core/testing';

/* 
-------------------------
			MODULE IMPORTS
-------------------------
*/
// AuthenticationService: Service for handling user authentication
import { AuthenticationService } from './authentication';

/* 
----------------
			SPEC
----------------
*/
describe('AuthenticationService', () => {
  let service: AuthenticationService;

  beforeEach(() => {
    // Sets up testing module and injects service
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthenticationService);
  });

  it('should be created', () => {
    // Verifies service is created successfully
    expect(service).toBeTruthy();
  });
});
