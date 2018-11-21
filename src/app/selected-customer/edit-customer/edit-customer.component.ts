import { Component, OnInit, ViewChild } from '@angular/core';
import { UpdateCustomerService } from 'src/app/services/update-customer.service';
import { GetSelectedCustomerService } from 'src/app/services/get-selected-customer.service';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-edit-customer',
  templateUrl: './edit-customer.component.html',
  styleUrls: ['./edit-customer.component.css']
})
export class EditCustomerComponent implements OnInit {

  @ViewChild('form') updateCustomerForm: NgForm;
  
  customerId: string;
  selectedCustomer: {
    customerId ?: string,
    customerName: string,
    customerMobileNo: string,
    customerEmailId: string
  };
  isSelectedCustomerLoaded: Promise<boolean>;
  isCustomerUpdationLoaded: Promise<boolean>;
  isUpdationSuccessful = false;
  isInvalidCustomerId = false;

  constructor(private updateCustomerService: UpdateCustomerService,
              private getSelectedCustomerService: GetSelectedCustomerService,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params
              .subscribe((params: Params) => {
                this.customerId = params['customerId']
              }
              );
    
    this.getSelectedCustomerService.getSelectedCustomer(this.customerId)
                                   .subscribe((response) => {
                                     this.selectedCustomer = response.json()[0];
                                     console.log(response.json()[0]);
                                     this.isSelectedCustomerLoaded = Promise.resolve(true);
                                   },
                                   (error) => {
                                     this.isInvalidCustomerId = true;
                                   });
  }

  onUpdate() {
    const updatedCustomer = {
      customerName: this.selectedCustomer.customerName,
      customerEmailId: this.selectedCustomer.customerEmailId,
      customerMobileNo: this.selectedCustomer.customerMobileNo
    };
    this.updateCustomerService.updateCustomer(this.customerId, updatedCustomer)
                              .subscribe((response) => {
                                this.isCustomerUpdationLoaded = Promise.resolve(true);
                                this.isUpdationSuccessful = true;
                              });
  }

}
