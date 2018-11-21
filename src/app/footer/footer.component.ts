import { Component, OnInit } from '@angular/core';
import { LoginService } from '../services/login.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  loggedInEmployee : {
    'employeeCashDrawer': number,
    'employeeId': number,
    'employeeName': string,
    'employeePassword'?: string,
    'token'?: string
  };

  isEmployeeLoggedIn: Promise<boolean>;

  constructor(private loginService: LoginService) { }

  ngOnInit() {
    this.loggedInEmployee = this.loginService.getLoggedInEmployee();

    // if(this.loggedInEmployee) {
    //   this.isEmployeeLoggedIn = Promise.resolve(true);
    // }

  }

}
