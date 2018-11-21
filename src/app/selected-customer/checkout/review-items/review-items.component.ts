import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { GetProductsInCartService } from 'src/app/services/get-products-in-cart.service';

@Component({
  selector: 'app-review-items',
  templateUrl: './review-items.component.html',
  styleUrls: ['./review-items.component.css']
})
export class ReviewItemsComponent implements OnInit {

  productsInCart: any[];
  customerId: string;
  areProductsInCartLoaded: Promise<boolean>;
  subtotal = 0;
  totalTax = 0;
  grandTotal = 0;

  constructor(private route: ActivatedRoute, 
              private getProductsInCartService: GetProductsInCartService) { }

  ngOnInit() {
    let i: number;
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
                                   }
                                   this.areProductsInCartLoaded = Promise.resolve(true);
                                 });
  }

}
