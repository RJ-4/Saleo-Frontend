import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AddToCartService {

  constructor(private http: Http, private authService: AuthService) { }

  addToCart(employeeId: number, customerId: string, productCode: string) {
    return this.http.post(`http://localhost:8080/employees/${employeeId}/customers/${customerId}/products/${productCode}/orders`,
                            "", 
                            this.authService.getHeaders());
  }
}
