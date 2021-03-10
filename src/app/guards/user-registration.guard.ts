import { Injectable } from '@angular/core';
import { CanDeactivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { RegisterUserComponent } from '../users/register-user.component';

@Injectable({
  providedIn: 'root'
})
export class UserRegistrationGuard implements CanDeactivate<unknown> {
  canDeactivate(
    component: RegisterUserComponent,
    currentRoute: ActivatedRouteSnapshot,
    currentState: RouterStateSnapshot,
    nextState?: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      if (component.registerUserForm.dirty) {
        return confirm('Leaving this page will clear the registration form and all of its content.');
      }
      return true;
  }

}
