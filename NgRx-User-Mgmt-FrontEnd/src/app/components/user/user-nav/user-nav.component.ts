import { Component,OnInit } from '@angular/core';
import { Emitters } from '../../../emmiters/emitters';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-user-nav',
  templateUrl: './user-nav.component.html',
  styleUrl: './user-nav.component.css',
})
export class UserNavComponent implements OnInit {
  isAuthenticated = false;
  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    Emitters.authEmitter.subscribe((auth: boolean) => {
      console.log(auth);
      this.isAuthenticated = auth;
    });
  }

  logout() {
    this.http.post('user/logout', {}, { withCredentials: true }).subscribe(() => {
      localStorage.removeItem('isUserLoggedIn');
      this.isAuthenticated = false;
    });
  }
}
