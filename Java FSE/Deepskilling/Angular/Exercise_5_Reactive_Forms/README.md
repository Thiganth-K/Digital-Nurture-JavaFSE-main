# Exercise 5: Reactive Forms & Custom Validation

## Objective
Design and implement a dynamic Student Enrollment Portal using Angular's reactive forms (`FormBuilder`, `FormGroup`, `FormControl`, `FormArray`), implement custom synchronous and asynchronous validators, and manage repeating form controls dynamically.

---

## Step-by-Step Implementation

1. **Scaffold Component**:
   Generated `ReactiveEnrollmentFormComponent` and mapped it to the `/enroll-reactive` path.

2. **Form Group Initialization (`reactive-enrollment-form.ts`)**:
   Built the reactive structure inside `ngOnInit` using `FormBuilder`:
   - `studentName`: Synchronous validation (`Validators.required`, `Validators.minLength(3)`).
   - `studentEmail`: Synchronous validation (`Validators.required`, `Validators.email`) and custom asynchronous validation (`simulateEmailCheck`). Updates on `blur` to optimize execution checks.
   - `courseId`: Synchronous validation (`Validators.required`, custom synchronous validator `noCourseCode`).
   - `preferredSemester`: `Validators.required`.
   - `agreeToTerms`: `Validators.requiredTrue` (ensures checkbox is checked).
   - `additionalCourses`: Empty `FormArray` for dynamic input rows.

3. **Custom Validators**:
   - **Custom Sync Validator (`noCourseCode`)**:
     Checks the string input and returns `{ noCourseCode: true }` if the value starts with `'XX'` (disallowed prefix).
   - **Custom Async Validator (`simulateEmailCheck`)**:
     Simulates a backend API check by returning a Promise that resolves after 800ms. If the email contains `'test@'`, it rejects it with `{ emailTaken: true }`.

4. **Dynamic repeating fields (`FormArray`)**:
   - Implemented a typed getter in TS: `get additionalCourses() { return this.enrollForm.get('additionalCourses') as FormArray; }`.
   - Added `addCourse()` which pushes a new FormControl to the array, and `removeCourse(index)` which removes it.
   - Bound the template dynamically using standard `formArrayName="additionalCourses"` and `[formControlName]="i"`.

5. **Explanations of API Differences**:
   - **`enrollForm.value` vs `enrollForm.getRawValue()`**:
     - `value` retrieves the properties of all active controls, but *excludes* any controls that are currently disabled.
     - `getRawValue()` retrieves values from *all* controls within the form group, regardless of their disabled or enabled state.
   - **Why use a typed getter in TypeScript rather than template casting**:
     - Typed getters provide compiler-time type-safety. Standard HTML templates do not support TS casting (like `as FormArray`), making raw template queries error-prone.

---

## Verification Proof (Compilation Log)

The application builds successfully with the reactive forms system:

```text
> student-course-portal@0.0.0 build
> ng build

> Building...
√ Building...
Initial chunk files   | Names         |  Raw size | Estimated transfer size
main-45C35AWY.js      | main          | 327.02 kB |                82.09 kB
polyfills-5CFQRCPP.js | polyfills     |  34.59 kB |                11.33 kB
styles-3CQJQN77.css   | styles        |  12.82 kB |                 1.77 kB

                      | Initial total | 374.43 kB |                95.20 kB

Application bundle generation complete. [3.068 seconds]
Output location: D:\IMPORTANT_FILES\PROJECT_FILES\Digital-Nurture-JavaFSE-main\Java FSE\Deepskilling\Angular\student-course-portal\dist\student-course-portal
```
