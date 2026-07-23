import { inject } from '@angular/core';
import { HttpInterceptorFn, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';

export const errorHandlerInterceptor: HttpInterceptorFn = (req, next) => {
  const router = inject(Router);
  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      console.error('ErrorHandlerInterceptor: Caught HTTP Error:', error);
      if (error.status === 401) {
        console.warn('Unauthorized request. Redirecting to login/home.');
        router.navigate(['/']);
      } else if (error.status === 500) {
        console.error('Critical server failure (500) encountered.');
      }
      return throwError(() => error);
    })
  );
};
