import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  protected apiBaseUrl = environment.apiBaseUrl

  apiHeaders = {
    headers: {
      Accept : 'application/json',
      'Access-Control-Allow-Origin' : '*',
      'Access-Control-Allow-Headers' : '*',
    }
  }

  apiHeadersWithAuth = {
    headers: {
      Accept : 'application/json',
      'Access-Control-Allow-Origin' : '*',
      'Access-Control-Allow-Headers' : '*',
      Authorization: `Bearer ${this.authService.getToken()}`,
    }
  }

  constructor(
    protected authService :AuthService,
  ) { }


}
