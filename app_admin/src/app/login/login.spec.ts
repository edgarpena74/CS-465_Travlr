/* 
-------------------------------
			ANGULAR TEST IMPORTS
-------------------------------
*/
/* 
ComponentFixture: Wraps component instance for testing.
TestBed: Configures and initializes Angular testing environment.
*/
import { ComponentFixture, TestBed } from '@angular/core/testing';

/* 
-----------------------
			MODULE IMPORTS
-----------------------
*/
// Login: Component used for user authentication
import { Login } from './login';

/* 
------------------
			SPEC
------------------
*/
describe('Login', () => {
  let component: Login;
  let fixture: ComponentFixture<Login>;

  beforeEach(async () => {
    // Configures testing module with Login component
    await TestBed.configureTestingModule({
      imports: [Login],
    }).compileComponents();

    // Creates component instance and fixture
    fixture = TestBed.createComponent(Login);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    // Verifies component is created successfully
    expect(component).toBeTruthy();
  });
});
