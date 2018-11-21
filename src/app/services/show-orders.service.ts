import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class ShowOrdersService {

  constructor(private http: Http, private authService: AuthService) { }

  getLoggedInEmployeesOrders(employeeId: number) {
    return this.http.get(`http://localhost:8080/employees/${ employeeId }/orders`, 
                              this.authService.getHeaders());
  } 
}
