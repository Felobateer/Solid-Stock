import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly storageKey = 'loggedIn';

  constructor() {}

  // Method to check if the user is logged in
  isLoggedIn(): boolean {
    const value = sessionStorage.getItem(this.storageKey);
    return value ? value === 'true' : false;
  }

  // Method to log the user in
  login() {
    sessionStorage.setItem(this.storageKey, 'true');
  }

  // Method to log the user out
  logout() {
    sessionStorage.setItem(this.storageKey, 'false');
  }
}
