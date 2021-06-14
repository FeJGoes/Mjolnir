import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from './api.service';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class PlanosService extends ApiService {

  constructor(
    public http :HttpClient,
    public router :Router,
    public authService :AuthService,
  ) {
    super(authService)
  }

  all() {
    return this.http.get(`${this.apiBaseUrl}/planos`, this.apiHeadersWithAuth)
  }
}
