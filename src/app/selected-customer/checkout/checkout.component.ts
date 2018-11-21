import { Component, OnInit } from '@angular/core';
import { Params, ActivatedRoute } from '@angular/router';
import { GetSelectedCustomerService } from 'src/app/services/get-selected-customer.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

  customerId: string;
  selectedCustomer;
  isSelectedCustomerLoaded: Promise<boolean>;

  constructor(private route: ActivatedRoute,
              private getSelectedCustomerService: GetSelectedCustomerService) { }

  ngOnInit() {
    let i: number;
    this.route.params
              .subscribe((params: Params) => {
                this.customerId = params['customerId'];
              });

    this.getSelectedCustomerService.getSelectedCustomer(this.customerId)
                                   .subscribe((response) => {
                                     this.selectedCustomer = response.json()[0];
                                     this.isSelectedCustomerLoaded = Promise.resolve(true);
                                   })
  }

}
