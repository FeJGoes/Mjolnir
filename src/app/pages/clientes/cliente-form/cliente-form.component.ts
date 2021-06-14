import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { Plano } from 'src/app/models/plano.model';
import { ClientesService } from 'src/app/services/clientes.service';
import { PlanosService } from 'src/app/services/planos.service';

@Component({
  selector: 'app-cliente-form',
  templateUrl: './cliente-form.component.html',
  styleUrls: ['./cliente-form.component.scss']
})
export class ClienteFormComponent implements OnInit {
  public clienteForm = new FormGroup({
    nome: new FormControl('',[Validators.required, Validators.minLength(3)]),
    email: new FormControl('',[Validators.required, Validators.email]),
    senha: new FormControl('',[Validators.required, Validators.minLength(8)]),
    cidade: new FormControl('',[Validators.required]),
    telefone: new FormControl('',[Validators.required]),
    estado: new FormControl('',[Validators.required]),
    data_nascimento: new FormControl('',[]),
    planos: new FormControl('',[Validators.required]),
  });

  public telefoneMask = ['(',/\d/, /\d/, ')',' ', /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/];

  public isEditMode :boolean = false

  public id !: number;

  public hide = true;

  public planos :Plano[] = [];

  public estados = [
    {uf :'AC',nome: 'Acre' },
    {uf :'AL',nome: 'Alagoas' },
    {uf :'AM',nome: 'Amazonas' },
    {uf :'AP',nome: 'Amapá' },
    {uf :'BA',nome: 'Bahia' },
    {uf :'CE',nome: 'Ceará' },
    {uf :'DF',nome: 'Distrito Federal' },
    {uf :'ES',nome: 'Espírito Santo' },
    {uf :'GO',nome: 'Goiás' },
    {uf :'MA',nome: 'Maranhão' },
    {uf :'MG',nome: 'Minas Gerais' },
    {uf :'MS',nome: 'Mato Grosso do Sul' },
    {uf :'MT',nome: 'Mato Grosso' },
    {uf :'PA',nome: 'Pará' },
    {uf :'PB',nome: 'Paraíba' },
    {uf :'PE',nome: 'Pernambuco' },
    {uf :'PI',nome: 'Piauí' },
    {uf :'PR',nome: 'Paraná' },
    {uf :'RJ',nome: 'Rio de Janeiro' },
    {uf :'RN',nome: 'Rio Grande do Norte' },
    {uf :'RO',nome: 'Rondônia' },
    {uf :'RR',nome: 'Roraima' },
    {uf :'RS',nome: 'Rio Grande do Sul' },
    {uf :'SC',nome: 'Santa Catarina' },
    {uf :'SE',nome: 'Sergipe' },
    {uf :'SP',nome: 'São Paulo' },
    {uf :'TO',nome: 'Tocantins'},
  ]

  constructor(
    private tabTitle :Title,
    private router :Router,
    private activatedRoute :ActivatedRoute,
    private clientesService :ClientesService,
    public planosService :PlanosService,
    private snackBar :MatSnackBar,
  ) { }

  ngOnInit(): void {
    this.tabTitle.setTitle(`Cadastrar - Cliente - Desafio Órigo`)

    this.planosService.all().subscribe((planos :any) => {
      this.planos = planos
    })

    this.id = Number(this.activatedRoute.snapshot.params['id'])

    if(this.id) {
      this.isEditMode = true
      this.clientesService.show(this.id).subscribe((response :any) => {
        let data = response
        let dateArray = response.data_nascimento.split('/').reverse()
        let dateObj = new Date(dateArray)
        data.data_nascimento = dateObj

        data.planos = response.planos.map((plano :any) => plano.id)

        this.clienteForm.patchValue(data)
        this.tabTitle.setTitle(`Editar - Cliente - Desafio Órigo`)
      })
    }
  }

  onSubmit(): void {
    if(this.isEditMode) {
      this.clienteForm.controls['senha'].disable()
    }

    console.log(this.clienteForm.value)

    if(this.clienteForm.valid) {
      if(this.clienteForm.controls['data_nascimento'].value != '') {
        this.clienteForm.controls['data_nascimento'].setValue(this.formatDate(this.clienteForm.controls['data_nascimento'].value))
      } else {
        this.clienteForm.controls['data_nascimento'].disable()
      }

      if(!this.isEditMode){
        this.clientesService.store(this.clienteForm.value, this.isRoute('registrar'))
            .subscribe((response :any) => {
              this.snackBar.open('Cliente criado com sucesso!', '', {
                duration: 3000
              })
              setTimeout(() => {
                this.isRoute('registrar')
                  ? this.router.navigate(['/login'])
                  : this.router.navigate(['/clientes'])
              }, 3000)
            }, error => this.handleErrorResponse(error))
      } else {
        this.clientesService.update(this.id, this.clienteForm.value)
            .subscribe((response :any) => {
              this.snackBar.open('Cliente alterado com sucesso!', '', {
                duration: 3000
              })
              setTimeout(() => {
                this.router.navigate(['/clientes'])
              }, 3000)
            }, error => this.handleErrorResponse(error))
      }

    }
  }

  formatDate(date: Date) {
    return `${date.getFullYear()}-${String(date.getMonth()).padStart(2,'0')}-${String(date.getDate()).padStart(2,'0')}`
  }

  handleErrorResponse(response :HttpErrorResponse) {
    if(response.status === 422) {
      this.snackBar.open(response.error?.message, 'x', {
        duration: 3000
      })

      if(response.error?.errors) {
        for (const key in response.error?.errors) {
          this.clienteForm.controls[key].setErrors({api: true, message: response.error?.errors[key][0]})
        }
      }
    }
  }

  isRoute(route: string) {
    return this.router.url.includes(route);
  }

}
