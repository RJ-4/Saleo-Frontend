import { Component, OnInit } from '@angular/core';
import { LoginService } from '../services/login.service';

@Component({
  selector: 'app-navigation-bar',
  templateUrl: './navigation-bar.component.html',
  styleUrls: ['./navigation-bar.component.css']
})
export class NavigationBarComponent implements OnInit {

  constructor(private loginService: LoginService) { }

  employeeId: string;

  ngOnInit() {
    this.employeeId = window.localStorage.getItem(this.loginService.getLoggedInEmployeeIdKey());
  }

}
