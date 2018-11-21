import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class SearchProductService {

  constructor(private http: Http, private authService: AuthService) { }

  searchProduct(searchParam: string) {
    return this.http.get(`http://localhost:8080/products/${searchParam}`, this.authService.getHeaders());
  }
}
