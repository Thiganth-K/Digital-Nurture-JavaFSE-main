# Exercise 9: State Management — NgRx Store, Actions, Reducers, Effects & Selectors

## Objective
Establish a centralized state management architecture for course listings and student course registrations using NgRx, defining Actions, immutable Reducers, memoized Selectors, async Effects for HTTP operations, and Redux DevTools integration.

---

## Step-by-Step Implementation

1. **NgRx Dependency Setup**:
   Installed essential packages: `@ngrx/store`, `@ngrx/effects`, and `@ngrx/store-devtools`. Registered providers in `app.config.ts` using `provideStore()`, `provideEffects([CourseEffects])`, and `provideStoreDevtools()`.

2. **Course Feature Store (`store/course/`)**:
   - **course.actions.ts**: Declared action creators mapping load lifecycle phases: `loadCourses`, `loadCoursesSuccess` (carrying the `Course[]` payload), and `loadCoursesFailure`.
   - **course.reducer.ts**: Configured the initial state structure (`courses`, `loading` boolean, `error` string) and defined the immutable transition mapping via `createReducer`.
   - **course.selectors.ts**: Formulated memoized queries using `createFeatureSelector` and `createSelector` to read courses, loading state, and errors from the store tree.
   - **course.effects.ts**: Managed asynchronous side-effects using the `Actions` stream, catching `loadCourses` triggers and calling `CourseService.getCourses()` to dispatch either success or failure actions back to the store.

3. **Enrollment Feature Store (`store/enrollment/`)**:
   - **enrollment.actions.ts**: Formulated state mutators for adding registrations, removing registrations, and setting loaded profiles: `enrollInCourse`, `unenrollFromCourse`, and `setEnrolledCourses`.
   - **enrollment.reducer.ts**: Configured the initial state storing `enrolledCourseIds: number[]`.
   - **enrollment.selectors.ts**: Created slice queries (`selectEnrolledIds`) and a cross-slice selector `selectEnrolledCourses` joining course attributes:
     ```typescript
     // Explanation: Cross-slice selectors combine states from different features (Courses list and Enrolled IDs)
     // to retrieve joined entities dynamically in memory. This represents a normalized data design pattern,
     // preventing duplications and maintaining a single source of truth.
     export const selectEnrolledCourses = createSelector(
       selectAllCourses,
       selectEnrolledIds,
       (courses, enrolledIds) => courses.filter(c => enrolledIds.includes(c.id))
     );
     ```

4. **Integration via Modern stand-alone Inject API**:
   - Injected store dependency via `inject(Store)` on property lines to prevent class initialization order warnings (`TS2729`).
   - Replaced direct service subscriptions with reactive `store.select(selector)` and `store.dispatch(action)` calls.
   - Leveraged the standard `async` pipe in templates (e.g. `filteredCourses$ | async`) to handle data subscriptions and lifecycle unsubscribes automatically.

---

## Verification Proof (Compilation Log)

The application builds successfully with full NgRx state management:

```text
> student-course-portal@0.0.0 build
> ng build

> Building...
√ Building...
Initial chunk files   | Names             |  Raw size | Estimated transfer size
chunk-OPQTWQAE.js     | -                 | 331.04 kB |                84.76 kB
main-LOEHPUFW.js      | main              |  64.06 kB |                17.38 kB
polyfills-5CFQRCPP.js | polyfills         |  34.59 kB |                11.33 kB
styles-3CQJQN77.css   | styles            |  12.82 kB |                 1.77 kB

                      | Initial total     | 442.51 kB |               115.24 kB

Lazy chunk files      | Names             |  Raw size | Estimated transfer size
chunk-UZIW6WFP.js     | enrollment-module |  17.04 kB |                 3.83 kB

Application bundle generation complete. [4.231 seconds]
Output location: D:\IMPORTANT_FILES\PROJECT_FILES\Digital-Nurture-JavaFSE-main\Java FSE\Deepskilling\Angular\student-course-portal\dist\student-course-portal
```
