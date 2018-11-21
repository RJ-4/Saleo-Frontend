import { Component, OnInit } from '@angular/core';
import { TotalOrdersPlacedTodayService } from 'src/app/services/total-orders-placed-today.service';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-total-orders-placed-today',
  templateUrl: './total-orders-placed-today.component.html',
  styleUrls: ['./total-orders-placed-today.component.css']
})
export class TotalOrdersPlacedTodayComponent implements OnInit {

  constructor(private totalOrdersPlacedTodayService: TotalOrdersPlacedTodayService,
              private loginService: LoginService) { }

  employeeId: number;
  totalOrdersPlacedTodayByLoggedInEmployee: number;
  areOrdersLoaded: Promise<boolean>;

  ngOnInit() {
    this.employeeId = +window.localStorage.getItem(this.loginService.getLoggedInEmployeeIdKey());
    this.totalOrdersPlacedTodayService
        .getTotalOrdersPlacedTodayByLoggedInEmployee(this.employeeId)
        .subscribe((response) => {
          this.totalOrdersPlacedTodayByLoggedInEmployee = response.json();
          this.areOrdersLoaded = Promise.resolve(true);
        });
  }

}
