import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-nav',
  templateUrl: './admin-nav.component.html',
  styleUrl: './admin-nav.component.css',
})
export class AdminNavComponent {
  constructor(private http: HttpClient, private router: Router) {}

  onLogout() {
    this.http
      .post('admin/logout', {}, { withCredentials: true })
      .subscribe(() => {
        localStorage.removeItem('isAdminLoggedIn');
        this.router.navigate(['/admin']);
      });
  }
}
