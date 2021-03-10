import { LoginUserComponent } from './../users/login-user.component';
import { Injectable } from '@angular/core';
import { CanDeactivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserLoginGuard implements CanDeactivate<unknown> {
  constructor(private router: Router){};
  canDeactivate(
    component: LoginUserComponent,
    currentRoute: ActivatedRouteSnapshot,
    currentState: RouterStateSnapshot,
    nextState?: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      // if (!localStorage.getItem('userProfile')) {
      //   this.router.navigateByUrl('/');
      // }
      return true;
  }

}
