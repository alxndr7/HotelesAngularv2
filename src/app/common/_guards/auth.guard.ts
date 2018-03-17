import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import {AuthenticationService} from '../_services/authentication.service';

@Injectable()
export class AuthGuard implements CanActivate {

    constructor(private router: Router, public _authenticationService: AuthenticationService) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {

        //console.log(localStorage.getItem('user') + '0');
        /*this.router.navigate(['auth/login'], { queryParams: { returnUrl: state.url }});
        return true;*/

        /*if (localStorage.getItem('user')) {
            // logged in so return true
            return true;
        }
        // not logged in so redirect to login page with the return url
        this.router.navigate(['public/login'], { queryParams: { returnUrl: state.url }});
        return false;*/

        if ( this._authenticationService.isLoggedIn() ) {
            return true;
        }

        console.log('Access denied!');
        //this.router.navigate(['public/login']);
        this.router.navigate(['public/login'], { queryParams: { returnUrl: state.url }});
        return false;
    }
}