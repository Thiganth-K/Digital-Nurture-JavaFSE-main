import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { CourseList } from './pages/course-list/course-list';
import { CourseDetail } from './pages/course-detail/course-detail';
import { CoursesLayout } from './pages/courses-layout/courses-layout';
import { StudentProfile } from './pages/student-profile/student-profile';
import { NotFound } from './pages/not-found/not-found';
import { authGuard } from './guards/auth-guard';

export const routes: Routes = [
  { path: '', component: Home },
  
  // Nested routes with layout component (Exercise 7 Task 1)
  { 
    path: 'courses', 
    component: CoursesLayout, 
    children: [
      { path: '', component: CourseList },
      { path: ':id', component: CourseDetail }
    ] 
  },
  
  // Guarded Profile route
  { path: 'profile', component: StudentProfile, canActivate: [authGuard] },
  
  // Lazy Loaded Enrollment feature module with guard (Exercise 7 Task 2)
  { 
    path: 'enroll', 
    canActivate: [authGuard], 
    loadChildren: () => import('./features/enrollment/enrollment-module').then(m => m.EnrollmentModule) 
  },
  
  // Wildcard Route for 404 (must be last)
  { path: '**', component: NotFound }
];
