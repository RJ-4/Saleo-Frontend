import { Component, OnInit } from '@angular/core';
import { PaymentService } from 'src/app/services/payment.service';
import { LoginService } from 'src/app/services/login.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { GetProductsInCartService } from 'src/app/services/get-products-in-cart.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {

  modeOfPayment: string;
  orderStatus: string;
  employeeId: number;
  customerId: string;
  productCode = ['0'];
  orderId = [0];
  productsInCart: any[];
  areProductsInCartLoaded: Promise<boolean>;
  subtotal = 0;
  totalTax = 0;
  grandTotal = 0;

  constructor(private paymentService: PaymentService,
              private loginService: LoginService,
              private router: Router,
              private route: ActivatedRoute,
              private getProductsInCartService: GetProductsInCartService) { }

  ngOnInit() {
    let i: number;
    this.employeeId = +window.localStorage.getItem(this.loginService.getLoggedInEmployeeIdKey());
    this.route.params
              .subscribe((params: Params) => {
                this.customerId = params['customerId'];
              });
              this.getProductsInCartService.getProductsInCart(this.customerId)
              .subscribe((response) => {
                this.productsInCart = response.json();
                console.log(response.json());
                for(i = 0; i < this.productsInCart.length; i++) {
                  this.subtotal = this.subtotal + this.productsInCart[i].productCost;
                  this.totalTax = this.totalTax + (this.productsInCart[i].productQuantity * 10);
                  this.grandTotal = this.subtotal + this.totalTax;
                  this.productCode.push(this.productsInCart[i].product.productCode);
                  this.orderId.push(this.productsInCart[i].orderId);
                }
                this.productCode.shift();
                this.orderId.shift();
                this.areProductsInCartLoaded = Promise.resolve(true);
              });
}

  onClickPlaceOrder() {
    let i: number;
    this.orderStatus = "Completed";
    
    if((<HTMLInputElement>document.getElementById('Cash')).checked){
      this.modeOfPayment = 'Cash';
    } else {
      this.modeOfPayment = "Card";
    }

    for(i = 0; i < this.productsInCart.length; i++) {
      this.productsInCart[i].orderStatus = "Completed";
      this.productsInCart[i].modeOfPayment = this.modeOfPayment;
      
      this.paymentService.saveOrPlaceOrder(this.employeeId,
                                            this.customerId,
                                            this.productCode[i],
                                            this.orderId[i],
                                            this.productsInCart[i])
                         .subscribe();
    }
  }

  onClickSaveOrder() {
    let i: number;
    this.orderStatus = "Saved for Later";
    
    if((<HTMLInputElement>document.getElementById('Cash')).checked){
      this.modeOfPayment = 'Cash';
    } else {
      this.modeOfPayment = "Card";
    }

    for(i = 0; i < this.productsInCart.length; i++) {
      this.productsInCart[i].orderStatus = "Saved for Later";
      this.productsInCart[i].modeOfPayment = this.modeOfPayment;
      this.paymentService.saveOrPlaceOrder(this.employeeId,
                                            this.customerId,
                                            this.productCode[i],
                                            this.orderId[i],
                                            this.productsInCart[i])
                          .subscribe();
    }
  }

  redirectToHome() {
    this.router.navigate([`/employees/${this.employeeId}/home`]);
  }
}
