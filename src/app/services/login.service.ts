import { Injectable } from '@angular/core';
import { Http } from '@angular/http'
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: Http,
              private authService: AuthService) { }

  id: number;

  loggedInEmployeeNameKey = "logged-in-employee-name";
  loggedInEmployeeIdKey = "logged-in-employee-id";
  loggedInEmployeeCashDrawerKey = "logged-in-employee-cash-drawer";

  getLoggedInEmployeeNameKey() {
    return this.loggedInEmployeeNameKey;
  }

  getLoggedInEmployeeIdKey() {
    return this.loggedInEmployeeIdKey;
  }

  getLoggedInEmployeeCashDrawerKey() {
    return this.loggedInEmployeeCashDrawerKey;
  }

  loggedInEmployee: {
    'employeeCashDrawer': number,
    'employeeId': number,
    'employeeName': string,
    'employeePassword'?: string,
    'token'?: string
  };

  employeeLogin(employee: {employeeId: string, employeePassword: string, employeeCashDrawer: number}){
    this.id = +employee.employeeId;
    return this.http.post("http://localhost:8080/employees/login", employee);
  }

  setLoggedInEmployee(loggedInEmployee: {
                          'employeeCashDrawer': number,
                          'employeeId': number,
                          'employeeName': string,
                          'employeePassword': string,
                          'token': string
                      }) {

      window.localStorage.setItem(this.getLoggedInEmployeeNameKey(), loggedInEmployee.employeeName);
      window.localStorage.setItem(this.getLoggedInEmployeeIdKey(), "" + loggedInEmployee.employeeId);
      window.localStorage.setItem(this.getLoggedInEmployeeCashDrawerKey(), "" +  loggedInEmployee.employeeCashDrawer);
  }


  getLoggedInEmployee() {
    return this.loggedInEmployee= {
      'employeeCashDrawer': +window.localStorage.getItem(this.getLoggedInEmployeeCashDrawerKey()),
      'employeeId': +window.localStorage.getItem(this.getLoggedInEmployeeIdKey()),
      'employeeName': window.localStorage.getItem(this.getLoggedInEmployeeNameKey())
    }
  }

  getCurrentEmployee() {
    const employeeId = window.localStorage.getItem(this.getLoggedInEmployeeIdKey());
    return this.http.get(`http://localhost:8080/employees/${employeeId}`, 
                            this.authService.getHeaders());
  }
}
