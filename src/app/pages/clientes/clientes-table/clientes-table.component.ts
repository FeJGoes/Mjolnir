import {AfterViewInit, Component, ViewChild} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import {MatTableDataSource} from '@angular/material/table';
import { Title } from '@angular/platform-browser';
import { Cliente } from 'src/app/models/cliente.model';
import { ClientesService } from 'src/app/services/clientes.service';


@Component({
  selector: 'app-clientes-table',
  templateUrl: './clientes-table.component.html',
  styleUrls: ['./clientes-table.component.scss']
})
export class ClientesTableComponent implements AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  clientes ?:Cliente[] = []
  dataSource = new MatTableDataSource<Cliente>(this.clientes);
  displayedColumns: string[] = ['id', 'nome', 'email', 'telefone', 'cidade', 'estado', 'planos', 'operacoes'];

  constructor(
    private tabTitle :Title,
    private clientesService :ClientesService,
    private snackBar :MatSnackBar,
  ) {
    this.tabTitle.setTitle('Clientes - Desafio Órigo')
    this.clientesService.all().subscribe((clientes :any) => {
      this.dataSource.data = clientes
      console.log(clientes)
    })
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  destroyCliente(id :number) {

    this.clientesService.destroy(id)
        .subscribe((response :any) => {
          this.snackBar.open('Cliente apagado com sucesso!', 'x', {
            duration: 3000
          })
          setTimeout(() => {
            window.location.reload()
          }, 3000)
        }, errorResponse => {
            if(errorResponse.status === 403) {
              this.snackBar.open(errorResponse.error?.message, '', {
                duration: 3000
              })
            }
        })
  }


}
