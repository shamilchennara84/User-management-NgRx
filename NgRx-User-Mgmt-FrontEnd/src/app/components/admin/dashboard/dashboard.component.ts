import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../../../models/user.model';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent implements OnInit {
  adminName!: string;

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit(): void {
    this.http.get<User>('admin/active', { withCredentials: true }).subscribe({
      next: (res: User) => {
        console.log('dashboard');
        this.adminName = res.name;
      },
      error: (err: any) => {
        console.error('Error fetching admin data:', err);
        this.router.navigate(['/admin']);
      },
    });
  }
}
