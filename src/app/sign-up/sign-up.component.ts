import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { SignUpService } from '../services/sign-up.service';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { LoginService } from '../services/login.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  @ViewChild('form') signUpForm: NgForm;

  currentEmployee : {
    'employeeCashDrawer': number,
    'employeeId': number,
    'employeeName': string,
    'employeePassword': string,
    'token': string
  };
  arePasswordsMatching = true;
  isEmployeeLoggedIn: Promise<boolean>;

  constructor(private signUpService: SignUpService, 
              private authService: AuthService,
              private router: Router,
              private loginService: LoginService) { }

  ngOnInit() {
  }

  onSignUp() {
    const employeeName = this.signUpForm.value.employeeName;
    const employeePassword = this.signUpForm.value.password;
    const confirmPassword = this.signUpForm.value.confirmPassword;

    if(employeePassword !== confirmPassword) {
      this.arePasswordsMatching = false;
      return;
    }

    const newEmployee: {'employeeName': string, 'employeePassword': string} = {
      'employeeName': employeeName,
      'employeePassword': employeePassword
    }

    this.signUpService.addNewEmployee(newEmployee).subscribe(
      (response) => {
        this.currentEmployee = response.json();
        this.authService.setAuthToken(this.currentEmployee.token);
        this.arePasswordsMatching = true;
        this.isEmployeeLoggedIn = Promise.resolve(true);
      },
      (error) => console.log('Unable to register new employee!!!'),
      () => {
        this.loginService.setLoggedInEmployee(this.currentEmployee);
        this.router.navigate(['/home']);
      }      
    )    
  }
}
