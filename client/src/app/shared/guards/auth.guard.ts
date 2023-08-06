import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable, of } from "rxjs";
import { AuthService } from "../services/auth.service";

@Injectable({
    providedIn:'root'
})
export class AuthGuard implements CanActivate, CanActivateChild {

    constructor(
        private readonly auth: AuthService,
        private readonly router: Router,
        ){}
    
    canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
       if(this.auth.isAuthenticated()) {
        return of(true);
       }

       this.router.navigate(['/login'], {
        queryParams: {
            accessDenied: true
        }
       })
       return of(false)
    }
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
       return this.canActivate(route, state)
    }
    
}