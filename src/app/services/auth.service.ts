import { Injectable } from '@angular/core';
import { Headers } from '@angular/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
 
  constructor() { }

  getAuthKey() {
    return 'authUserToken';
  }

  getAuthToken() {
    const token = window.localStorage.getItem(this.getAuthKey());
    return token;
  }

  setAuthToken(token: string) {
    window.localStorage.setItem(this.getAuthKey(), token);
  }

  removeAuthToken() {
    window.localStorage.removeItem(this.getAuthKey());
  }
 
  isEmployeeLoggedIn() {
    if(this.getAuthToken()) {
      return true;
    } else {
      return false;
    }
  }

  getHeaders() {
    let headers = new Headers({
      'Content-Type': 'application/json',
      'Token': this.getAuthToken()
    });
    return {headers: headers};
  }
}
