import { Component, OnInit, ViewChild, SimpleChanges } from '@angular/core';
import { GetLoggedInEmployeeService } from '../services/get-logged-in-employee.service';
import { LoginService } from '../services/login.service';
import { NgForm } from '@angular/forms';
import { UpdateEmployeeService } from '../services/update-employee.service';

@Component({
  selector: 'app-update-profile',
  templateUrl: './update-profile.component.html',
  styleUrls: ['./update-profile.component.css']
})
export class UpdateProfileComponent implements OnInit {

  @ViewChild('form') updateEmployeeProfileForm: NgForm;

  employeeId: number;
  loggedInEmployee: {
      employeeCashDrawer?: number,
      employeeId: number,
      employeeName: string,
      employeePassword: string,
      token?: string
  };

  isEmployeeUpdated = false;
  confirmPassword: string;
  isLoggedInEmployeeLoaded: Promise<boolean>;
  isInvalidEmployeeId = false;
  isPasswordsDontMatch = false;
  isUpdationLoaded: Promise<boolean>;

  constructor(private getLoggedInEmployeeService: GetLoggedInEmployeeService,
              private loginService: LoginService,
              private updateEmployeeService: UpdateEmployeeService) { }

  
  ngOnInit() {
    this.isEmployeeUpdated = false;
    this.isInvalidEmployeeId = false;
    this.isPasswordsDontMatch = false;
    this.employeeId = +window.localStorage.getItem(this.loginService.getLoggedInEmployeeIdKey());
    this.getLoggedInEmployeeService.getLoggedInEmployee(this.employeeId)
                                   .subscribe((response) => {
                                     this.loggedInEmployee = response.json();
                                     this.confirmPassword = this.loggedInEmployee.employeePassword;
                                     this.isLoggedInEmployeeLoaded = Promise.resolve(true);
                                    },
                                    (error) => {
                                      this.isInvalidEmployeeId = true;
                                      console.log(error);
                                    }
                                    );
    

  }

  onUpdate() {
    this.isEmployeeUpdated = false;
    this.isInvalidEmployeeId = false;
    this.isPasswordsDontMatch = false;
    if(this.updateEmployeeProfileForm.value.employeePassword !== this.updateEmployeeProfileForm.value.confirmPassword) {
      this.isPasswordsDontMatch = true;
      return;
    }

    const updatedEmployee = {
      employeeName: this.loggedInEmployee.employeeName,
      employeePassword: this.loggedInEmployee.employeePassword
    };
    
    this.updateEmployeeService.updateEmployee(this.employeeId, updatedEmployee)
                              .subscribe((response) => {
                                this.isEmployeeUpdated = true;
                                this.isUpdationLoaded = Promise.resolve(true);
                              },
                              (error) => {
                                this.isInvalidEmployeeId = true;
                                console.log(error);
                              }
                              );

    
  }

}
