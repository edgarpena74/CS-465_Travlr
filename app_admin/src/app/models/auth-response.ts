export class AuthResponse {
  // JWT token returned from authentication
  token: string;

  constructor() {
    // Initialize token as empty string
    this.token = '';
  }
}
