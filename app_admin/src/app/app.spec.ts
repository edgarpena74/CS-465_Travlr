/* 
----------------------------------
			ANGULAR TEST IMPORTS
----------------------------------
*/
// TestBed: Configures and initializes Angular testing environment
import { TestBed } from '@angular/core/testing';

/* 
-------------------------
			MODULE IMPORTS
-------------------------
*/
// Imports App component for testing
import { App } from './app';

/* 
-----------------
			SPEC
-----------------
*/
describe('App', () => {
  beforeEach(async () => {
    // Sets up testing module with App component
    await TestBed.configureTestingModule({
      imports: [App],
    }).compileComponents();
  });

  it('should create the app', () => {
    // Creates an instance of the App component
    const fixture = TestBed.createComponent(App);
    const app = fixture.componentInstance;
    // Verifies the App component is created successfully
    expect(app).toBeTruthy();
  });

  it('should render title', async () => {
    // Creates component and waits for async rendering to complete
    const fixture = TestBed.createComponent(App);
    await fixture.whenStable();
    const compiled = fixture.nativeElement as HTMLElement;
    // Checks that the title text is rendered in the template
    expect(compiled.querySelector('h1')?.textContent).toContain('Hello, travlr-admin');
  });
});
