import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { hasFormErrors } from '../../../helpers/form.validation.helper';
import Swal from 'sweetalert2';
import { Emitters } from '../../../emmiters/emitters';
@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrl: './user-login.component.css',
})
export class UserLoginComponent implements OnInit {
  form!: FormGroup;
  isSubmitted = false;

  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      email: ['', Validators.required, Validators.email],
      password: ['', Validators.required],
    });

    this.http.get('user',{withCredentials:true}).subscribe({
      next:()=>{
        this.router.navigate(['/']);
        Emitters.authEmitter.emit(true);
      },
      error:()=>{
        this.router.navigate(['user/login']);
        Emitters.authEmitter.emit(false);
      }

      
    })
  }

  get f() {
    return this.form.controls;
  }

  onSubmit(): void {
    this.isSubmitted = true;

    if (hasFormErrors(this.form)) {
      Swal.fire(
        'Check Inputs',
        'Enter all input fields fields properly',
        'warning'
      );
    } else {
      const user = this.form.getRawValue();
      this.http.post('user/login', user, { withCredentials: true }).subscribe({
        next: () => {
          localStorage.setItem('isUserLoggedIn', 'true');
          this.router.navigate(['/']);
        },
        error: (err) => {
          Swal.fire('Error', err.error.message, 'error');
        },
      });
    }
  }
}
