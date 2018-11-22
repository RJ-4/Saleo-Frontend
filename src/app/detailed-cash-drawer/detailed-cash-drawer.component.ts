import { Component, OnInit } from '@angular/core';
import { ShowOrdersService } from '../services/show-orders.service';
import { LoginService } from '../services/login.service';
import { Router, ActivatedRoute } from '@angular/router';
import { GetCashOrdersService } from '../services/get-cash-orders.service';

@Component({
  selector: 'app-detailed-cash-drawer',
  templateUrl: './detailed-cash-drawer.component.html',
  styleUrls: ['./detailed-cash-drawer.component.css']
})
export class DetailedCashDrawerComponent implements OnInit {

  constructor(private loginService: LoginService,
    private getCashOrdersService: GetCashOrdersService) { }

employeeId: number;
orders: any[];
areOrdersNotFetched = false;
areOrdersLoaded: Promise<boolean>;
startingCashDrawerBalance: number;
closingCashDrawer: number;
isCashDrawerLoaded: Promise<boolean>;
currentPageNo = 1;

ngOnInit() {
this.employeeId = +window.localStorage.getItem(this.loginService.getLoggedInEmployeeIdKey());
this.startingCashDrawerBalance = +window.localStorage.getItem(this.loginService.getLoggedInEmployeeCashDrawerKey());

this.loginService.getCurrentEmployee()
                 .subscribe((response) => {
                   this.closingCashDrawer = response.json().employeeCashDrawer;
                   this.isCashDrawerLoaded = Promise.resolve(true);
                 });
this.getCashOrdersService.getOrders(this.employeeId)
                .subscribe((response) => {
                  this.orders = response.json();
                  this.areOrdersLoaded = Promise.resolve(true);
                },
                (error) => {
                  this.areOrdersNotFetched = true;
                  console.log(error);
                });
}

}
