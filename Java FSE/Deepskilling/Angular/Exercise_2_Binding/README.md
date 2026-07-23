# Exercise 2: Data Binding, Lifecycle Hooks & Component Communication

## Objective
Implement all four data binding types, manage component lifecycle phases, and establish structured parent-child communication channels using `@Input()` and `@Output()`.

---

## Step-by-Step Implementation

1. **Four Binding Types (Home Component)**:
   - *Interpolation*: Displaying the portal name: `<h1>Welcome to the {{ portalName }}</h1>`.
   - *Property Binding*: Controlling the button's disabled state: `<button [disabled]="!isPortalActive">`.
   - *Event Binding*: Handling the click event to open enrollment: `(click)="onEnrollClick()"`.
   - *Two-Way Binding*: Syncing the course search term in real-time using `[(ngModel)]="searchTerm"`.
   - *Code Comment Explanation*:
     ```typescript
     // [property] (one-way binding) pushes data from the component state down to the DOM.
     // [(ngModel)] (two-way binding) establishes a bidirectional sync: changes in the component
     // update the DOM, and changes in the DOM (user typing) immediately update the component state.
     ```

2. **Lifecycle Hooks**:
   - **ngOnInit** inside `Home` page component: Simulates database checks and logs `'HomeComponent initialised — courses loaded'` to the developer console.
   - **ngOnDestroy** inside `Home` page component: Cleans up state and logs `'HomeComponent destroyed'` to the developer console upon navigating away.
   - **ngOnChanges** inside `CourseCard` component: Intercepts and logs input changes using the `SimpleChanges` object. It prints previous and current values.

3. **Parent-Child Communication**:
   - **CourseCard (Child)**: Receives the course object via `@Input() course` and triggers an event up via `@Output() enrollRequested = new EventEmitter<number>()` when clicking the Enroll button.
   - **CourseList (Parent)**: Defers display to `<app-course-card>` elements inside a list loop (`*ngFor`), binds the `enrollRequested` output to `onEnroll($event)`, and displays the selected ID under a banner.

---

## Verification Proof (Console Log Traces)

During execution, the following events occur and trace inside the browser console:

### 1. Navigating to Home Page:
```text
HomeComponent initialised — courses loaded
```

### 2. Navigating to Course List (renders 5 course cards):
```text
HomeComponent destroyed
CourseCard [CS101] changed - Previous: undefined Current: {id: 1, name: "Data Structures & Algorithms", code: "CS101", credits: 4, gradeStatus: "passed", enrolled: false}
CourseCard [CS102] changed - Previous: undefined Current: {id: 2, name: "Web Development Basics", code: "CS102", credits: 3, gradeStatus: "passed", enrolled: false}
CourseCard [CS201] changed - Previous: undefined Current: {id: 3, name: "Database Management Systems", code: "CS201", credits: 4, gradeStatus: "pending", enrolled: false}
CourseCard [CS202] changed - Previous: undefined Current: {id: 4, name: "Software Engineering Principles", code: "CS202", credits: 3, gradeStatus: "pending", enrolled: false}
CourseCard [CS301] changed - Previous: undefined Current: {id: 5, name: "Artificial Intelligence & ML", code: "CS301", credits: 4, gradeStatus: "failed", enrolled: false}
```

### 3. Clicking "Enroll" on "Database Management Systems" (Course ID 3):
```text
Enrolling in course ID: 3
CourseCard [CS201] changed - Previous: {id: 3, name: "Database Management Systems", code: "CS201", ...} Current: {id: 3, name: "Database Management Systems", code: "CS201", ... enrolled: true}
```
*(The card visual classes dynamically update and highlight the enrolled item, and the Selected Course Reference ID banner renders on the page)*
