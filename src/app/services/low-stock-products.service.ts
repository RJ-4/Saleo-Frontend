import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class LowStockProductsService {

  constructor(private http: Http, private authService: AuthService) { }

  getLowStockProducts() {
    return this.http.get(`http://localhost:8080/products/low-stock`, 
                            this.authService.getHeaders());
  }
}
