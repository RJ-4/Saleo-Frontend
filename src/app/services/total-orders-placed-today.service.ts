import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class TotalOrdersPlacedTodayService {

  constructor(private http: Http, private authService: AuthService) { }

  getTotalOrdersPlacedTodayByLoggedInEmployee(employeeId: number) {
    return this.http.get(`http://localhost:8080/employees/${employeeId}/total-orders-today`, 
                            this.authService.getHeaders());
  }
}
