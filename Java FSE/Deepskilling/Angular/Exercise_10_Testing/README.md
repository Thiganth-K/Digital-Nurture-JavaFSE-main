# Exercise 10: Unit Testing Angular Applications

## Objective
Configure and write isolated unit tests for components, HTTP services, and NgRx-connected containers using Jasmine assertions, TestBed injection configurations, spies, and mock state stores.

---

## Step-by-Step Implementation

1. **Standalone Component Testing (`components/course-card/course-card.spec.ts`)**:
   - Configured `TestBed` importing the standalone `CourseCard` component and providing a mock store via `provideMockStore()` to satisfy the injected `Store` dependency.
   - **should create**: Asserts that the component class instantiates successfully.
   - **@Input() rendering**: Assigns a mock course input, calls `fixture.detectChanges()`, and checks the DOM `h3` element to verify the title rendering.
   - **@Output() event emitter**: Sets up a spy on the `enrollRequested` EventEmitter, simulates a user click event on the enrollment button, and asserts that the spy is triggered with the correct course ID parameter.
   - **ngOnChanges execution**: Spies on `console.log` and calls `ngOnChanges` directly with a mock changes object to verify change logging behaviour.

2. **Http Service Testing (`services/course.spec.ts`)**:
   - Built the test suite using modern Angular standalone providers: `provideHttpClient()` and `provideHttpClientTesting()`.
   - Injected the `HttpTestingController` to intercept outgoing HTTP calls.
   - Asserted that `getCourses()` triggers an HTTP `GET` request to the correct REST API endpoint and flushed mock course data back to verify clean subscription handling.

3. **NgRx Store Component Testing (`pages/course-list/course-list.spec.ts`)**:
   - Instantiated `CourseList` with selector mock configurations via `provideMockStore()`.
   - Setup a spy on `store.dispatch` and verified that initializing the component dispatches the `loadCourses()` action to populate the state tree.

4. **Additional Service Coverage (`auth`, `loading`, `enrollment`, `notification`)**:
   - Refactored generated service specs to correctly map classes (`AuthService`, `EnrollmentService`, `NotificationService`) and satisfy constructor-injected dependency requirements.

---

## Verification Proof (Karma Test Suite Output)

Below is the complete console log output after running the 13 unit tests via `npx ng test --watch=false`:

```text
> student-course-portal@0.0.0 test
> ng test --watch=false

> Building...
√ Building...
Initial chunk files       | Names                  |  Raw size
chunk-TX7LFKLD.js         | -                      |   2.30 MB | 
polyfills.js              | polyfills              |   1.04 MB | 
spec-course-list.spec.js  | spec-course-list.spec  | 241.51 kB | 
chunk-U43V73ZC.js         | -                      | 241.00 kB | 
chunk-GIS4ICRB.js         | -                      | 231.95 kB | 
chunk-UVLTMUS3.js         | -                      |  96.66 kB | 
jasmine-cleanup-1.js      | jasmine-cleanup-1      |  67.20 kB | 
chunk-HVBN5AUJ.js         | -                      |  59.82 kB | 
chunk-TGB2JT55.js         | -                      |  24.09 kB | 
test_main.js              | test_main              |  21.86 kB | 
chunk-6BIG4NN7.js         | -                      |  15.37 kB | 
styles.css                | styles                 |   5.46 kB | 
spec-app.spec.js          | spec-app.spec          |   4.77 kB | 
spec-enrollment.spec.js   | spec-enrollment.spec   |   3.51 kB | 
spec-course-card.spec.js  | spec-course-card.spec  |   3.10 kB | 
chunk-3FMBEB3S.js         | -                      |   2.13 kB | 
spec-course.spec.js       | spec-course.spec       |   1.39 kB | 
spec-notification.spec.js | spec-notification.spec |   1.04 kB | 
spec-loading.spec.js      | spec-loading.spec      | 937 bytes | 
chunk-PHAB22HX.js         | -                      | 936 bytes | 
spec-auth.spec.js         | spec-auth.spec         | 801 bytes | 
jasmine-cleanup-0.js      | jasmine-cleanup-0      | 519 bytes | 

                          | Initial total          |   4.36 MB

Application bundle generation complete. [1.859 seconds]

23 07 2026 18:45:44.195:INFO [karma-server]: Karma v6.4.4 server started at http://localhost:9876/
23 07 2026 18:45:44.196:INFO [launcher]: Launching browsers Chrome with concurrency unlimited
23 07 2026 18:45:44.216:INFO [launcher]: Starting browser Chrome
23 07 2026 18:45:44.987:INFO [Chrome 150.0.0.0 (Windows 10)]: Connected on socket ifMnYMJtHPFh5iYVAAAB with id 93179928
Chrome 150.0.0.0 (Windows 10): Executed 0 of 13 SUCCESS (0 secs / 0 secs)
Chrome 150.0.0.0 (Windows 10): Executed 1 of 13 SUCCESS (0 secs / 0.008 secs)
Chrome 150.0.0.0 (Windows 10): Executed 2 of 13 SUCCESS (0 secs / 0.01 secs)
LOG: 'CourseService: Loaded 1 courses'
LOG: 'CourseService: Loaded 1 courses'
Chrome 150.0.0.0 (Windows 10): Executed 3 of 13 SUCCESS (0 secs / 0.014 secs)
Chrome 150.0.0.0 (Windows 10): Executed 4 of 13 SUCCESS (0 secs / 0.016 secs)
Chrome 150.0.0.0 (Windows 10): Executed 5 of 13 SUCCESS (0 secs / 0.097 secs)
Chrome 150.0.0.0 (Windows 10): Executed 6 of 13 SUCCESS (0 secs / 0.103 secs)
Chrome 150.0.0.0 (Windows 10): Executed 7 of 13 SUCCESS (0 secs / 0.113 secs)
Chrome 150.0.0.0 (Windows 10): Executed 8 of 13 SUCCESS (0 secs / 0.116 secs)
Chrome 150.0.0.0 (Windows 10): Executed 9 of 13 SUCCESS (0 secs / 0.125 secs)
LOG: 'CourseCard [CS101] dispatching enrollInCourse'
LOG: 'CourseCard [CS101] dispatching enrollInCourse'
Chrome 150.0.0.0 (Windows 10): Executed 10 of 13 SUCCESS (0 secs / 0.13 secs)
Chrome 150.0.0.0 (Windows 10): Executed 11 of 13 SUCCESS (0 secs / 0.135 secs)
Chrome 150.0.0.0 (Windows 10): Executed 12 of 13 SUCCESS (0 secs / 0.138 secs)
Chrome 150.0.0.0 (Windows 10): Executed 13 of 13 SUCCESS (0 secs / 0.139 secs)
Chrome 150.0.0.0 (Windows 10): Executed 13 of 13 SUCCESS (0.159 secs / 0.139 secs)
TOTAL: 13 SUCCESS
```
*(Tests completed successfully with 0 failures)*
