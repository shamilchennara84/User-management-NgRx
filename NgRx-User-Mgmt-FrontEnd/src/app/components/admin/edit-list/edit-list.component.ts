import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../../../models/user.model';
import { hasFormErrors } from '../../../helpers/form.validation.helper';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit-list',
  templateUrl: './edit-list.component.html',
  styleUrl: './edit-list.component.css',
})
export class EditListComponent implements OnInit {
  userName!: string;
  email!: string;
  form!: FormGroup;
  isSubmitted = false;
  param: any;

  constructor(
    private http: HttpClient,
    private formBuilder: FormBuilder,
    private router: Router,
    private activateRouter: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      name: [this.userName, Validators.required],
    });

    this.activateRouter.params.subscribe(
      (params) => (this.param = params['id'])
    );

    this.http.get<User>('admin/active', { withCredentials: true }).subscribe({
      next: (res: User) => {
        this.getUserDetails(this.param);
      },

      error: (err) => {
        this.router.navigate(['/admin']);
      },
    });
  }

  get f() {
    return this.form.controls;
  }

  onSubmit() {
    this.isSubmitted = true;
    const user = this.form.getRawValue();
    user.email = this.email;

    if (hasFormErrors(this.form)) {
      Swal.fire(
        'Check Inputs',
        'Name Remain Unchanged or Name Removed',
        'warning'
      );
    } else {
      this.http
        .put('admin/editUser', user, { withCredentials: true })
        .subscribe({
          next: () => {
            this.router.navigate(['/admin/usersList']);
          },
          error: (err) => {
            Swal.fire('Error', err.error.message, 'error');
          },
        });
    }
  }

  getUserDetails(userId: string) {
    this.http.get
      <User>(`admin/userDetails/${userId}`, { withCredentials: true })
      .subscribe({
        next: (res: User) => {
          (this.userName = res.name), (this.email = res.email);
        },
        error: (err) => {
          this.router.navigate(['/admin']);
        },
      });
  }
}
