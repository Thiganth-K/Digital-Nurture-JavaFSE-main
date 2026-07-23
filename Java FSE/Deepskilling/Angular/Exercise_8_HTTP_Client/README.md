# Exercise 8: HTTP Client & Interceptors

## Objective
Connect services to a backend database using Angular's `HttpClient`, perform CRUD data synchronization against a local mock `json-server`, manage data streams with complex RxJS operators, and implement functional request interceptors for authorization headers, error handling, and loading state spinners.

---

## Step-by-Step Implementation

1. **Mock JSON Backend (`db.json`)**:
   Setup `db.json` inside the Exercise folder structure:
   - Contains arrays for `courses`, `students`, and `enrollments` schemas.
   - Run command to spin up json-server: `json-server --watch db.json --port 3000`.

2. **HttpClient Integration (`app.config.ts`)**:
   Configured the global application bootstrap file using the modern provider:
   ```typescript
   provideHttpClient(
     withInterceptors([authInterceptor, errorHandlerInterceptor, loadingInterceptor])
   )
   ```

3. **Service Refactoring to Observables (`services/course.ts`)**:
   - Transformed `CourseService` methods to return `Observable` streams querying `http://localhost:3000/courses` (GET, POST, PUT, DELETE).
   - Injected `HttpClient` and implemented internal caching (`coursesCache`) to allow components and dependent services to access cached representations synchronously without redundant HTTP calls.

4. **RxJS Pipe Operators**:
   - **`retry(2)`**: Retries failed calls twice before passing errors down.
   - **`tap`**: Executes side-effects (e.g. logging) without altering data.
     ```typescript
     // Explanation: tap is used for side-effects, keeping map operations strictly for transforming data.
     // By separating side-effects from data transformations, code remains testable and streams pure.
     ```
   - **`catchError`**: Catches network/response errors and maps them to user-friendly messages using `throwError`.
   - **`switchMap`**: Demonstrates chaining dynamic course ID queries to map them to backend enrollment listings:
     ```typescript
     // Explanation: switchMap automatically cancels the previous pending inner request when a new outer
     // value arrives. This is critical in avoiding race conditions during fast navigations.
     ```

5. **Functional Interceptors**:
   - **`authInterceptor`**: Clones request objects and appends `Authorization: Bearer mock-token-12345` headers to outgoing calls.
   - **`errorHandlerInterceptor`**: Catches status code errors (401 redirecting to `/` and 500 logging critical failures).
   - **`loadingInterceptor`**: Sets the global `Loading` BehaviorSubject state to `true` on dispatch, and resolves back to `false` inside the RxJS `finalize` operator once completed or failed.

---

## Verification Proof (Compilation Log)

The application builds successfully with full HTTP services and interceptors:

```text
> student-course-portal@0.0.0 build
> ng build

> Building...
√ Building...
Initial chunk files   | Names             |  Raw size | Estimated transfer size
chunk-B4W5KVZ4.js     | -                 | 322.54 kB |                82.22 kB
main-WKHQS4IF.js      | main              |  35.16 kB |                 8.40 kB
polyfills-5CFQRCPP.js | polyfills         |  34.59 kB |                11.33 kB
styles-3CQJQN77.css   | styles            |  12.82 kB |                 1.77 kB

                      | Initial total     | 405.11 kB |               103.73 kB

Lazy chunk files      | Names             |  Raw size | Estimated transfer size
chunk-SHFLXEXM.js     | enrollment-module |  17.02 kB |                 3.83 kB

Application bundle generation complete. [3.041 seconds]
Output location: D:\IMPORTANT_FILES\PROJECT_FILES\Digital-Nurture-JavaFSE-main\Java FSE\Deepskilling\Angular\student-course-portal\dist\student-course-portal
```
