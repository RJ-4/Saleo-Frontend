import { Component, OnInit } from '@angular/core';
import { GetSelectedCustomerService } from 'src/app/services/get-selected-customer.service';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-customer-details',
  templateUrl: './customer-details.component.html',
  styleUrls: ['./customer-details.component.css']
})
export class CustomerDetailsComponent implements OnInit {

  constructor(private getSelectedCustomerService: GetSelectedCustomerService,
              private route: ActivatedRoute,
              private router: Router) { }

  selectedCustomer;
  isSelectedCustomerLoaded: Promise<boolean>;
  isCustomerIdInvalid = false;
  customerId: string;
  isCustomerIdLoaded: Promise<boolean>;

  ngOnInit() {
  
    this.route.params 
              .subscribe((params: Params) => {
                this.customerId = params['customerId'];
                this.isCustomerIdLoaded = Promise.resolve(true);
              });

    this.getSelectedCustomerService.getSelectedCustomer(this.customerId)
                                   .subscribe((response) => {
                                     this.selectedCustomer = response.json()[0];
                                     this.isSelectedCustomerLoaded = Promise.resolve(true);
                                     console.log(response.json()[0]);
                                   },
                                   (error) => {
                                     this.isCustomerIdInvalid = true;
                                   })
  }

  onClickEditCustomer() {
    this.router.navigate(['edit'], { relativeTo: this.route });
  }

  onClickCustomerCart() {
    this.router.navigate(['cart'], { relativeTo: this.route });
  }
}
