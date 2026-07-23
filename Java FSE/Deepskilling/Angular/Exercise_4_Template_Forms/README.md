# Exercise 4: Template-Driven Forms & Validation

## Objective
Design and implement a student course enrollment request form using Angular's template-driven forms, configure validation rules, handle error messages, customize invalid/valid inputs, and support form submission and reset capabilities.

---

## Step-by-Step Implementation

1. **Scaffold Form Component**:
   Generated `EnrollmentFormComponent` and mapped it to the `/enroll` path in `app.routes.ts`.
   
2. **Form Layout & Template bindings (`enrollment-form.html`)**:
   - Declared form reference container `#enrollForm="ngForm"` capturing the form model state, bound to `(ngSubmit)="onSubmit(enrollForm)"`.
   - Setup five form controls with `[(ngModel)]` binding to model properties and explicit `name` attributes:
     - `studentName` (text input)
     - `studentEmail` (email input)
     - `courseId` (number input)
     - `preferredSemester` (select box)
     - `agreeToTerms` (checkbox input)

3. **Form Validation Rules**:
   - `studentName`: `required` and `minlength="3"`.
   - `studentEmail`: `required` and standard `email` pattern checking.
   - `courseId`: `required`.
   - `agreeToTerms`: `required` (must be checked).
   - Displayed specific warning text elements dynamically using template reference variables (e.g. `#nameCtrl="ngModel"`):
     ```html
     <div class="error-container" *ngIf="nameCtrl.touched && nameCtrl.errors">
       <span class="error-message" *ngIf="nameCtrl.errors['required']">Name is required.</span>
       <span class="error-message" *ngIf="nameCtrl.errors['minlength']">Name must be at least 3 characters.</span>
     </div>
     ```

4. **Style Borders & Control Actions**:
   - Styled invalid and valid fields dynamically using standard CSS variables (mapped to custom `.ng-invalid.ng-touched` and `.ng-valid.ng-touched` in `styles.css`).
   - Disabled the submit button until the entire form model became valid: `[disabled]="enrollForm.invalid"`.
   - Bound the reset button to `enrollForm.resetForm()`, restoring option fields to default values and resetting all validation states.

---

## Verification Proof (Console Log Trace)

Below is the console output captured when a user fills out the form correctly and submits it:

### 1. Initial State (Submit disabled):
Form is invalid because fields are empty.

### 2. User Enters Values & Submits:
- Student Name: `"HandsOn Student"`
- Student Email: `"student@handson.com"`
- Course ID: `201`
- Semester: `"Odd"`
- Terms Checkbox: `true`

```text
Template-Driven Form Submitted successfully!
Form Value: {studentName: "HandsOn Student", studentEmail: "student@handson.com", courseId: 201, preferredSemester: "Odd", agreeToTerms: true}
Form Validity: true
```
*(The UI renders a success notification panel, and fields highlight with green borders)*
