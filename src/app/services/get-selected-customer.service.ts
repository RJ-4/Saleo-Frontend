import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { Http } from '@angular/http';

@Injectable({
  providedIn: 'root'
})
export class GetSelectedCustomerService {

  constructor(private http: Http, private authService: AuthService) { }
  
  getSelectedCustomer(customerId: string){
    return this.http.get(`http://localhost:8080/customers/${customerId}`,
                            this.authService.getHeaders());
  }
}
