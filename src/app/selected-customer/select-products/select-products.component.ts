import { Component, OnInit } from '@angular/core';
import { SearchProductService } from 'src/app/services/search-product.service';
import { LoginService } from 'src/app/services/login.service';
import { AddToCartService } from 'src/app/services/add-to-cart.service';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-select-products',
  templateUrl: './select-products.component.html',
  styleUrls: ['./select-products.component.css']
})
export class SelectProductsComponent implements OnInit {

  isNoProductFound = false;
  areProductsLoaded: Promise<boolean>;
  selectedProducts: any[];
  employeeId: number;
  isProductAddedToCart = false;
  isUnableToAddProductToCart = false;
  isProductLoadedToCart: Promise<boolean>;
  customerId: string;
  isCustomerIdLoaded: Promise<boolean>;
  productNameAddedToCart: string;
  currentPageNo = 1;
  
  constructor(private searchProductService: SearchProductService, 
              private loginService: LoginService,
              private addToCartService: AddToCartService,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.employeeId = +window.localStorage.getItem(this.loginService.getLoggedInEmployeeIdKey());
    this.route.params
              .subscribe((params: Params) => {
                this.customerId = params['customerId'];
                this.isCustomerIdLoaded = Promise.resolve(true);
              });

    let self = this;
    const searchBox = document.getElementById("search");
    searchBox.onkeypress = function(event){
      self.isNoProductFound = false;
      if (event.keyCode == 13 || event.which == 13){
        const searchBoxValue = ((<HTMLInputElement>searchBox).value);
        self.searchProductService.searchProduct(searchBoxValue)
                             .subscribe((response) => {
                               self.selectedProducts = response.json();
                               console.log(response.json());
                               
                               self.areProductsLoaded = Promise.resolve(true);
                              },
                              (error) => {
                                self.isNoProductFound = true;
                              });
      }
    };
  }

  onSearch(searchBox) {
    this.isNoProductFound = false;
    const searchParam = searchBox.value;
    this.searchProductService.searchProduct(searchParam)
                             .subscribe((response) => {
                               this.selectedProducts = response.json();
                               this.areProductsLoaded = Promise.resolve(true);
                              },
                              (error) => {
                                this.isNoProductFound = true;
                              });
  }

  onClickAddToCart(productCode: string, productName: string) {
    this.addToCartService.addToCart(this.employeeId, this.customerId, productCode)
                         .subscribe((response) => {
                          this.isProductAddedToCart = true;
                          this.isProductLoadedToCart = Promise.resolve(true);
                          this.productNameAddedToCart = productName;
                         },
                         (error) => {
                           this.isUnableToAddProductToCart = true;
                         })
  }

}
