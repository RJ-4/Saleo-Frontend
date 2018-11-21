import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class GetLoggedInEmployeeService {

  constructor(private http: Http, private autService: AuthService) { }

  getLoggedInEmployee(employeeId: number) {
    return this.http.get(`http://localhost:8080/employees/${employeeId}`,
                            this.autService.getHeaders());
  }
}
