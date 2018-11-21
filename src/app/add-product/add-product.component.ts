import { Component, OnInit, ViewChild } from '@angular/core';
import { AddProductService } from '../services/add-product.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {

  @ViewChild('form') addProductForm: NgForm;
  isProductUnitPriceInvalid = false;
  isProductStockInvalid = false;
  isNewProductAdded = false;
  newProductName: string;

  constructor(private addProductService: AddProductService) { }

  ngOnInit() {
  }

  onSubmit() {
    const productName = this.addProductForm.value.productName;
    const productDescription = this.addProductForm.value.productDescription;
    const productUnitPrice = this.addProductForm.value.productUnitPrice;
    const productStock = this.addProductForm.value.productStock;

    this.newProductName = productName;
    
    if(productUnitPrice <= 0) {
      this.isProductUnitPriceInvalid = true;
      return;
    }
    if(productStock < 0) {
      this.isProductStockInvalid = true;
      return;
    }

    const newProduct: {productName: string, productDescription: string, productUnitPrice: number,
                        productStock: number} = {
      productName: productName,
      productDescription: productDescription,
      productUnitPrice: productUnitPrice,
      productStock: productStock
    };

    this.addProductService.addNewProduct(newProduct)
                          .subscribe((response) => {
                            console.log(response.json());
                            this.isNewProductAdded = true;
                          },
                          (error) => console.log(error),
                          () => {
                            this.addProductForm.reset();
                          });
  }
}
