import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry, tap, switchMap } from 'rxjs/operators';
import { Course } from '../models/course.model';

@Injectable({
  providedIn: 'root',
})
export class CourseService {
  private apiUrl = 'http://localhost:3000/courses';
  
  // Local cache to support synchronous layout queries across services (Exercise 8 Task 2)
  private coursesCache: Course[] = [
    { id: 1, name: 'Data Structures & Algorithms', code: 'CS101', credits: 4, gradeStatus: 'passed', enrolled: false },
    { id: 2, name: 'Web Development Basics', code: 'CS102', credits: 3, gradeStatus: 'passed', enrolled: false },
    { id: 3, name: 'Database Management Systems', code: 'CS201', credits: 4, gradeStatus: 'pending', enrolled: false },
    { id: 4, name: 'Software Engineering Principles', code: 'CS202', credits: 3, gradeStatus: 'pending', enrolled: false },
    { id: 5, name: 'Artificial Intelligence & ML', code: 'CS301', credits: 4, gradeStatus: 'failed', enrolled: false }
  ];

  constructor(private http: HttpClient) {}

  getCourses(): Observable<Course[]> {
    return this.http.get<Course[]>(this.apiUrl).pipe(
      retry(2),
      tap(courses => {
        console.log(`CourseService: Loaded ${courses.length} courses`);
        this.coursesCache = courses; // Cache response
      }),
      catchError(err => {
        console.error('CourseService error fetching courses:', err);
        return throwError(() => new Error('Failed to load courses. Please make sure backend mock JSON server is active.'));
      })
    );
  }

  getCoursesSync(): Course[] {
    return this.coursesCache;
  }

  getCourseById(id: number): Observable<Course> {
    return this.http.get<Course>(`${this.apiUrl}/${id}`).pipe(
      retry(2),
      tap(course => {
        console.log(`CourseService: Loaded detail for course [${course.code}]`);
        const index = this.coursesCache.findIndex(c => c.id === course.id);
        if (index !== -1) {
          this.coursesCache[index] = course;
        }
      }),
      catchError(err => {
        console.error(`CourseService error fetching course details for ID ${id}:`, err);
        return throwError(() => new Error(`Failed to load details for course ID: ${id}`));
      })
    );
  }

  getCourseByIdSync(id: number): Course | undefined {
    return this.coursesCache.find(c => c.id === id);
  }

  // Demonstration of switchMap (Exercise 8 Task 2)
  // Explanation: switchMap maps an emitted value to a new inner Observable. When a new outer value 
  // arrives, it immediately unsubscribes from (cancels) the previous inner request. This prevents 
  // race conditions and avoids processing outdated responses.
  getEnrollmentsForCourse(courseIdStream: Observable<number>): Observable<any[]> {
    return courseIdStream.pipe(
      switchMap(id => this.http.get<any[]>(`http://localhost:3000/enrollments?courseId=${id}`))
    );
  }

  createCourse(course: Omit<Course, 'id'>): Observable<Course> {
    return this.http.post<Course>(this.apiUrl, course).pipe(
      tap(newCourse => {
        console.log('CourseService: Created new course:', newCourse);
        this.coursesCache.push(newCourse);
      }),
      catchError(err => {
        console.error('CourseService error creating course:', err);
        return throwError(() => new Error('Failed to create course.'));
      })
    );
  }

  updateCourse(course: Course): Observable<Course> {
    return this.http.put<Course>(`${this.apiUrl}/${course.id}`, course).pipe(
      tap(updatedCourse => {
        console.log('CourseService: Updated course:', updatedCourse);
        const index = this.coursesCache.findIndex(c => c.id === course.id);
        if (index !== -1) {
          this.coursesCache[index] = updatedCourse;
        }
      }),
      catchError(err => {
        console.error('CourseService error updating course:', err);
        return throwError(() => new Error(`Failed to update course ID ${course.id}`));
      })
    );
  }

  deleteCourse(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`).pipe(
      tap(() => {
        console.log(`CourseService: Deleted course ID ${id}`);
        this.coursesCache = this.coursesCache.filter(c => c.id !== id);
      }),
      catchError(err => {
        console.error('CourseService error deleting course:', err);
        return throwError(() => new Error(`Failed to delete course ID ${id}`));
      })
    );
  }
}
