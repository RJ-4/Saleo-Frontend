import { Component, OnInit } from '@angular/core';
import { EmployeesLastOrderService } from 'src/app/services/employees-last-order.service';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-last-order',
  templateUrl: './last-order.component.html',
  styleUrls: ['./last-order.component.css']
})
export class LastOrderComponent implements OnInit {

  constructor(private employeesLastOrderService: EmployeesLastOrderService,
              private loginService: LoginService) { }

  lastOrder;

  isLastOrderLoaded: Promise<boolean>;

  ngOnInit() {
    const employeeId = window.localStorage
                             .getItem(this.loginService.getLoggedInEmployeeIdKey());
    this.employeesLastOrderService.getLoggedInEmployeesLastOrder(+employeeId)
                                  .subscribe((response) => {
                                    console.log(response.json());
                                    this.lastOrder = response.json();
                                    this.isLastOrderLoaded = Promise.resolve(true);
                                  });
    
  }

}
