import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-cash-drawer',
  templateUrl: './cash-drawer.component.html',
  styleUrls: ['./cash-drawer.component.css']
})
export class CashDrawerComponent implements OnInit {

  loggedInEmployee: {
    'employeeCashDrawer': number,
    'employeeId': number,
    'employeeName': string,
    'employeePassword'?: string,
    'token'?: string
  };

  constructor(private loginService: LoginService) { }

  ngOnInit() {
    this.loggedInEmployee = this.loginService.getLoggedInEmployee();
  }
}
