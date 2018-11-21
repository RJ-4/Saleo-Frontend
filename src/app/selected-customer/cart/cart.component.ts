import { Component, OnInit } from '@angular/core';
import { GetProductsInCartService } from 'src/app/services/get-products-in-cart.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { DeleteProductFromCartService } from 'src/app/services/delete-product-from-cart.service';
import { EmptyCartService } from 'src/app/services/empty-cart.service';
import { LoginService } from 'src/app/services/login.service';
import { ProceedToCheckoutService } from 'src/app/services/proceed-to-checkout.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  customerId: string;
  employeeId: number;
  productsInCart: any[];
  areProductsLoaded: Promise<boolean>;
  isCartEmpty = false;
  isCustomerIdLoaded: Promise<boolean>;
  totalCostOfProduct = [0];
  productQuantity = [0];
  unitPriceOfEachProduct = [0];
  productStock = [0];
  subtotal = 0;
  totalTax = 0;
  grandTotal = 0;

  constructor(private getProductsInCartService: GetProductsInCartService,
              private route: ActivatedRoute,
              private deleteProductFromCartService: DeleteProductFromCartService,
              private emptyCartService: EmptyCartService,
              private router: Router,
              private loginService: LoginService,
              private proceedToCheckoutService: ProceedToCheckoutService) { }

  ngOnInit() {
    this.employeeId = +window.localStorage.getItem(this.loginService.getLoggedInEmployeeIdKey());
    let i: number;
    this.route.params
              .subscribe((params: Params) => {
                this.customerId = params['customerId'];
                this.isCustomerIdLoaded = Promise.resolve(true);
              });

    this.getProductsInCartService.getProductsInCart(this.customerId)
                                 .subscribe((response) => {
                                   this.productsInCart = response.json();
                                   if(response.json().length === 0){
                                     this.isCartEmpty = true;
                                   } else {
                                     this.isCartEmpty = false;
                                   }
                                   for(i = 0; i < this.productsInCart.length; i++) {
                                     this.productQuantity.push(this.productsInCart[i].productQuantity);
                                     this.totalCostOfProduct.push(this.productsInCart[i].productCost);
                                     this.unitPriceOfEachProduct.push(this.productsInCart[i].product.productUnitPrice);
                                     this.productStock.push(this.productsInCart[i].product.productStock);
                                     this.totalTax = this.totalTax + (10 * this.productsInCart[i].productQuantity);
                                     this.subtotal = this.subtotal + this.productsInCart[i].productCost;
                                   }
                                   this.productQuantity.shift();
                                   this.totalCostOfProduct.shift();
                                   this.unitPriceOfEachProduct.shift();
                                   this.productStock.shift();
                                   this.grandTotal = this.subtotal + this.totalTax;
                                   this.areProductsLoaded = Promise.resolve(true);
                                  });
  }

  onClickIncreaseQuantity(index) {
    if(this.productQuantity[index] === this.productStock[index]) {
      return;
    }
    this.totalTax = this.totalTax + 10;
    this.productsInCart[index].productQuantity = this.productsInCart[index].productQuantity + 1;
    this.productQuantity[index] = this.productsInCart[index].productQuantity;
    this.totalCostOfProduct[index] = this.unitPriceOfEachProduct[index] * this.productQuantity[index];
    this.subtotal = this.subtotal + this.unitPriceOfEachProduct[index];
    this.grandTotal = this.grandTotal + this.unitPriceOfEachProduct[index] + 10;
  }

  onClickDecreaseQuantity(index) {
    if(this.productQuantity[index] === 1) {
      return;
    }
    this.totalTax = this.totalTax - 10;
    this.productsInCart[index].productQuantity = this.productsInCart[index].productQuantity - 1;
    this.productQuantity[index] = this.productsInCart[index].productQuantity;
    this.totalCostOfProduct[index] = this.unitPriceOfEachProduct[index] * this.productQuantity[index];
    this.subtotal = this.subtotal - this.unitPriceOfEachProduct[index];
    this.grandTotal = this.grandTotal - this.unitPriceOfEachProduct[index] - 10;
  }

  onClickRemoveProductFromCart(index) {
    this.deleteProductFromCartService
        .removeProduct(this.customerId, this.productsInCart[index].orderId)
        .subscribe((response) => {
        },
        (error) => console.log(error),
        () => {
          this.router.navigateByUrl(`/`, {skipLocationChange: true}).then(()=>
          this.router.navigate([`employees/${this.employeeId}/customers/${this.customerId}/cart`]));
        }
        );
  }

  onClickEmptyCart() {
    this.emptyCartService
        .emptyCart(this.customerId)
        .subscribe((response) => {
        },
        (error) => console.log(error),
        () => {
          this.router.navigateByUrl(`/`, {skipLocationChange: true}).then(()=>
          this.router.navigate([`employees/${this.employeeId}/customers/${this.customerId}/cart`]));
        })
  }

  onClickProceedToCheckOut() {
    this.proceedToCheckoutService.updateProductQuantities(this.customerId, this.productsInCart)
                                 .subscribe((response) => {
                                   console.log(response.json());
                                 },
                                 (error) => console.log(error),
                                 () => {
                                   this.router.navigate([`/employees/${this.employeeId}/customers/${this.customerId}/checkout`]);
                                 }
                                 );
  }
}
