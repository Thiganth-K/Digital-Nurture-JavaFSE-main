import { inject } from '@angular/core';
import { HttpInterceptorFn } from '@angular/common/http';
import { Loading } from '../services/loading';
import { finalize } from 'rxjs';

export const loadingInterceptor: HttpInterceptorFn = (req, next) => {
  const loadingService = inject(Loading);
  
  // Show loading indicator before request is dispatched
  loadingService.show();
  
  return next(req).pipe(
    // finalize runs when request is completed (either success or error)
    // equivalent to try/catch/finally block (Exercise 8 Task 3)
    finalize(() => {
      loadingService.hide();
    })
  );
};
