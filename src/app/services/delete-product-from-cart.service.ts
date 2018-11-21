import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class DeleteProductFromCartService {

  constructor(private http: Http, private authService: AuthService) { }

  removeProduct(customerId: string, orderId: number) {
    return this.http.delete(`http://localhost:8080/customers/${customerId}/cart/orders/${orderId}`,
                        this.authService.getHeaders());
  }
}
