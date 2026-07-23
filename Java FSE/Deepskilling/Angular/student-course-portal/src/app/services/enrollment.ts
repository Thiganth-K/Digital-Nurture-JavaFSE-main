import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CourseService } from './course';
import { Course } from '../models/course.model';

@Injectable({
  providedIn: 'root',
})
export class EnrollmentService {
  private apiUrl = 'http://localhost:3000/enrollments';
  private enrolledCourseIds: number[] = [];

  constructor(
    private http: HttpClient, 
    private courseService: CourseService
  ) {
    this.syncWithBackend();
  }

  // Populate local array from json-server on startup
  private syncWithBackend(): void {
    this.http.get<any[]>(this.apiUrl).subscribe({
      next: (data) => {
        this.enrolledCourseIds = data.map(item => Number(item.courseId));
        console.log('EnrollmentService: Restored enrolled IDs from backend:', this.enrolledCourseIds);
      },
      error: (err) => {
        console.error('EnrollmentService: Failed to restore state from backend:', err);
      }
    });
  }

  enroll(courseId: number): void {
    if (!this.isEnrolled(courseId)) {
      this.enrolledCourseIds.push(courseId);
      
      // Perform HTTP POST to json-server to save state
      this.http.post(this.apiUrl, { courseId: courseId }).subscribe({
        next: (res) => console.log('EnrollmentService: Backend sync successful for enroll ID:', courseId),
        error: (err) => console.error('EnrollmentService: Backend sync failed for enroll ID:', courseId)
      });

      // Update the cached course model status
      const course = this.courseService.getCourseByIdSync(courseId);
      if (course) {
        course.enrolled = true;
      }
    }
  }

  unenroll(courseId: number): void {
    const index = this.enrolledCourseIds.indexOf(courseId);
    if (index !== -1) {
      this.enrolledCourseIds.splice(index, 1);
      
      // Fetch enrollment ID from backend first, then execute DELETE request
      this.http.get<any[]>(this.apiUrl).subscribe({
        next: (enrollments) => {
          const matched = enrollments.find(e => Number(e.courseId) === courseId);
          if (matched) {
            this.http.delete(`${this.apiUrl}/${matched.id}`).subscribe({
              next: () => console.log('EnrollmentService: Backend sync successful for unenroll ID:', courseId),
              error: (err) => console.error('EnrollmentService: Backend sync failed for delete request')
            });
          }
        }
      });

      // Update the cached course model status
      const course = this.courseService.getCourseByIdSync(courseId);
      if (course) {
        course.enrolled = false;
      }
    }
  }

  isEnrolled(courseId: number): boolean {
    return this.enrolledCourseIds.includes(courseId);
  }

  getEnrolledCourses(): Course[] {
    // Read from the CourseService local cache (synchronous resolution)
    const allCourses = this.courseService.getCoursesSync();
    return allCourses.filter(c => this.enrolledCourseIds.includes(c.id));
  }
}
