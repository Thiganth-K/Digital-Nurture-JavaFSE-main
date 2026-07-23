import { ApplicationConfig, provideBrowserGlobalErrorListeners, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { provideStoreDevtools } from '@ngrx/store-devtools';

import { routes } from './app.routes';
import { authInterceptor } from './interceptors/auth-interceptor';
import { errorHandlerInterceptor } from './interceptors/error-handler-interceptor';
import { loadingInterceptor } from './interceptors/loading-interceptor';

import { courseReducer } from './store/course/course.reducer';
import { enrollmentReducer } from './store/enrollment/enrollment.reducer';
import { CourseEffects } from './store/course/course.effects';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(
      withInterceptors([
        authInterceptor, 
        errorHandlerInterceptor, 
        loadingInterceptor
      ])
    ),
    // Register global NgRx state store (Exercise 9 Task 1)
    provideStore({
      course: courseReducer,
      enrollment: enrollmentReducer
    }),
    // Register global NgRx async side-effects (Exercise 9 Task 2)
    provideEffects([CourseEffects]),
    // Register Redux Devtools Instrument capability (Exercise 9 Task 1)
    provideStoreDevtools({
      maxAge: 25,
      logOnly: false
    })
  ]
};
