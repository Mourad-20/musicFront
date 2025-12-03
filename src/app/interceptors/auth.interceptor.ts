import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError, from } from 'rxjs';
import { catchError, switchMap, mergeMap } from 'rxjs/operators';
import { TokenService } from '../services/token.service';
import { Router } from '@angular/router';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(
    private tokenService: TokenService,
    private router: Router
  ) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return from(this.tokenService.getAccessToken()).pipe(
      switchMap(token => {
        let clonedReq = req;

        if (token) {
          clonedReq = req.clone({
            setHeaders: {
              Authorization: `Bearer ${token}`
            }
          });
        }

        return next.handle(clonedReq).pipe(
          catchError((err: HttpErrorResponse) => {
            if (err.status === 401) {
              return from(this.tokenService.refreshAccessToken()).pipe(
                mergeMap(newToken => {
                  const retryReq = req.clone({
                    setHeaders: {
                      Authorization: `Bearer ${newToken}`
                    }
                  });
                  return next.handle(retryReq);
                }),
                catchError(refreshErr => {
                  this.tokenService.clearTokens();
                  this.router.navigate(['/login']);
                  return throwError(() => refreshErr);
                })
              );
            }
            return throwError(() => err);
          })
        );
      })
    );
  }
}
