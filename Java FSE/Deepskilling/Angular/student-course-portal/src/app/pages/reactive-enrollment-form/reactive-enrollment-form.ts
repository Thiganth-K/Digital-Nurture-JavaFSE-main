import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, FormArray, FormControl, Validators, AbstractControl, ValidationErrors } from '@angular/forms';

// Custom Synchronous Validator (Exercise 5 Task 2)
function noCourseCode(control: AbstractControl): ValidationErrors | null {
  if (control.value && String(control.value).toUpperCase().startsWith('XX')) {
    return { noCourseCode: true };
  }
  return null;
}

// Custom Asynchronous Validator (Exercise 5 Task 2)
function simulateEmailCheck(control: AbstractControl): Promise<ValidationErrors | null> {
  return new Promise((resolve) => {
    setTimeout(() => {
      if (control.value && String(control.value).toLowerCase().includes('test@')) {
        resolve({ emailTaken: true });
      } else {
        resolve(null);
      }
    }, 800);
  });
}

@Component({
  selector: 'app-reactive-enrollment-form',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './reactive-enrollment-form.html',
  styleUrl: './reactive-enrollment-form.css',
})
export class ReactiveEnrollmentForm implements OnInit {
  enrollForm!: FormGroup;
  submitted = false;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.enrollForm = this.fb.group({
      studentName: ['', [Validators.required, Validators.minLength(3)]],
      // Apply email regex validation and the custom async email checker
      studentEmail: ['', {
        validators: [Validators.required, Validators.email],
        asyncValidators: [simulateEmailCheck],
        updateOn: 'blur' // Run validation when user focuses away (improves UX)
      }],
      // Apply synchronous required validation and custom courseId validator
      courseId: ['', [Validators.required, noCourseCode]],
      preferredSemester: ['Odd', Validators.required],
      agreeToTerms: [false, Validators.requiredTrue],
      // Dynamic FormArray for additional courses
      additionalCourses: this.fb.array([])
    });
  }

  // Typed getter for dynamic FormArray (Exercise 5 Task 2)
  // Explanation: A strongly-typed getter in TypeScript ensures compilation-time type checking.
  // Casting inside template strings (e.g. `as FormArray`) is not supported natively by the compiler,
  // making templates error-prone and harder to refactor.
  get additionalCourses(): FormArray {
    return this.enrollForm.get('additionalCourses') as FormArray;
  }

  addCourse(): void {
    this.additionalCourses.push(this.fb.control('', Validators.required));
  }

  removeCourse(index: number): void {
    this.additionalCourses.removeAt(index);
  }

  onSubmit(): void {
    if (this.enrollForm.valid) {
      console.log('Reactive Form Submitted successfully!');
      
      // Explanation of difference:
      // enrollForm.value: returns active form values but EXCLUDES values from any form controls
      // that have been explicitly disabled in state configuration.
      // enrollForm.getRawValue(): returns values from ALL controls within the form group, 
      // regardless of their disabled/enabled state.
      console.log('Form Value (Excludes disabled):', this.enrollForm.value);
      console.log('Form Raw Value (Includes disabled):', this.enrollForm.getRawValue());
      
      this.submitted = true;
    }
  }

  onReset(): void {
    this.enrollForm.reset({
      preferredSemester: 'Odd',
      agreeToTerms: false
    });
    this.additionalCourses.clear();
    this.submitted = false;
  }
}
