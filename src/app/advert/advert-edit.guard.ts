import { AdvertEditComponent } from './advert-edit.component';
import { Injectable } from '@angular/core';
import { CanDeactivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdvertEditGuard implements CanDeactivate<unknown> {
  canDeactivate(
    component: AdvertEditComponent,
    currentRoute: ActivatedRouteSnapshot,
    currentState: RouterStateSnapshot,
    nextState?: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    // if (component.advertForm.dirty) {
    //   const itemName = component.advertForm.get('itemName').value || 'New Advert';
    //   return confirm(`Navigate away and lose all changes to ${itemName}?`);
    // }
    // return true;
    if (component.advertForm.dirty) {
      return confirm('Leaving this page will clear the registration form and all of its content.');
    }
    return true;
  }

}
