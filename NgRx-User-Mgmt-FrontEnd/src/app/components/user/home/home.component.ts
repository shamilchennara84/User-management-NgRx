import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Emitters } from '../../../emmiters/emitters';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {

  constructor(private http: HttpClient) {}
  ngOnInit(): void {
    this.http.get('user', { withCredentials: true }).subscribe({
      next: () => {
        Emitters.authEmitter.emit(true);
      },
      error: (err) => {
        Emitters.authEmitter.emit(false);
      },
    });
  }
}
