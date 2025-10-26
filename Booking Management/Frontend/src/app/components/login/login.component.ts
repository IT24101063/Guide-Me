import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  form: FormGroup;
  loading = false;
  error = '';

  constructor(private fb: FormBuilder, private http: HttpClient, private router: Router, private authService: AuthService) {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

login(): void {
  if (this.form.invalid) return;

  this.loading = true;
  this.error = '';

  this.http.post<any>(`${environment.apiUrl}/auth/login`, this.form.value)
    .subscribe({
      next: (res) => {
        console.log('Logged in user:', res);

        // ✅ Store in AuthService
        this.authService.setUser(res);

        this.loading = false;
        this.router.navigate(['/']); // Go to home
      },
      error: (err) => {
        console.error('Login error:', err);
        this.error = err.error?.message || 'Login failed. Please check your credentials.';
        this.loading = false;
      }
    });
  }
}
