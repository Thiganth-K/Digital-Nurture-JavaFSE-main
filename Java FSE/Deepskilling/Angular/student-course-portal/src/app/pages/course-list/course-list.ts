import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable, BehaviorSubject, combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';
import { Store } from '@ngrx/store';

import { CourseCard } from '../../components/course-card/course-card';
import { Course } from '../../models/course.model';
import { loadCourses } from '../../store/course/course.actions';
import { selectAllCourses, selectCoursesLoading, selectCoursesError } from '../../store/course/course.selectors';
import { selectEnrolledIds } from '../../store/enrollment/enrollment.selectors';

@Component({
  selector: 'app-course-list',
  imports: [CommonModule, FormsModule, CourseCard],
  templateUrl: './course-list.html',
  styleUrl: './course-list.css',
})
export class CourseList implements OnInit {
  // Use inject() to avoid initialization order problems (Exercise 9 Task 1)
  private store = inject(Store);
  
  courses$: Observable<Course[]> = this.store.select(selectAllCourses);
  isLoading$: Observable<boolean> = this.store.select(selectCoursesLoading);
  errorMessage$: Observable<string | null> = this.store.select(selectCoursesError);
  enrolledIds$: Observable<number[]> = this.store.select(selectEnrolledIds);

  searchTerm = '';
  selectedCourseId: number | null = null;
  
  private searchSubject = new BehaviorSubject<string>('');

  filteredCourses$ = combineLatest([this.courses$, this.searchSubject.asObservable()]).pipe(
    map(([courses, term]) => {
      if (!term.trim()) return courses;
      const lowTerm = term.toLowerCase();
      return courses.filter(c => 
        c.name.toLowerCase().includes(lowTerm) || 
        c.code.toLowerCase().includes(lowTerm)
      );
    })
  );

  constructor(
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const searchParam = this.route.snapshot.queryParamMap.get('search');
    if (searchParam) {
      this.searchTerm = searchParam;
      this.searchSubject.next(searchParam);
    }

    this.store.dispatch(loadCourses());
  }

  onSearchChange(): void {
    this.searchSubject.next(this.searchTerm);
    this.router.navigate(['/courses'], { 
      queryParams: { search: this.searchTerm || null },
      queryParamsHandling: 'merge' 
    });
  }

  trackByCourseId(index: number, course: Course): number {
    return course.id;
  }

  goToDetail(courseId: number): void {
    this.router.navigate(['/courses', courseId]);
  }

  onEnroll(courseId: number): void {
    console.log('CourseList dispatching enrollment for ID:', courseId);
    this.selectedCourseId = courseId;
  }
}
