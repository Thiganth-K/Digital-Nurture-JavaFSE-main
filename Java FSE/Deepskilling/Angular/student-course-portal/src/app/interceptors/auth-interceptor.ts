import { HttpInterceptorFn } from '@angular/common/http';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  console.log('AuthInterceptor: Appending Bearer token to request:', req.url);
  const clonedRequest = req.clone({
    setHeaders: { Authorization: 'Bearer mock-token-12345' }
  });
  return next(clonedRequest);
};
