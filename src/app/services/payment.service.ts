import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  constructor(private http: Http, private authService: AuthService) { }

  saveOrPlaceOrder(employeeId: number,
                   customerId: string, 
                   productCode: string, 
                   orderId: number,
                   newOrder: {
                          modeOfPayment: string, 
                          orderStauts: string
  }) {
    
    return this.http.put(`http://localhost:8080/employees/${employeeId}/customers/${customerId}/products/${productCode}/orders/${orderId}`, newOrder, this.authService.getHeaders());
  }
}
