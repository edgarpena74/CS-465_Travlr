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
------------------------------
			MODULE IMPORTS
------------------------------
*/
// Navbar: Component used for navigation
import { Navbar } from './navbar';

/* 
----------------------
			SPEC
----------------------
*/
describe('Navbar', () => {
  let component: Navbar;
  let fixture: ComponentFixture<Navbar>;

  beforeEach(async () => {
    // Configures testing module with Navbar component
    await TestBed.configureTestingModule({
      imports: [Navbar],
    }).compileComponents();

    // Creates component instance and fixture
    fixture = TestBed.createComponent(Navbar);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    // Verifies component is created successfully
    expect(component).toBeTruthy();
  });
});
