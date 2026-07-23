# Exercise 3: Directives & Pipes — Built-in and Custom

## Objective
Enhance user interface responsiveness and display capabilities using structural directives, attribute directives, custom `@HostListener` directives, and custom pipes.

---

## Step-by-Step Implementation

1. **Structural Directives (`CourseListComponent`)**:
   - `*ngIf`: Displays a loading notification for 1.5 seconds, then replaces it with the actual course grid card view.
   - `*ngFor` with `trackBy`: Loops through the courses array and implements `trackByCourseId` to optimize rendering performance.
     ```typescript
     // Explanation: trackBy tells Angular's change detection mechanism how to track unique identifiers of array elements.
     // Instead of completely tearing down and rebuilding all DOM elements when the array updates, Angular only updates
     // elements that have changed, drastically increasing performance in large datasets.
     ```
   - `*ngSwitch` (`CourseCardComponent`): Dynamically renders color-coded badges based on course `gradeStatus` ('passed', 'failed', 'pending').
   - `noCourses` template: Shows a fallback notification if the courses array becomes empty.

2. **Attribute Directives (`CourseCardComponent`)**:
   - `[ngClass]`: Binds CSS classes dynamically. Applies `.card--enrolled` when a student registers, `.card--full` when credits >= 4, and `.expanded` when details are toggled.
     ```typescript
     // Getter for dynamic classes (Exercise 3 Task 2):
     // Explanation: Using typescript getters keeps HTML templates clean and readable, keeping complex conditional styling logic
     // encapsulated in components where it can be unit-tested.
     get cardClasses() {
       return {
         'card--enrolled': this.course.enrolled,
         'card--full': this.course.credits >= 4,
         'expanded': this.isExpanded
       };
     }
     ```
   - `[ngStyle]`: Dynamically colors the left border of the card based on the grade status (Green for Passed, Red for Failed, Grey for Pending).

3. **Custom Highlight Directive**:
   - Path: `src/app/directives/highlight.ts`
   - Configures a hover background highlight using `@HostListener('mouseenter')` and `@HostListener('mouseleave')` and a custom configurable `@Input() appHighlight` color parameter.

4. **Custom Credit Label Pipe**:
   - Path: `src/app/pipes/credit-label-pipe.ts`
   - Formats credit counts cleanly: `1` -> `'1 Credit'`, `2` -> `'2 Credits'`, `0` or null -> `'No Credits'`.

---

## Verification Proof (Compilation Log)

The application builds successfully with the directive and pipe integrated:

```text
> student-course-portal@0.0.0 build
> ng build

> Building...
√ Building...
Initial chunk files   | Names         |  Raw size | Estimated transfer size
main-MBBJKSZ2.js      | main          | 281.00 kB |                74.36 kB
polyfills-5CFQRCPP.js | polyfills     |  34.59 kB |                11.33 kB
styles-3CQJQN77.css   | styles        |  12.82 kB |                 1.77 kB

                      | Initial total | 328.40 kB |                87.47 kB

Application bundle generation complete. [2.332 seconds]
Output location: D:\IMPORTANT_FILES\PROJECT_FILES\Digital-Nurture-JavaFSE-main\Java FSE\Deepskilling\Angular\student-course-portal\dist\student-course-portal
```
