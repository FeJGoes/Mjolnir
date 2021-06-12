import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class TokenStorageService {
  /**
   * Chave do token na session
   */
  private static readonly TOKEN_KEY = 'token'

  /**
   * Chave do usuário autenticado na session
   */
  private static readonly USER_KEY = 'auth_user'

  constructor() { }

  signOut(): void {
    window.sessionStorage.clear();
  }

  public saveToken(token: string): void {
    window.sessionStorage.removeItem(TokenStorageService.TOKEN_KEY);
    window.sessionStorage.setItem(TokenStorageService.TOKEN_KEY, token);
  }

  public getToken(): string | null {
    return window.sessionStorage.getItem(TokenStorageService.TOKEN_KEY);
  }

  public saveUser(user: any): void {
    window.sessionStorage.removeItem(TokenStorageService.USER_KEY);
    window.sessionStorage.setItem(TokenStorageService.USER_KEY, JSON.stringify(user));
  }

  public getUser(): any {
    const user = window.sessionStorage.getItem(TokenStorageService.USER_KEY);
    if (user) {
      return JSON.parse(user);
    }

    return {};
  }
}
