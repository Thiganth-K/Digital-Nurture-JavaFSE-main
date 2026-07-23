import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Subscription } from 'rxjs';
import { CourseService } from '../../services/course';
import { Course } from '../../models/course.model';
import { CreditLabelPipe } from '../../pipes/credit-label-pipe';

@Component({
  selector: 'app-course-detail',
  imports: [CommonModule, RouterLink, CreditLabelPipe],
  templateUrl: './course-detail.html',
  styleUrl: './course-detail.css',
})
export class CourseDetail implements OnInit, OnDestroy {
  course: Course | undefined;
  errorMessage = '';
  private sub!: Subscription;

  constructor(
    private route: ActivatedRoute,
    private courseService: CourseService
  ) {}

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam) {
      const courseId = Number(idParam);
      // Subscribe to Observable (Exercise 8 Task 1)
      this.sub = this.courseService.getCourseById(courseId).subscribe({
        next: (course) => {
          this.course = course;
        },
        error: (err) => {
          this.errorMessage = err.message || 'Course details could not be loaded.';
        }
      });
    }
  }

  ngOnDestroy(): void {
    if (this.sub) {
      this.sub.unsubscribe();
    }
  }
}
