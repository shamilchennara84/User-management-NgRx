import { Component, OnInit } from '@angular/core';
import { User } from '../../../models/user.model';
import { HttpClient } from '@angular/common/http';
import { Store, select } from '@ngrx/store';
import { Router } from '@angular/router';
import { usersSelector } from '../../../states/user/user.selectors';
import { retrieveUsers } from '../../../states/user/user.actions';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrl: './users-list.component.css',
})
export class UsersListComponent implements OnInit {
  filteredUsers!: User[];
  users!: User[];
  searchText!: string;

  constructor(
    private http: HttpClient,
    private store: Store<{ allUsers: User[] }>,
    private router: Router
  ) {}

  userData$ = this.store.pipe(select(usersSelector));

  ngOnInit(): void {
    this.store.dispatch(retrieveUsers());

    this.userData$.subscribe((data: User[]) => {
      this.users = data;
      this.filteredUsers = [...data];
      console.log(this.users, 'users', this.filteredUsers, 'filteredUser');
    });
  }

  editUser(userId: string) {
    this.router.navigate(['/admin/editUser', userId]);
  }

  confirmDelete(userId: string) {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, cancel!',
    }).then((result) => {
      if (result.isConfirmed) {
        this.http
          .delete(`admin/deleteUser/${userId}`, { withCredentials: true })
          .subscribe({
            next: () => {
              this.store.dispatch(retrieveUsers());
            },
            error: () => {
              this.router.navigate(['/admin']);
            },
          });

        Swal.fire('Deleted!', 'User has been deleted', 'success');
      }
    });
  }

  search(): void {
    if (!this.searchText) {
      this.filteredUsers = [...this.users];
      return;
    }

    this.filteredUsers = this.users.filter((user) =>
      user.name.toLowerCase().includes(this.searchText.toLowerCase())
    );
  }
}
