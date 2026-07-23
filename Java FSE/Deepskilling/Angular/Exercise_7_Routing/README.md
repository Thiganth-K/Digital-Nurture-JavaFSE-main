# Exercise 7: Angular Routing — Guards, Lazy Loading & Route Data

## Objective
Configure application-wide routing including dynamic parameter mapping, nested layouts, wildcard navigation, route-based search synchronization, lazy feature module splitting, and navigation protection using `CanActivate` and `CanDeactivate` guards.

---

## Step-by-Step Implementation

1. **Scaffold Layout & Detail Components**:
   - Generated `CourseDetail` and `CoursesLayout`.
   - Setup nested child routes under `/courses` in `app.routes.ts`:
     ```typescript
     { 
       path: 'courses', 
       component: CoursesLayout, 
       children: [
         { path: '', component: CourseList },
         { path: ':id', component: CourseDetail }
       ] 
     }
     ```

2. **Route Parameter & Query Parameter Synchronization**:
   - **Route Parameters**: In `CourseDetail`, injected `ActivatedRoute` and queried the ID parameter dynamically using `this.route.snapshot.paramMap.get('id')` to display specific course details.
   - **Query Parameters**: In `CourseList`, dynamically synchronized search input changes to the URL query string: `/courses?search=angular`. Initialized the search term on load by reading the query string parameter from `route.snapshot.queryParamMap.get('search')`.

3. **Wildcard Routing**:
   - Added `{ path: '**', component: NotFound }` at the end of the routing array to catch any unrecognized URLs and show a stylish 404 message.

4. **Lazy Loaded Feature Module**:
   - Created the `EnrollmentModule` containing all template-driven and reactive form components.
   - Configured the main routes mapping using a dynamic import loader to enable code-splitting:
     ```typescript
     { 
       path: 'enroll', 
       canActivate: [authGuard], 
       loadChildren: () => import('./features/enrollment/enrollment-module').then(m => m.EnrollmentModule) 
     }
     ```

5. **Route Protection & Guards**:
   - **AuthGuard (`canActivate`)**: Restricts access to `/profile` and `/enroll` paths. Injects `AuthService` and checks `isLoggedIn`. If false, cancels navigation and redirects to `/`.
   - **UnsavedChangesGuard (`canDeactivate`)**: Protects the reactive form at `/enroll/reactive`. Prompts a confirmation alert `window.confirm()` if the user attempts to navigate away while the form is dirty (modified) and unsubmitted.

---

## Verification Proof (Compilation Log)

The build output logs verify that Angular successfully compiled and generated a separate lazy-loaded chunk for the enrollment feature (`enrollment-module`):

```text
> student-course-portal@0.0.0 build
> ng build

> Building...
√ Building...
Initial chunk files   | Names             |  Raw size | Estimated transfer size
chunk-ID4W5BOP.js     | -                 | 301.92 kB |                76.83 kB
polyfills-5CFQRCPP.js | polyfills         |  34.59 kB |                11.33 kB
main-D5RO6KG6.js      | main              |  29.74 kB |                 7.23 kB
styles-3CQJQN77.css   | styles            |  12.82 kB |                 1.77 kB

                      | Initial total     | 379.06 kB |                97.16 kB

Lazy chunk files      | Names             |  Raw size | Estimated transfer size
chunk-MPBYBXEW.js     | enrollment-module |  17.02 kB |                 3.84 kB

Application bundle generation complete. [3.207 seconds]
Output location: D:\IMPORTANT_FILES\PROJECT_FILES\Digital-Nurture-JavaFSE-main\Java FSE\Deepskilling\Angular\student-course-portal\dist\student-course-portal
```
