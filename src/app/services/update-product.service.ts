import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { Http } from '@angular/http';

@Injectable({
  providedIn: 'root'
})
export class UpdateProductService {

  constructor(private http: Http, private authService: AuthService) { }

  updateProduct(productCode:string, selectedProduct: {
                                            'productName': string,
                                            'productStock': number,
                                            'productUnitPrice': number,
                                            'productDescription': string }) {

      return this.http.put(`http://localhost:8080/products/${productCode}`, 
                                selectedProduct, this.authService.getHeaders());
  }
}
