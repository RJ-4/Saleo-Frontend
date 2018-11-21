import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class SearchCustomerService {

  constructor(private http: Http, private authService: AuthService) { }

  searchCustomer(searchParam) {
    return this.http.get(`http://localhost:8080/customers/${searchParam}`, this.authService.getHeaders());
  }
}
