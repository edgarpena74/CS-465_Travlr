/* 
------------------------------
			MODULE IMPORTS
------------------------------
*/
// User: Model representing user data
import { User } from './user';

/* 
-------------------
			SPEC
-------------------
*/
describe('User', () => {
  it('should create an instance', () => {
    // Verifies User instance is created successfully

    expect(new User()).toBeTruthy();
  });
});
