import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class GetAllProductsService {

  constructor(private http: Http, private authService: AuthService) { }

  getAllProducts() {
    return this.http.get(`http://localhost:8080/products`, this.authService.getHeaders());
  }
}
