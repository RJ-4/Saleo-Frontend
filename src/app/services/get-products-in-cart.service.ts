import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class GetProductsInCartService {

  constructor(private http: Http, private authService: AuthService) { }

  getProductsInCart(customerId: string) {
    return this.http.get(`http://localhost:8080/customers/${customerId}/cart`,
                                    this.authService.getHeaders());
  }
}
