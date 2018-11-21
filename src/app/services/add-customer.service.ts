import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AddCustomerService {

  constructor(private http: Http, private authService: AuthService) { }

  addNewCustomer(newCustomer: {
                                'customerName': string,
                                'customerEmailId': string,
                                'customerMobileNo': string
                              }) {

      return this.http.post(`http://localhost:8080/customers`,
                                    newCustomer, this.authService.getHeaders());
  }
}
