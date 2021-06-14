import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Cliente } from 'src/app/models/cliente.model';
import { ApiService } from 'src/app/services/api.service';
import { AuthService } from 'src/app/services/auth.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ClientesService extends ApiService {

  constructor(
    public http :HttpClient,
    public router :Router,
    public authService :AuthService,
  ) {
    super(authService)
  }

  store(data :Cliente, open :boolean = false) {
    if(open){
      return this.http.post(`${this.apiBaseUrl}/registrar`, data, this.apiHeaders)
    }

    return this.http.post(`${this.apiBaseUrl}/clientes`, data, this.apiHeadersWithAuth)
  }

  all() {
    return this.http.get(`${this.apiBaseUrl}/clientes`, this.apiHeadersWithAuth)
  }

  show(id :number) {
    return this.http.get(`${this.apiBaseUrl}/clientes/${id}`, this.apiHeadersWithAuth)
  }

  update(id :number, data :Cliente) {
    return this.http.patch(`${this.apiBaseUrl}/clientes/${id}`, data, this.apiHeadersWithAuth)
  }

  destroy(id :number) {
    return this.http.delete(`${this.apiBaseUrl}/clientes/${id}`, this.apiHeadersWithAuth)
  }
}
