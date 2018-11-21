import { Component, OnInit, ViewChild } from '@angular/core';
import { SearchProductService } from '../services/search-product.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { UpdateProductService } from '../services/update-product.service';
import { LoginService } from '../services/login.service';

@Component({
  selector: 'app-update-product',
  templateUrl: './update-product.component.html',
  styleUrls: ['./update-product.component.css']
})
export class UpdateProductComponent implements OnInit {

  constructor(private searchProductService: SearchProductService,
              private route: ActivatedRoute,
              private updateProductService: UpdateProductService,
              private router: Router,
              private loginService: LoginService) { }

  @ViewChild('form') updatedForm: NgForm;
  isValidProduct = true;
  isSelectedProductLoaded: Promise<boolean>;
  isProductUnitPriceInvalid = false;
  isProductStockInvalid = false;
  productCode: string;
  employeeId: number

  selectedProduct: {
    'productCode'?: string,
    'productName': string,
    'productStock': number,
    'productUnitPrice': number,
    'productDescription': string
  }

  ngOnInit() {
    this.route.params
              .subscribe((params: Params) => {
                this.productCode = params['product-code'];
    });

    this.searchProductService.searchProduct(this.productCode)
                             .subscribe((response) => {
                                console.log(response.json()[0]);
                                this.selectedProduct = response.json()[0];
                                this.isValidProduct = true;
                                this.isSelectedProductLoaded = Promise.resolve(true);
                              },
                              (error) => {
                                this.isValidProduct = false;
                              });
    this.employeeId = +window.localStorage.getItem(this.loginService.getLoggedInEmployeeIdKey());
    
  }

  onUpdate() {
    this.isProductUnitPriceInvalid = false;
    this.isProductStockInvalid = false;

    const updatedProductName = this.updatedForm.value.productName;
    const updatedProductDescription = this.updatedForm.value.productDescription;
    const updatedProductUnitPrice = this.updatedForm.value.productUnitPrice;
    const updatedProductStock = this.updatedForm.value.productStock;

    if(updatedProductUnitPrice <= 0) {
      this.isProductUnitPriceInvalid = true;
      return;
    }

    if(updatedProductStock < 0) {
      this.isProductStockInvalid = true;
      return;
    }

    const updatedProduct = {
      productName: updatedProductName,
      productDescription: updatedProductDescription,
      productUnitPrice: updatedProductUnitPrice,
      productStock: updatedProductStock
    };
    
    this.updateProductService.updateProduct(this.productCode, updatedProduct)
                             .subscribe((response) => {
                               console.log(response.json());
                             },
                             (error) => console.log(error),
                             () => {
                              this.router.navigate([`/employees/${this.employeeId}/products/search`]);
                             }); 
  }
}
