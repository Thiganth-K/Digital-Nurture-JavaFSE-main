import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Course } from '../../models/course.model';
import { selectEnrolledCourses } from '../../store/enrollment/enrollment.selectors';
import { NotificationComponent } from '../../components/notification/notification';
import { CreditLabelPipe } from '../../pipes/credit-label-pipe';

@Component({
  selector: 'app-student-profile',
  imports: [CommonModule, NotificationComponent, CreditLabelPipe],
  templateUrl: './student-profile.html',
  styleUrl: './student-profile.css',
})
export class StudentProfile implements OnInit {
  student = {
    name: 'HandsOn Student',
    email: 'student@handson.com',
    major: 'Computer Science & Engineering',
    gpa: 3.8,
    semester: 'Semester 5 (Fall)',
    studentId: 'CS20260723'
  };

  // Use inject() to avoid initialization order problems (Exercise 9 Task 2)
  private store = inject(Store);
  enrolledCourses$: Observable<Course[]> = this.store.select(selectEnrolledCourses);

  constructor() {}

  ngOnInit(): void {}
}
