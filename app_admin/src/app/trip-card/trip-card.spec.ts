/* 
-------------------------------
			ANGULAR TEST IMPORTS
------------------------------
*/
/* 
ComponentFixture: Wraps component instance for testing.
TestBed: Configures and initializes Angular testing environment.
*/
import { ComponentFixture, TestBed } from '@angular/core/testing';

/* 
-------------------------
			MODULE IMPORTS
-------------------------
*/
// Imports TripCard component for testing
import { TripCard } from './trip-card';

/* 
------------------
			SPEC
------------------
*/
describe('TripCard', () => {
  let component: TripCard;
  let fixture: ComponentFixture<TripCard>;

  beforeEach(async () => {
    // Configures testing module with TripCard component
    await TestBed.configureTestingModule({
      imports: [TripCard],
    }).compileComponents();

    // Creates component instance and fixture
    fixture = TestBed.createComponent(TripCard);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    // Verifies component is created successfully
    expect(component).toBeTruthy();
  });
});
