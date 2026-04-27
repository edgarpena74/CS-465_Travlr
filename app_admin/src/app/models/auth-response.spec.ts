/* 
---------------------------
			MODULE IMPORTS
---------------------------
*/
// AuthResponse: Model representing authentication response data
import { AuthResponse } from './auth-response';

/* 
---------------
			SPEC
---------------
*/
describe('AuthResponse', () => {
  it('should create an instance', () => {
    // Verifies AuthResponse instance is created successfully
    expect(new AuthResponse()).toBeTruthy();
  });
});
