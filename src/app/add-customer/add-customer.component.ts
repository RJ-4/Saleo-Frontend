import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AddCustomerService } from '../services/add-customer.service';

@Component({
  selector: 'app-add-customer',
  templateUrl: './add-customer.component.html',
  styleUrls: ['./add-customer.component.css']
})
export class AddCustomerComponent implements OnInit {

  @ViewChild('form') addCustomerForm: NgForm;
  isCustomerSuccessfullyAdded = false;
  newCustomerName: string;

  constructor(private addCustomerService: AddCustomerService) { }

  ngOnInit() {
  }

  onSubmit(){
    const newCustomerName = this.addCustomerForm.value.customerName;
    const newCustomerEmailId = this.addCustomerForm.value.customerEmailId;
    const newCustomerMobileNo = this.addCustomerForm.value.customerMobileNo;

    this.newCustomerName = newCustomerName;

    const newCustomer = {
      customerName: newCustomerName,
      customerEmailId: newCustomerEmailId,
      customerMobileNo: newCustomerMobileNo
    };

    this.addCustomerService.addNewCustomer(newCustomer)
                           .subscribe((response) => {
                              console.log(response.json());
                              this.newCustomerName = response.json().customerName;
                              this.isCustomerSuccessfullyAdded = true;
                           },
                           (error) => console.log(error),
                           () => this.addCustomerForm.reset()
                           );

  }
}
