import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Store } from '@ngrx/store';

import { loadCourses } from '../../store/course/course.actions';
import { selectAllCourses } from '../../store/course/course.selectors';
import { selectEnrolledIds } from '../../store/enrollment/enrollment.selectors';

@Component({
  selector: 'app-home',
  imports: [CommonModule, FormsModule],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home implements OnInit {
  portalName = 'Student Course Portal';
  isPortalActive = true;
  message = '';
  searchTerm = '';
  gpa = 3.8;

  // Use inject() to avoid initialization order problems (Exercise 9 Task 1)
  private store = inject(Store);

  coursesCount$: Observable<number> = this.store.select(selectAllCourses).pipe(
    map(courses => courses.length)
  );
  enrolledCount$: Observable<number> = this.store.select(selectEnrolledIds).pipe(
    map(ids => ids.length)
  );

  constructor(
    private router: Router
  ) {}

  ngOnInit(): void {
    console.log('HomeComponent initialised — dispatching courses load');
    this.store.dispatch(loadCourses());
  }

  onEnrollClick(): void {
    this.message = 'Redirecting to reactive enrollment page...';
    setTimeout(() => {
      this.router.navigate(['/enroll/reactive']);
    }, 500);
  }
}
