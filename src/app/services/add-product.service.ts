import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AddProductService {

  constructor(private http: Http, private authService: AuthService) { }

  addNewProduct(newProduct: {
                  productName: string, 
                  productDescription: string, 
                  productUnitPrice: number,
                  productStock: number}) {
  
    return this.http.post(`http://localhost:8080/products`, 
                            newProduct, this.authService.getHeaders());
  }
}
