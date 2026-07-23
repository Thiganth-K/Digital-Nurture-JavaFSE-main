import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Highlight } from '../../directives/highlight';
import { CreditLabelPipe } from '../../pipes/credit-label-pipe';
import { enrollInCourse, unenrollFromCourse } from '../../store/enrollment/enrollment.actions';
import { selectEnrolledIds } from '../../store/enrollment/enrollment.selectors';

@Component({
  selector: 'app-course-card',
  imports: [CommonModule, Highlight, CreditLabelPipe],
  templateUrl: './course-card.html',
  styleUrl: './course-card.css',
})
export class CourseCard implements OnChanges {
  @Input() course!: { id: number; name: string; code: string; credits: number; gradeStatus?: string; enrolled?: boolean };
  @Input() appHighlight?: string; 
  @Output() enrollRequested = new EventEmitter<number>();

  isExpanded = false;
  
  // Use inject() to avoid initialization order problems (Exercise 9 Task 2)
  private store = inject(Store);
  enrolledIds$: Observable<number[]> = this.store.select(selectEnrolledIds);

  constructor() {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['course']) {
      const prev = changes['course'].previousValue;
      const curr = changes['course'].currentValue;
      console.log(`CourseCard [${this.course?.code}] changed - Previous:`, prev, 'Current:', curr);
    }
  }

  onEnrollClick(event: Event): void {
    event.stopPropagation();
    
    this.enrolledIds$.subscribe(ids => {
      const isCurrentlyEnrolled = ids.includes(this.course.id);
      if (isCurrentlyEnrolled) {
        console.log(`CourseCard [${this.course.code}] dispatching unenrollFromCourse`);
        this.store.dispatch(unenrollFromCourse({ courseId: this.course.id }));
      } else {
        console.log(`CourseCard [${this.course.code}] dispatching enrollInCourse`);
        this.store.dispatch(enrollInCourse({ courseId: this.course.id }));
      }
    }).unsubscribe();

    this.enrollRequested.emit(this.course.id);
  }

  get cardClasses() {
    return {
      'card-expanded': this.isExpanded
    };
  }

  toggleExpand(event: Event): void {
    event.stopPropagation();
    this.isExpanded = !this.isExpanded;
  }
}
