import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class GetCashOrdersService {

  constructor(private http: Http, private authService: AuthService) { }

  getOrders(employeeId: number) {
    return this.http.get(`http://localhost:8080/employees/${ employeeId }/orders/cash`,
                            this.authService.getHeaders());
  }
}
