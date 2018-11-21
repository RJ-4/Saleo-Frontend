import { Component, OnInit } from '@angular/core';
import { ShowOrdersService } from '../services/show-orders.service';
import { LoginService } from '../services/login.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-show-orders',
  templateUrl: './show-orders.component.html',
  styleUrls: ['./show-orders.component.css']
})
export class ShowOrdersComponent implements OnInit {

  constructor(private showOrdersService: ShowOrdersService,
              private loginService: LoginService,
              private router: Router,
              private route: ActivatedRoute) { }

  employeeId: number;
  orders: any[];
  areOrdersNotFetched = false;
  areOrdersLoaded: Promise<boolean>;

  ngOnInit() {
    this.employeeId = +window.localStorage.getItem(this.loginService.getLoggedInEmployeeIdKey());
    this.showOrdersService.getLoggedInEmployeesOrders(this.employeeId)
                          .subscribe((response) => {
                            this.orders = response.json();
                            this.areOrdersLoaded = Promise.resolve(true);
                          },
                          (error) => {
                            this.areOrdersNotFetched = true;
                            console.log(error);
                          });
  }

  viewOrderDetails(orderId: number) {
    this.router.navigate([orderId], {relativeTo: this.route});
  }

}
