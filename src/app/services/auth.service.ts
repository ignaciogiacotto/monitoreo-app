import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isLoggedIn = false;

  constructor(private router: Router) {}

  login(email: string, password: string) {
    this.isLoggedIn = true;
    localStorage.setItem('isLoggedIn', 'true');
    this.router.navigate(['/dashboard']);
  }

  logout() {
    this.isLoggedIn = false;
    localStorage.removeItem('isLoggedIn');
    this.router.navigate(['/auth']);
  }

  isAuthenticated(): boolean {
    return this.isLoggedIn || localStorage.getItem('isLoggedIn') === 'true';
  }
}