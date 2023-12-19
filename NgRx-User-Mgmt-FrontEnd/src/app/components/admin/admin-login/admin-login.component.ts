import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { hasFormErrors } from '../../../helpers/form.validation.helper';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrl: './admin-login.component.css',
})
export class AdminLoginComponent implements OnInit {
  form!: FormGroup;
  isSubmitted = false;

  constructor(private formbuilder: FormBuilder,private http:HttpClient,private router:Router) {}

  ngOnInit(): void {
    this.form = this.formbuilder.group({
      email:['',Validators.required,Validators.email],
      password:['',Validators.required]
    })
  }

  get f(){
    return this.form.controls
  }


  onSubmit():void{
    this.isSubmitted = true

    if(hasFormErrors(this.form)){
       Swal.fire(
         'Check Inputs',
         'Enter all input fields fields properly',
         'warning'
       );
    }
    else{
      const admin = this.form.getRawValue()
      console.log(admin);
      this.http.post('admin/login','admin',{withCredentials:true}).subscribe({
        next:()=>{
          localStorage.setItem('isAdminLoggedIn','true')
          this.router.navigate(['/admin/dashboard'])
        },
        error:(err)=>{
          Swal.fire('error',err.error.message,"error")
        }
      })
    }

  }






}
