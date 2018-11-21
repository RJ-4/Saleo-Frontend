import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class DeleteSavedForLaterOrderService {

  constructor(private http: Http, private authService: AuthService) { }

  deleteOrder(orderId: number) {
    return this.http.delete(`http://localhost:8080/orders/saved-for-later/${ orderId }`,
                              this.authService.getHeaders());
  }
}
