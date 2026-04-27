// Imports Storage class for testing
import { Storage } from './storage';

describe('Storage', () => {
  it('should create an instance', () => {
    // Verifies that a new Storage object is created successfully
    expect(new Storage()).toBeTruthy();
  });
});
