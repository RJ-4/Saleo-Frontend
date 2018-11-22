import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms'

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { LoginService } from './services/login.service';
import { HttpModule } from '@angular/http';
import { AuthService } from './services/auth.service';
import { SignUpComponent } from './sign-up/sign-up.component';
import { SignUpService } from './services/sign-up.service';
import { HomeComponent } from './home/home.component';
import { LogoutComponent } from './logout/logout.component';
import { NavigationBarComponent } from './navigation-bar/navigation-bar.component';
import { FooterComponent } from './footer/footer.component';
import { AppLabelComponent } from './home/app-label/app-label.component';
import { SliderComponent } from './home/slider/slider.component';
import { CashDrawerComponent } from './home/slider/cash-drawer/cash-drawer.component';
import { LastOrderComponent } from './home/slider/last-order/last-order.component';
import { EmployeesLastOrderService } from './services/employees-last-order.service';
import { SliderLeftComponent } from './home/slider-left/slider-left.component';
import { LowStockProductsComponent } from './home/slider-left/low-stock-products/low-stock-products.component';
import { LowStockProductsService } from './services/low-stock-products.service';
import { TotalOrdersPlacedTodayComponent } from './home/slider-left/total-orders-placed-today/total-orders-placed-today.component';
import { TotalOrdersPlacedTodayService } from './services/total-orders-placed-today.service';
import { AddProductComponent } from './add-product/add-product.component';
import { AddProductService } from './services/add-product.service';
import { SearchProductComponent } from './search-product/search-product.component';
import { GetAllProductsService } from './services/get-all-products.service';
import { SearchProductService } from './services/search-product.service';
import { UpdateProductComponent } from './update-product/update-product.component';
import { UpdateProductService } from './services/update-product.service';
import { AddCustomerComponent } from './add-customer/add-customer.component';
import { AddCustomerService } from './services/add-customer.service';
import { SearchCustomerComponent } from './search-customer/search-customer.component';
import { SearchCustomerService } from './services/search-customer.service';
import { ShowOrdersComponent } from './show-orders/show-orders.component';
import { ShowOrdersService } from './services/show-orders.service';
import { ShowOrderDetailsComponent } from './show-order-details/show-order-details.component';
import { ShowOrderDetailsService } from './services/show-order-details.service';
import { SelectedCustomerComponent } from './selected-customer/selected-customer.component';
import { CustomerDetailsComponent } from './selected-customer/customer-details/customer-details.component';
import { SelectProductsComponent } from './selected-customer/select-products/select-products.component';
import { GetSelectedCustomerService } from './services/get-selected-customer.service';
import { CartComponent } from './selected-customer/cart/cart.component';
import { EditCustomerComponent } from './selected-customer/edit-customer/edit-customer.component';
import { AddToCartService } from './services/add-to-cart.service';
import { GetProductsInCartService } from './services/get-products-in-cart.service';
import { UpdateProfileComponent } from './update-profile/update-profile.component';
import { GetLoggedInEmployeeService } from './services/get-logged-in-employee.service';
import { EmptyCartService } from './services/empty-cart.service';
import { DeleteProductFromCartService } from './services/delete-product-from-cart.service';
import { UpdateCustomerService } from './services/update-customer.service';
import { AuthGuradService } from './services/auth-gurad.service';
import { ProceedToCheckoutService } from './services/proceed-to-checkout.service';
import { CheckoutComponent } from './selected-customer/checkout/checkout.component';
import { ReviewItemsComponent } from './selected-customer/checkout/review-items/review-items.component';
import { PaymentComponent } from './selected-customer/checkout/payment/payment.component';
import { PaymentService } from './services/payment.service';
import { DeleteSavedForLaterOrderService } from './services/delete-saved-for-later-order.service';
import { DetailedCashDrawerComponent } from './detailed-cash-drawer/detailed-cash-drawer.component';
import { GetCashOrdersService } from './services/get-cash-orders.service'
import { NgxPaginationModule } from 'ngx-pagination';

const appRoutes: Routes = [
  {path: '', redirectTo: '/login', pathMatch: 'full'},
  {path: 'login', component: LoginComponent},
  {path: 'sign-up', component: SignUpComponent},
  {path: 'logout', canActivate: [AuthGuradService], component: LogoutComponent},
  {path: 'employees/:employeeId/home', canActivate: [AuthGuradService], component: HomeComponent},
  {path: 'employees/:employeeId/products/new', canActivate: [AuthGuradService], component: AddProductComponent},
  {path: 'employees/:employeeId/products/search', canActivate: [AuthGuradService], component: SearchProductComponent},
  {path: 'employees/:employeeId/products/:product-code/update', canActivate: [AuthGuradService], component: UpdateProductComponent},
  {path: 'employees/:employeeId/customers/new', canActivate: [AuthGuradService], component: AddCustomerComponent},
  {path: 'employees/:employeeId/customers/search', canActivate: [AuthGuradService], component: SearchCustomerComponent},
  {path: 'employees/:employeeId/orders', canActivate: [AuthGuradService], component: ShowOrdersComponent},
  {path: 'employees/:employeeId/orders/:orderId', canActivate: [AuthGuradService], component: ShowOrderDetailsComponent},
  {path: 'employees/:employeeId/customers/:customerId', canActivate: [AuthGuradService], component: SelectedCustomerComponent},
  {path: 'employees/:employeeId/customers/:customerId/edit', canActivate: [AuthGuradService], component: EditCustomerComponent},
  {path: 'employees/:employeeId/customers/:customerId/cart', canActivate: [AuthGuradService], component: CartComponent},
  {path: 'employees/:employeeId/profile/update', canActivate: [AuthGuradService], component: UpdateProfileComponent},
  {path: 'employees/:employeeId/customers/:customerId/checkout', canActivate: [AuthGuradService], component: CheckoutComponent},
  {path: 'employees/:employeeId/cash-drawer', canActivate: [AuthGuradService], component: DetailedCashDrawerComponent}
]
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignUpComponent,
    HomeComponent,
    LogoutComponent,
    NavigationBarComponent,
    FooterComponent,
    AppLabelComponent,
    SliderComponent,
    CashDrawerComponent,
    LastOrderComponent,
    SliderLeftComponent,
    LowStockProductsComponent,
    TotalOrdersPlacedTodayComponent,
    AddProductComponent,
    SearchProductComponent,
    UpdateProductComponent,
    AddCustomerComponent,
    SearchCustomerComponent,
    ShowOrdersComponent,
    ShowOrderDetailsComponent,
    SelectedCustomerComponent,
    CustomerDetailsComponent,
    SelectProductsComponent,
    CartComponent,
    EditCustomerComponent,
    UpdateProfileComponent,
    CheckoutComponent,
    ReviewItemsComponent,
    PaymentComponent,
    DetailedCashDrawerComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    NgxPaginationModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [LoginService, AuthService, SignUpService, EmployeesLastOrderService, LowStockProductsService, TotalOrdersPlacedTodayService, AddProductService, GetAllProductsService, SearchProductService, UpdateProductService, AddCustomerService, SearchCustomerService, ShowOrdersService, ShowOrderDetailsService, GetSelectedCustomerService, AddToCartService, GetProductsInCartService, GetLoggedInEmployeeService, EmptyCartService, DeleteProductFromCartService, UpdateCustomerService, ProceedToCheckoutService, PaymentService, DeleteSavedForLaterOrderService, GetCashOrdersService],
  
  bootstrap: [AppComponent]
})
export class AppModule { }
