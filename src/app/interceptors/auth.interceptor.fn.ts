import { HttpInterceptorFn, HttpErrorResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { from, throwError } from 'rxjs';
import { switchMap, catchError, mergeMap } from 'rxjs/operators';
import { TokenService } from '../services/token.service';

export const authInterceptorFn: HttpInterceptorFn = (req, next) => {
  const tokenService = inject(TokenService);
  const router = inject(Router);

  return from(tokenService.getAccessToken()).pipe(
    switchMap(token => {
      let clonedReq = req;

      if (token) {
        clonedReq = req.clone({
          setHeaders: {
            Authorization: `Bearer ${token}`
          }
        });
      }

      return next(clonedReq).pipe(
        catchError((err: HttpErrorResponse) => {
          if (err.status === 401) {
            return from(tokenService.refreshAccessToken()).pipe(
              mergeMap(newToken => {
                const retryReq = req.clone({
                  setHeaders: {
                    Authorization: `Bearer ${newToken}`
                  }
                });
                return next(retryReq);
              }),
              catchError(refreshErr => {
                tokenService.clearTokens();
                router.navigate(['/login']);
                return throwError(() => refreshErr);
              })
            );
          }
          return throwError(() => err);
        })
      );
    })
  );
};
