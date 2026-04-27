/* 
----------------------------
			ANGULAR IMPORTS
----------------------------
*/
// InjectionToken: Creates a custom dependency injection token for Angular
import { InjectionToken } from '@angular/core';

/* 
------------------------------
			EXPORTED CONSTANT
------------------------------
*/
// BROWSER_STORAGE: Provides access to browser localStorage through Angular DI
export const BROWSER_STORAGE = new InjectionToken<Storage>('Browser Storage', {
  providedIn: 'root',
  factory: () => localStorage,
});

/* 
--------------------------
			EXPORTED CLASS
--------------------------
*/
// Storage: Defines a type for browser storage
export class Storage {}
