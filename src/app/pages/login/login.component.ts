import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { HttpErrorResponse } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public loginForm = new FormGroup({
    email: new FormControl('',[Validators.required, Validators.email]),
    senha: new FormControl('',[Validators.required, Validators.minLength(8)]),
  });
  public errorMessage ?:string


  constructor(
    private tabTitle :Title,
    private authService :AuthService,
    private router :Router,
    private snackBar :MatSnackBar,

  ) { }

  ngOnInit(): void {
      this.tabTitle.setTitle('Entrar - Desafio Órigo')
  }

  onSubmit() {
    if(this.loginForm.valid) {
      this.authService.attempt(this.loginForm.value)
          .subscribe((response :any) => {

            this.authService.storeToken(response.token)
            this.authService.storeTimeToLeave(response.expire_in)
            console.log(response)

            this.router.navigate(['home'])
          }, error => {
            this.handleErrorResponse(error)
          })
    }
  }

  handleErrorResponse(response :HttpErrorResponse) {
    if(response.status === 422) {
      if(response.error?.errors) {
        for (const key in response.error?.errors) {
          this.loginForm.controls[key].setErrors({api: true, message: response.error?.errors[key][0]})
        }
      }
    }

    if(response.status === 401) {
      this.snackBar.open(response.error?.message,'', {
        duration: 3000
      })
    }
  }
}
