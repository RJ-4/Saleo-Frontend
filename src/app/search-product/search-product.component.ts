import { Component, OnInit } from '@angular/core';
import { GetAllProductsService } from '../services/get-all-products.service';
import { SearchProductService } from '../services/search-product.service';
import { LoginService } from '../services/login.service';

@Component({
  selector: 'app-search-product',
  templateUrl: './search-product.component.html',
  styleUrls: ['./search-product.component.css']
})
export class SearchProductComponent implements OnInit {

  products: any[];
  areProductsLoaded: Promise<boolean>;
  isNoProductFound = false;
  employeeId: number;
  
  constructor(private searchProductService: SearchProductService, 
              private loginService: LoginService) { }

  ngOnInit() {
    this.employeeId = +window.localStorage.getItem(this.loginService.getLoggedInEmployeeIdKey());
    let self = this;
    const searchBox = document.getElementById("search");
    searchBox.onkeypress = function(event){
      self.isNoProductFound = false;
      if (event.keyCode == 13 || event.which == 13){
        const searchBoxValue = ((<HTMLInputElement>searchBox).value);
        self.searchProductService.searchProduct(searchBoxValue)
                             .subscribe((response) => {
                               self.products = response.json();
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
                               this.products = response.json();
                               this.areProductsLoaded = Promise.resolve(true);
                              },
                              (error) => {
                                this.isNoProductFound = true;
                              });
  }
}
  
