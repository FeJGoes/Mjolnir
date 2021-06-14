import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

interface Credencials {
  email :string,
  senha :string
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  protected apiBaseUrl = environment.apiBaseUrl

  private static readonly TOKEN_KEY = 'token'

  private static readonly TIME_TO_LEAVE = 'ttl'

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
      Authorization: `Bearer ${this.getToken()}`,
    }
  }

  constructor(
    public http :HttpClient,
    public router :Router,
  ) {}

  public attempt(credencials :Credencials) {
    return this.http.post(`${this.apiBaseUrl}/entrar`, credencials, this.apiHeaders)
  }

  public signOut() {
    this.http.delete(`${this.apiBaseUrl}/sair`, this.apiHeadersWithAuth)
        .subscribe((response :any) => {
          this.destroySession()
          this.router.navigate(['login'])
        }, error => {
          console.log(error)
        })
  }

  public isAuthenticaded(): boolean {
    if(!this.isTimedOutSession() && this.tokenExists()) {
      return true
    }

    return false
  }

  public isTimedOutSession() {
    return new Date().getTime() > this.getTimeToLeave().getTime()
  }

  public destroySession(): void {
    window.localStorage.clear();
  }

  public storeTimeToLeave(time: number): void {
    let now = new Date()
    let ttl = now.setMinutes(now.getMinutes() + (time ?? 60))

    window.localStorage.removeItem(AuthService.TIME_TO_LEAVE);
    window.localStorage.setItem(AuthService.TIME_TO_LEAVE, String(ttl));
  }

  public getTimeToLeave(): Date {
    return new Date(Number(window.localStorage.getItem(AuthService.TIME_TO_LEAVE))) ?? new Date();
  }

  public storeToken(token: string): void {
    window.localStorage.removeItem(AuthService.TOKEN_KEY);
    window.localStorage.setItem(AuthService.TOKEN_KEY, token);
  }

  public getToken(): string | null {
    return window.localStorage.getItem(AuthService.TOKEN_KEY);
  }

  public tokenExists(): boolean {
    return this.getToken() !== null;
  }
}
