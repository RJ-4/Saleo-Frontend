import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class ShowOrderDetailsService {

  constructor(private http: Http, private authService: AuthService) { }

  getOrderDetails(employeeId: number, orderId: number) {
    return this.http.get(`http://localhost:8080/employees/${employeeId}/orders/${orderId}`, 
                              this.authService.getHeaders());
  }
}
