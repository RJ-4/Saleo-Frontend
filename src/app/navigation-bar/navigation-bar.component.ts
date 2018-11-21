import { Component, OnInit } from '@angular/core';
import { LoginService } from '../services/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navigation-bar',
  templateUrl: './navigation-bar.component.html',
  styleUrls: ['./navigation-bar.component.css']
})
export class NavigationBarComponent implements OnInit {

  constructor(private loginService: LoginService,
              private router: Router) { }

  employeeId: string;
  isLoggedInEmployeeLoaded: Promise<boolean>;
  currentCashDrawer: number;

  ngOnInit() {
    this.employeeId = window.localStorage.getItem(this.loginService.getLoggedInEmployeeIdKey());
    this.loginService.getCurrentEmployee()
                     .subscribe((response) => {
                       this.currentCashDrawer = response.json().employeeCashDrawer;
                       this.isLoggedInEmployeeLoaded = Promise.resolve(true);
                     })
  }

  onClickLogoutButton() {
    this.router.navigate(['/login']);
  }

}
