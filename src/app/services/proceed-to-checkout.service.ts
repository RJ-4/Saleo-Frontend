import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class ProceedToCheckoutService {

  constructor(private http: Http, private authService: AuthService) { }

  updateProductQuantities(customerId: string, updatedProducts: any[] ) {

    return this.http.put(`http://localhost:8080/customers/${customerId}/cart/orders/checkout`,
                      updatedProducts, this.authService.getHeaders());
  }
}
