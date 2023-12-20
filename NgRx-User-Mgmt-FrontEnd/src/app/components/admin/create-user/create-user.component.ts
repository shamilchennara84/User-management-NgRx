import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { hasFormErrors } from '../../../helpers/form.validation.helper';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrl: './create-user.component.css',
})
export class CreateUserComponent implements OnInit {
  form!: FormGroup;
  isSubmitted = false;

  constructor(
    private http: HttpClient,
    private formBuilder: FormBuilder,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', Validators.required, Validators.email],
      password: ['', Validators.required],
    });
  }

  get f() {
    return this.form.controls;
  }

  onSubmit() {
    this.isSubmitted = true;

    if (hasFormErrors(this.form)) {
      Swal.fire(
        'Check Inputs',
        'Enter all input fields fields properly',
        'warning'
      );
    } else {
      const user = this.form.getRawValue();
      this.http
        .post('admin/createUser', user, { withCredentials: true })
        .subscribe({
          next: () => {
            this.router.navigate(['/admin/userList']);
          },
          error: (err) => {
            Swal.fire('Error', err.error.message, 'error');
          },
        });
    }
  }
}
