import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { LoginService } from '../services/login.service';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private loginService: LoginService, 
              private authService: AuthService, 
              private router: Router) { }

  @ViewChild('form') loginForm: NgForm;
 
  currentEmployee : {
    'employeeCashDrawer': number,
    'employeeId': number,
    'employeeName': string,
    'employeePassword': string,
    'token': string
  };

  isCashDrawerAmountNeagtive = false;
  isLoginSuccessful = true;

  ngOnInit() {
  }

  onLogin() {
    const employeeId = this.loginForm.value.id;
    const employeePassword = this.loginForm.value.password;
    const employeeCashDrawer = this.loginForm.value.cashDrawer;
    if(employeeCashDrawer < 0) {
      this.isCashDrawerAmountNeagtive = true;
      return;
    }
    const employee : {'employeeId': string, 'employeePassword': string, 'employeeCashDrawer': number} = {
      'employeeId': employeeId,
      'employeePassword': employeePassword,
      'employeeCashDrawer': employeeCashDrawer
    };

    this.loginService.employeeLogin(employee).subscribe(
      (response) => {
        this.currentEmployee = response.json();
        this.loginService.setLoggedInEmployee(this.currentEmployee);
        this.authService.setAuthToken(this.currentEmployee.token);
        this.isLoginSuccessful = true;
      },
      (error) => {
        console.log(error);
        this.isLoginSuccessful = false;
      },
      () => {
        this.router.navigate([`employees/${employeeId}/home`])
      }
    );
  }
}
