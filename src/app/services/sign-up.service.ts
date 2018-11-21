import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

@Injectable({
  providedIn: 'root'
})
export class SignUpService {

  constructor(private http: Http) { }

  addNewEmployee(newEmployee: {employeeName: string, employeePassword: string}) {
    return this.http.post('http://localhost:8080/employees', newEmployee);
  }
}
