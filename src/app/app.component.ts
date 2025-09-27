import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet, RouterLink, Router } from '@angular/router';
import { AuthService } from './services/auth.service';
import { SettingsService } from './services/settings.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink],
  templateUrl:'./app.component.html',
  styleUrls: ['./app.component.css'] 
})
export class AppComponent {
  societyName = '';
  constructor(public auth: AuthService, private router: Router,private settings: SettingsService) {}

  ngOnInit() {
    this.settings.getSocietyName().subscribe(res => this.societyName = res.name);
  }
  
  isAuthenticated() { return this.auth.isAuthenticated(); }

  displayName() {
  const u = this.auth.getUserValue();
  return u?.displayName ?? u?.username ?? 'User';
}

  logout() {
  this.auth.logout();
  this.router.navigate(['/login']);
}
}
