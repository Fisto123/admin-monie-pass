import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-dashboard-leftbar',
  templateUrl: './dashboard-leftbar.component.html',
  styleUrls: ['./dashboard-leftbar.component.css'],
})
export class DashboardLeftbarComponent {
  constructor(private auth: AuthService, private router: Router) {}
  canShowUserLink!: boolean;
  navlinks: any = [
    {
      id: 1,
      name: 'Dashboard',
      icon: 'dashboard',
      link: '/dashboard',
    },
    {
      id: 2,
      name: 'Orders',
      link: 'orders',
      icon: 'shopping cart',
    },
    {
      id: 3,
      name: 'Invoice',
      link: 'invoice',
      icon: 'book',
    },
    {
      id: 4,
      name: 'Chatbox',
      link: 'chat',
      icon: 'message',
    },
    {
      id: 5,
      name: 'Analytics',
      link: 'analytics',
      icon: 'timeline',
    },
    {
      id: 6,
      name: 'Settings',
      link: 'settings',
      icon: 'settings',
    },
  ];
  ngOnInit(): void {
    let user = this.auth.decodedUser();
    if (user.role === 'opera' || user.role === 'client') {
      this.canShowUserLink = false;
    } else {
      this.canShowUserLink = true;
    }
  }
  logOut() {
    this.auth.clearLocalStorage();
    this.router.navigate(['login']);
  }
}
