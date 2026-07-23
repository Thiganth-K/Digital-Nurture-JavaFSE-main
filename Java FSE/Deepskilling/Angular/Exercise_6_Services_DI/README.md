# Exercise 6: Services & Dependency Injection

## Objective
Centralize business logic and share data across multiple components using Angular services and dependency injection. Explore singleton services vs component-scoped services and hierarchy resolution.

---

## Step-by-Step Implementation

1. **Singleton Course Service (`services/course.ts`)**:
   - Manages a private state of 5 courses.
   - Provided at the root level using `@Injectable({ providedIn: 'root' })`, meaning only a single instance of `CourseService` is instantiated and shared globally.
   - Implemented standard getters and mutations: `getCourses()`, `getCourseById()`, and `addCourse()`.

2. **Service-to-Service Injection (`services/enrollment.ts`)**:
   - Injects the singleton `CourseService` inside `EnrollmentService`'s constructor.
   - Manages an independent array `enrolledCourseIds`.
   - Resolves course ID values to full `Course` objects by querying `CourseService.getCourseById()`.

3. **Singleton DI Integration**:
   - **CourseList**: Injects `CourseService` and `EnrollmentService`. Fetches courses on init, replacing hardcoded component states. Registers/unregisters enrollments in `onEnroll()`.
   - **Home**: Injects both services to dynamically compute dashboard statistics (e.g. `coursesCount = courseService.getCourses().length`).
   - **StudentProfile**: Injects `EnrollmentService` and displays the list of enrolled courses dynamically.

4. **Component-Scoped Dependency Injection**:
   - Created `NotificationComponent` and custom `NotificationService`.
   - Provided the service at the component level:
     ```typescript
     @Component({
       selector: 'app-notification',
       providers: [NotificationService], // Scoped Provider
       ...
     })
     ```
   - *Explanation of Component-Scoped DI*:
     - Declaring `providers: [NotificationService]` in the `@Component` decorator instructs Angular's injector hierarchy to instantiate a *new* instance of the service whenever this component is created.
     - Unlike root-level singleton services, multiple instances of `NotificationComponent` on a page will have isolated message lists since each is injected with its own separate service instance.

---

## Verification Proof (Compilation Log)

The application builds successfully with the service integration:

```text
> student-course-portal@0.0.0 build
> ng build

> Building...
√ Building...
Initial chunk files   | Names         |  Raw size | Estimated transfer size
main-BS3WM5IG.js      | main          | 330.63 kB |                82.80 kB
polyfills-5CFQRCPP.js | polyfills     |  34.59 kB |                11.33 kB
styles-3CQJQN77.css   | styles        |  12.82 kB |                 1.77 kB

                      | Initial total | 378.04 kB |                95.91 kB

Application bundle generation complete. [2.777 seconds]
Output location: D:\IMPORTANT_FILES\PROJECT_FILES\Digital-Nurture-JavaFSE-main\Java FSE\Deepskilling\Angular\student-course-portal\dist\student-course-portal
```
