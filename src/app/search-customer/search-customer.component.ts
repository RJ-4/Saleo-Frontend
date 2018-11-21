import { Component, OnInit } from '@angular/core';
import { SearchCustomerService } from '../services/search-customer.service';
import { LoginService } from '../services/login.service';

@Component({
  selector: 'app-search-customer',
  templateUrl: './search-customer.component.html',
  styleUrls: ['./search-customer.component.css']
})
export class SearchCustomerComponent implements OnInit {

  isNoCustomerFound = false;
  areCustomersLoaded: Promise<boolean>;
  customers: any[];
  employeeId: number;

  constructor(private searchCustomerService: SearchCustomerService,
              private loginService: LoginService) { }

  ngOnInit() {
    this.employeeId = +window.localStorage.getItem(this.loginService.getLoggedInEmployeeIdKey());
    let self = this;
    const searchBox = document.getElementById("search");
    searchBox.onkeypress = function(event){
      self.isNoCustomerFound = false;
      if (event.keyCode == 13 || event.which == 13){
        const searchBoxValue = ((<HTMLInputElement>searchBox).value);
        self.searchCustomerService.searchCustomer(searchBoxValue)
                              .subscribe((response) => {
                                self.customers = response.json();
                                self.areCustomersLoaded = Promise.resolve(true);
                              },
                              (error) => {
                                self.isNoCustomerFound = true;
                              });
      }
    };
  }

  onSearch(searchBox) {
    this.isNoCustomerFound = false;
    const searchParam = searchBox.value;
    this.searchCustomerService.searchCustomer(searchParam)
                              .subscribe((response) => {
                                this.customers = response.json();
                                this.areCustomersLoaded = Promise.resolve(true);
                              },
                              (error) => {
                                this.isNoCustomerFound = true;
                              });
  }
}
