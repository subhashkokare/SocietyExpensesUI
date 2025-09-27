// src/app/auth/login.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  standalone: true,
  selector: 'app-login',
  imports: [CommonModule, FormsModule],
  template: `
    <div class="row">
      <div class="col-md-6">
        <h2>Login</h2>
        <form (ngSubmit)="submit()" #f="ngForm">
          <div class="mb-2">
            <label class="form-label">Username</label>
            <input class="form-control" name="username" [(ngModel)]="model.username" required />
          </div>
          <div class="mb-2">
            <label class="form-label">Password</label>
            <input class="form-control" type="password" name="password" [(ngModel)]="model.password" required />
          </div>
          <div *ngIf="error" class="text-danger mb-2">{{ error }}</div>
          <button class="btn btn-primary" type="submit" [disabled]="loading">Login</button>
        </form>
      </div>
    </div>
  `
})
export class LoginComponent {
  model = { username: '', password: '' };
  error = '';
  loading = false;

  constructor(private auth: AuthService, private router: Router) {}

  submit() {
    this.error = '';
    this.loading = true;
    this.auth.login(this.model.username, this.model.password).subscribe({
      next: () => {
        this.loading = false;
        // navigate to dashboard (root) after successful login
        this.router.navigate(['/']);
      },
      error: (err) => {
        this.loading = false;
        this.error = err?.error?.message ?? err?.error ?? 'Login failed';
      }
    });
  }
}
