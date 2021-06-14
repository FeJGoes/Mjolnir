import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { ClientesService } from 'src/app/services/clientes.service';

@Component({
  selector: 'app-cliente-password-form',
  templateUrl: './cliente-password-form.component.html',
  styleUrls: ['./cliente-password-form.component.scss']
})
export class ClientePasswordFormComponent implements OnInit {
  public clienteForm = new FormGroup({
    senha: new FormControl('',[Validators.required, Validators.minLength(8), Validators.pattern('^(?=.*[A-Z])(?=.*[0-9]+)(?=.*[a-z])([A-Za-z0-9$@$!%*#?&]){8,}$')]),
    senha_confirmation: new FormControl('',[ Validators.required ])
  });

  public id !: number;

  public hideSenha = true;

  public hideSenhaConfirmation = true;

  constructor(
    private tabTitle :Title,
    private router :Router,
    private activatedRoute :ActivatedRoute,
    private clientesService :ClientesService,
    private snackBar :MatSnackBar,
  ) { }

  ngOnInit(): void {
    this.tabTitle.setTitle(`Troca de Senha - Cliente - Desafio Órigo`)
    this.id = Number(this.activatedRoute.snapshot.params['id'])
  }

  onSubmit() {
    if (this.senha.value === this.senha_confirmation.value) {
      this.senha_confirmation.setErrors(null);
    } else {
      this.senha_confirmation.setErrors({ mismatch: true });
    }

    if(this.clienteForm.valid) {
      this.clientesService.update(this.id, this.clienteForm.value)
            .subscribe((response :any) => {
              this.snackBar.open('Senha alterada com sucesso!', '', {
                duration: 3000
              })
              setTimeout(() => {
                this.router.navigate(['/clientes'])
              }, 3000)
            }, error => this.handleErrorResponse(error))
    }
  }

  get senha(): AbstractControl {
    return this.clienteForm.controls['senha'];
  }

  get senha_confirmation(): AbstractControl {
    return this.clienteForm.controls['senha_confirmation'];
  }

  handleErrorResponse(response :HttpErrorResponse) {
    if(response.status === 422) {
      this.snackBar.open(response.error?.message, '', {
        duration: 3000
      })

      if(response.error?.errors) {
        for (const key in response.error?.errors) {
          this.clienteForm.controls[key].setErrors({api: true, message: response.error?.errors[key][0]})
        }
      }
    }
  }

}
