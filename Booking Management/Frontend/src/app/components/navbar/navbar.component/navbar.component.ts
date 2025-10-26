import { Component } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: false,
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  user: any;

  constructor(public auth: AuthService) {}

  ngOnInit() {
    this.user = this.auth.getUser();
  }

  logout() {
    this.auth.logout();
  }
}
