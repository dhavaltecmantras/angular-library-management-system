import { TokenStorageService } from './../_services/token-storage.service';
import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  userDetails = {
    success: false
  };
  constructor(
    private tokenStorage: TokenStorageService,
    private router: Router
  ) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    this.userDetails = this.tokenStorage.getUser();
    if (this.userDetails.success) {
      return true;
    } else {
      this.router.navigate(['login']);
      return false;
    }
  }
}
