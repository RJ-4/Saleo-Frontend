import { Component, OnInit } from '@angular/core';
import { ShowOrderDetailsService } from '../services/show-order-details.service';
import { LoginService } from '../services/login.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { DeleteSavedForLaterOrderService } from '../services/delete-saved-for-later-order.service';
import { AddToCartService } from '../services/add-to-cart.service';

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
              private route: ActivatedRoute,
              private deleteSavedForLaterOrderService: DeleteSavedForLaterOrderService,
              private addToCartService: AddToCartService,
              private router: Router) { }

  ngOnInit() {
    this.employeeId = +window.localStorage.getItem(this.loginService.getLoggedInEmployeeIdKey());

    this.route.params
              .subscribe((params: Params) => {
                this.orderId = params['orderId'];
                this.isOrderIdLoaded = Promise.resolve(true);
              });

    this.showOrderDetailsService.getOrderDetails(this.employeeId, this.orderId)
                                .subscribe((response) => {
                                  this.selectedOrder = response.json();  
                                  this.isSelectedOrderLoaded = Promise.resolve(true);
                                },
                                (error) => this.isOrderIdInvalid = true
                                );
  }

  onClickMoveToCart() {
    this.addToCartService.addToCart(this.employeeId, 
                                    this.selectedOrder.customer.customerId,
                                    this.selectedOrder.product.productCode)
                         .subscribe();

    this.deleteSavedForLaterOrderService.deleteOrder(this.selectedOrder.orderId)
                                        .subscribe();
  }

  onClickModalCloseButton() {
    this.router.navigate([`/employees/${ this.employeeId }/orders`]);
  }

}
