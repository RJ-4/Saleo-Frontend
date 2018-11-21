import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuradService implements CanActivate {

  constructor(private router: Router, private authService: AuthService) { }

  canActivate(route: ActivatedRouteSnapshot, 
              state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

        if(this.authService.isEmployeeLoggedIn()) {
          return true;
        } else {
          this.router.navigate(['/']);
        }
  }

              
}
