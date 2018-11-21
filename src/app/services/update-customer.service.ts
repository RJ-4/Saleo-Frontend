import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class UpdateCustomerService {

  constructor(private http: Http, private authService: AuthService) { }

  updateCustomer(customerId: string, updatedCustomer: {
                                      "customerName": string,
                                      "customerEmailId": string,
                                      "customerMobileNo": string 
  }) {

    return this.http.put(`http://localhost:8080/customers/${customerId}`, 
                            updatedCustomer, this.authService.getHeaders());
  }
}