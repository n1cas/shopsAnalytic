import { Injectable } from "@angular/core";
import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { AuthService } from "../services/auth.service";
import { Observable, throwError } from "rxjs";
import { catchError } from "rxjs/operators";
import { Router } from "@angular/router";

@Injectable()
export class TokenIterceptor implements HttpInterceptor {
  constructor(
    private readonly auth: AuthService,
    private readonly router: Router,
  ) { }

  public intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if(this.auth.isAuthenticated()){
      req = req.clone({
        setHeaders:{
          Authorization: this.auth.getToken(),
        }
      })
    }
    return next.handle(req).pipe(
      catchError((error:HttpErrorResponse)=> this.handleAuthError(error))
    )
  }

  private handleAuthError(error:HttpErrorResponse): Observable<any> {
    if(error.status === 401) {
      this.router.navigate(['/login'], {
        queryParams:{
          sessionFaild: true
        }
      })
    }
    return throwError(error);
  }
}