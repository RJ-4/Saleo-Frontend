import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { Http } from '@angular/http';

@Injectable({
  providedIn: 'root'
})
export class UpdateEmployeeService {

  constructor(private http: Http, private authService: AuthService) { }

  updateEmployee(employeeId: number, updatedEmployee: {
                                                employeeName: string,
                                                employeePassword: string
                                              }) {

      return this.http.put(`http://localhost:8080/employees/${employeeId}/profile/update`,
                              updatedEmployee, this.authService.getHeaders());
  }
}
