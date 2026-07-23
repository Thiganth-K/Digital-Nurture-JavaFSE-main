import { CanDeactivateFn } from '@angular/router';
import { ReactiveEnrollmentForm } from '../pages/reactive-enrollment-form/reactive-enrollment-form';

export const unsavedChangesGuard: CanDeactivateFn<ReactiveEnrollmentForm> = (
  component: ReactiveEnrollmentForm
) => {
  // If form is modified/dirty and NOT submitted yet, warn user before navigating away
  if (component.enrollForm?.dirty && !component.submitted) {
    return window.confirm('You have unsaved changes. Leave?');
  }
  return true;
};
