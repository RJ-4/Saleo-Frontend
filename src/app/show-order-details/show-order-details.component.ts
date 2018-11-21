import { Component, OnInit } from '@angular/core';
import { ShowOrderDetailsService } from '../services/show-order-details.service';
import { LoginService } from '../services/login.service';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-show-order-details',
  templateUrl: './show-order-details.component.html',
  styleUrls: ['./show-order-details.component.css']
})
export class ShowOrderDetailsComponent implements OnInit {

  employeeId: number;
  orderId: number;
  isOrderIdLoaded: Promise<boolean>;
  selectedOrder;
  isOrderIdInvalid = false;
  isSelectedOrderLoaded: Promise<boolean>;

  constructor(private showOrderDetailsService: ShowOrderDetailsService,
              private loginService: LoginService,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.employeeId = +window.localStorage.getItem(this.loginService.getLoggedInEmployeeIdKey());

    this.route.params
              .subscribe((params: Params) => {
                this.orderId = params['orderId'];
                this.isOrderIdLoaded = Promise.resolve(true);
              });

    this.showOrderDetailsService.getOrderDetails(this.employeeId, this.orderId)
                                .subscribe((response) => {
                                  console.log(response.json());
                                  this.selectedOrder = response.json();  
                                  this.isSelectedOrderLoaded = Promise.resolve(true);
                                },
                                (error) => this.isOrderIdInvalid = true
                                );
  }

}
