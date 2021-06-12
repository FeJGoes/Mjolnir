import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public loginError: string = ''
  public loginForm = new FormGroup({
    email: new FormControl('',[Validators.required, Validators.email]),
    senha: new FormControl('',[Validators.required, Validators.minLength(8)]),
  });

  constructor(
    private tabTitle :Title,
  ) { }

  ngOnInit(): void {
      this.tabTitle.setTitle('Entrar - Desafio Órigo')
  }

  Error()

  onSubmit() {
    // if(this.loginForm.valid){
    //   this.apiService.login(this.loginForm.value).subscribe((data) => {
    //   console.log(data);
    //     if(data.status === 200 && !data.body.ErrorCode){
    //       this.router.navigate(['/dashboard']);
    //     }else{
    //       this.loginError = data.body.message;
    //     }
    //   }, error => this.loginError = error)
    // }
    console.log(this.loginError, this.loginForm);
  }

}
