import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class EmptyCartService {

  constructor(private http: Http, private authService: AuthService) { }

  emptyCart(customerId: string){
    return this.http.delete(`http://localhost:8080/customers/${customerId}/orders`, 
                        this.authService.getHeaders());
  }
}
