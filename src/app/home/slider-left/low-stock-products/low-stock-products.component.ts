import { Component, OnInit } from '@angular/core';
import { LowStockProductsService } from 'src/app/services/low-stock-products.service';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-low-stock-products',
  templateUrl: './low-stock-products.component.html',
  styleUrls: ['./low-stock-products.component.css']
})
export class LowStockProductsComponent implements OnInit {

  constructor(private lowStockProductsService: LowStockProductsService,
              private loginService: LoginService) { }

  lowStockProducts;
  employeeId: number;
  areLowStockProductsLoaded: Promise<boolean>;
  currentPageNo = 1;

  ngOnInit() {
    this.employeeId = +window.localStorage.getItem(this.loginService.getLoggedInEmployeeIdKey());
    this.lowStockProductsService.getLowStockProducts()
                                .subscribe((response) => {
                                  console.log(response.json());
                                  this.lowStockProducts = response.json();                        this.areLowStockProductsLoaded = Promise.resolve(true);         
                                });
  }

}
