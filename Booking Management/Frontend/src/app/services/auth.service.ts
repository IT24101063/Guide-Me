import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private userKey = 'user';

  constructor(private router: Router) {}

  setUser(user: any): void {
    localStorage.setItem(this.userKey, JSON.stringify(user));
  }

  getUser(): any {
    const user = localStorage.getItem(this.userKey);
    return user ? JSON.parse(user) : null;
  }

  isLoggedIn(): boolean {
    return !!this.getUser();
  }

  getRole(): string | null {
    return this.getUser()?.role || null;
  }

  getUserId(): number | null {
    return this.getUser()?.id || null;
  }
  
  logout(): void {
    localStorage.removeItem(this.userKey);
    this.router.navigate(['/']);
  }
}
