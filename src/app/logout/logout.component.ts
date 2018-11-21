import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { LoginService } from '../services/login.service';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {

  constructor(private authService: AuthService, 
              private router: Router,
              private loginService: LoginService) { }

  ngOnInit() {
    this.authService.removeAuthToken();
    window.localStorage.clear();
    this.router.navigate(['/login']);
  }

}
