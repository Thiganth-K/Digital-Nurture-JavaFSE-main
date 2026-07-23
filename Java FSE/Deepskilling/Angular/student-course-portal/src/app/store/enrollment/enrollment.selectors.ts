import { createFeatureSelector, createSelector } from '@ngrx/store';
import { EnrollmentState } from './enrollment.reducer';
import { selectAllCourses } from '../course/course.selectors';

export const selectEnrollmentState = createFeatureSelector<EnrollmentState>('enrollment');

export const selectEnrolledIds = createSelector(
  selectEnrollmentState,
  state => state.enrolledCourseIds
);

// Cross-slice selector (Exercise 9 Task 2 step 99)
// Explanation: A cross-slice selector retrieves slices of state from two distinct features
// (Course list and Enrolled IDs) and joins them dynamically in memory. This represents a powerful
// clean design pattern because it keeps the state tree normalized (no duplicated Course data)
// while allowing subscribers to retrieve fully joined data structures easily.
export const selectEnrolledCourses = createSelector(
  selectAllCourses,
  selectEnrolledIds,
  (courses, enrolledIds) => courses.filter(c => enrolledIds.includes(c.id))
);
