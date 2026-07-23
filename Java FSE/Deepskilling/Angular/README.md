# Angular Hands-On Labs (Deepskilling)

This directory contains the implementations, configuration files, step-by-step walkthroughs, and console verification logs for all 10 Angular Hands-On Exercises.

All exercises are built inside a single, unified Angular Single Page Application (SPA) named **Student Course Portal** (`student-course-portal`), progressing from basic setup to complex integrations like forms, routing, HTTP services, RxJS, NgRx, and unit testing.

## Folder Structure

The project has been organized into the following sub-directories:

*   **[student-course-portal](file:///D:/IMPORTANT_FILES/PROJECT_FILES/Digital-Nurture-JavaFSE-main/Java%20FSE/Deepskilling/Angular/student-course-portal)**: The core Angular project folder containing all codebase implementations.
*   **[Exercise_1_Setup](file:///D:/IMPORTANT_FILES/PROJECT_FILES/Digital-Nurture-JavaFSE-main/Java%20FSE/Deepskilling/Angular/Exercise_1_Setup)**: Angular CLI project scaffolding, configuration notes, and initial page layout.
*   **[Exercise_2_Binding](file:///D:/IMPORTANT_FILES/PROJECT_FILES/Digital-Nurture-JavaFSE-main/Java%20FSE/Deepskilling/Angular/Exercise_2_Binding)**: Dynamic data binding, component lifecycle hooks, and parent-child communication.
*   **[Exercise_3_Directives_Pipes](file:///D:/IMPORTANT_FILES/PROJECT_FILES/Digital-Nurture-JavaFSE-main/Java%20FSE/Deepskilling/Angular/Exercise_3_Directives_Pipes)**: Structural and attribute directives, custom `@HostListener` highlight directive, and custom credit pipe.
*   **[Exercise_4_Template_Forms](file:///D:/IMPORTANT_FILES/PROJECT_FILES/Digital-Nurture-JavaFSE-main/Java%20FSE/Deepskilling/Angular/Exercise_4_Template_Forms)**: Template-driven enrollment form with built-in validation.
*   **[Exercise_5_Reactive_Forms](file:///D:/IMPORTANT_FILES/PROJECT_FILES/Digital-Nurture-JavaFSE-main/Java%20FSE/Deepskilling/Angular/Exercise_5_Reactive_Forms)**: Reactive form with synchronous and asynchronous custom validation, and dynamic FormArrays.
*   **[Exercise_6_Services_DI](file:///D:/IMPORTANT_FILES/PROJECT_FILES/Digital-Nurture-JavaFSE-main/Java%20FSE/Deepskilling/Angular/Exercise_6_Services_DI)**: Layered singleton services (`CourseService`, `EnrollmentService`) and hierarchical component-scoped injection.
*   **[Exercise_7_Routing](file:///D:/IMPORTANT_FILES/PROJECT_FILES/Digital-Nurture-JavaFSE-main/Java%20FSE/Deepskilling/Angular/Exercise_7_Routing)**: Router configuration (params, nested layouts, wildcard 404), lazy loading, and route guards (`CanActivate`, `CanDeactivate`).
*   **[Exercise_8_HTTP_Client](file:///D:/IMPORTANT_FILES/PROJECT_FILES/Digital-Nurture-JavaFSE-main/Java%20FSE/Deepskilling/Angular/Exercise_8_HTTP_Client)**: Integration with JSON Server, RxJS operators (`map`, `tap`, `catchError`, `retry`, `switchMap`), and authentication/logging interceptors.
*   **[Exercise_9_NgRx](file:///D:/IMPORTANT_FILES/PROJECT_FILES/Digital-Nurture-JavaFSE-main/Java%20FSE/Deepskilling/Angular/Exercise_9_NgRx)**: NgRx store management featuring actions, reducers, memoized selectors, and async HTTP effects.
*   **[Exercise_10_Testing](file:///D:/IMPORTANT_FILES/PROJECT_FILES/Digital-Nurture-JavaFSE-main/Java%20FSE/Deepskilling/Angular/Exercise_10_Testing)**: Comprehensive unit tests using Jasmine, Karma, and TestBed.

---

## Hands-On Exercise Status Matrix

| Exercise # | Hands-On Name / Description | Estimated Time | Implementation Folder | Status | Verification Proof |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Exercise 1** | Project Setup & First Component | 30 minutes | [Exercise_1_Setup](file:///D:/IMPORTANT_FILES/PROJECT_FILES/Digital-Nurture-JavaFSE-main/Java%20FSE/Deepskilling/Angular/Exercise_1_Setup) | **Completed** | [README.md](file:///D:/IMPORTANT_FILES/PROJECT_FILES/Digital-Nurture-JavaFSE-main/Java%20FSE/Deepskilling/Angular/Exercise_1_Setup/README.md) |
| **Exercise 2** | Bindings, Hooks & Communication | 20 minutes | [Exercise_2_Binding](file:///D:/IMPORTANT_FILES/PROJECT_FILES/Digital-Nurture-JavaFSE-main/Java%20FSE/Deepskilling/Angular/Exercise_2_Binding) | **Completed** | [README.md](file:///D:/IMPORTANT_FILES/PROJECT_FILES/Digital-Nurture-JavaFSE-main/Java%20FSE/Deepskilling/Angular/Exercise_2_Binding/README.md) |
| **Exercise 3** | Directives & Pipes | 30 minutes | [Exercise_3_Directives_Pipes](file:///D:/IMPORTANT_FILES/PROJECT_FILES/Digital-Nurture-JavaFSE-main/Java%20FSE/Deepskilling/Angular/Exercise_3_Directives_Pipes) | **Completed** | [README.md](file:///D:/IMPORTANT_FILES/PROJECT_FILES/Digital-Nurture-JavaFSE-main/Java%20FSE/Deepskilling/Angular/Exercise_3_Directives_Pipes/README.md) |
| **Exercise 4** | Template-driven Forms | 30 minutes | [Exercise_4_Template_Forms](file:///D:/IMPORTANT_FILES/PROJECT_FILES/Digital-Nurture-JavaFSE-main/Java%20FSE/Deepskilling/Angular/Exercise_4_Template_Forms) | **Completed** | [README.md](file:///D:/IMPORTANT_FILES/PROJECT_FILES/Digital-Nurture-JavaFSE-main/Java%20FSE/Deepskilling/Angular/Exercise_4_Template_Forms/README.md) |
| **Exercise 5** | Reactive Forms & Custom Validation | 30 minutes | [Exercise_5_Reactive_Forms](file:///D:/IMPORTANT_FILES/PROJECT_FILES/Digital-Nurture-JavaFSE-main/Java%20FSE/Deepskilling/Angular/Exercise_5_Reactive_Forms) | **Completed** | [README.md](file:///D:/IMPORTANT_FILES/PROJECT_FILES/Digital-Nurture-JavaFSE-main/Java%20FSE/Deepskilling/Angular/Exercise_5_Reactive_Forms/README.md) |
| **Exercise 6** | Services & Dependency Injection | 20 minutes | [Exercise_6_Services_DI](file:///D:/IMPORTANT_FILES/PROJECT_FILES/Digital-Nurture-JavaFSE-main/Java%20FSE/Deepskilling/Angular/Exercise_6_Services_DI) | **Completed** | [README.md](file:///D:/IMPORTANT_FILES/PROJECT_FILES/Digital-Nurture-JavaFSE-main/Java%20FSE/Deepskilling/Angular/Exercise_6_Services_DI/README.md) |
| **Exercise 7** | Routing, Guards & Lazy Loading | 30 minutes | [Exercise_7_Routing](file:///D:/IMPORTANT_FILES/PROJECT_FILES/Digital-Nurture-JavaFSE-main/Java%20FSE/Deepskilling/Angular/Exercise_7_Routing) | **Completed** | [README.md](file:///D:/IMPORTANT_FILES/PROJECT_FILES/Digital-Nurture-JavaFSE-main/Java%20FSE/Deepskilling/Angular/Exercise_7_Routing/README.md) |
| **Exercise 8** | HTTP Client & Interceptors | 30 minutes | [Exercise_8_HTTP_Client](file:///D:/IMPORTANT_FILES/PROJECT_FILES/Digital-Nurture-JavaFSE-main/Java%20FSE/Deepskilling/Angular/Exercise_8_HTTP_Client) | **Completed** | [README.md](file:///D:/IMPORTANT_FILES/PROJECT_FILES/Digital-Nurture-JavaFSE-main/Java%20FSE/Deepskilling/Angular/Exercise_8_HTTP_Client/README.md) |
| **Exercise 9** | State Management (NgRx) | 30 minutes | [Exercise_9_NgRx](file:///D:/IMPORTANT_FILES/PROJECT_FILES/Digital-Nurture-JavaFSE-main/Java%20FSE/Deepskilling/Angular/Exercise_9_NgRx) | **Completed** | [README.md](file:///D:/IMPORTANT_FILES/PROJECT_FILES/Digital-Nurture-JavaFSE-main/Java%20FSE/Deepskilling/Angular/Exercise_9_NgRx/README.md) |
| **Exercise 10** | Unit Testing (Jasmine & Karma) | 30 minutes | [Exercise_10_Testing](file:///D:/IMPORTANT_FILES/PROJECT_FILES/Digital-Nurture-JavaFSE-main/Java%20FSE/Deepskilling/Angular/Exercise_10_Testing) | **Completed** | [README.md](file:///D:/IMPORTANT_FILES/PROJECT_FILES/Digital-Nurture-JavaFSE-main/Java%20FSE/Deepskilling/Angular/Exercise_10_Testing/README.md) |
