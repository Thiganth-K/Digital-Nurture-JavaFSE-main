# Spring Core and Maven Hands-On Exercises Output

This document contains the execution output of the Spring Core and Maven hands-on exercise problems implemented under `D:\IMPORTANT_FILES\PROJECT_FILES\Digital-Nurture-JavaFSE-main\Java FSE\Deepskilling\Spring Core and Maven\`.

---

## Exercise 1 & 2: Configuring Basic Spring Application & Implementing Dependency Injection

### Description
Demonstrates setting up a Spring Maven project, defining beans for `BookService` and `BookRepository` in an XML configuration file (`applicationContext.xml`), wiring the repository into the service using setter injection, and testing the configuration in a main class.

### Output
```text
=== Library Management Application Startup ===
Loading Spring applicationContext.xml...
Spring context loaded successfully.

Retrieving BookService bean from context...
BookService bean retrieved.

Invoking executeServiceAction()...
BookService: Starting business logic for service action...
BookRepository: Accessing database to perform book operations...
BookRepository: Book repository action executed successfully.
BookService: Business logic completed.

=== Library Management Application Shutdown ===
```

---

## Exercise 3: Implementing Logging with Spring AOP

### Description
Demonstrates adding Spring AOP/AspectJ dependencies, enabling AspectJ auto-proxying (`<aop:aspectj-autoproxy />`) in the configuration, and implementing an around advice logging aspect (`LoggingAspect`) to measure and log the execution time of methods in `BookService`.

### Output
```text
=== Library Management Application Startup ===
Loading Spring applicationContext.xml...
Spring context loaded successfully.

Retrieving BookService bean from context...
BookService bean retrieved.

Invoking executeServiceAction()...
[LoggingAspect] >> Starting execution of method: BookService.executeServiceAction()
BookService: Starting business logic for service action...
BookRepository: Accessing database to perform book operations...
BookRepository: Book repository action executed successfully.
BookService: Business logic completed.
[LoggingAspect] << Finished execution of method: BookService.executeServiceAction() | Time taken: 165 ms

=== Library Management Application Shutdown ===
```

---

## Exercise 4: Creating and Configuring a Maven Project

### Description
Demonstrates creating a standard Maven project structure, adding Spring Core, Context, AOP, and WebMVC dependencies to `pom.xml`, and configuring the Maven Compiler Plugin to target Java version 1.8.

### Maven Build Execution Output
```text
[INFO] Scanning for projects...
[INFO] 
[INFO] -------------------< com.library:LibraryManagement >--------------------
[INFO] Building LibraryManagement 1.0-SNAPSHOT
[INFO]   from pom.xml
[INFO] --------------------------------[ jar ]---------------------------------
[INFO] 
[INFO] --- maven-clean-plugin:2.5:clean (default-clean) @ LibraryManagement ---
[INFO] Deleting D:\IMPORTANT_FILES\PROJECT_FILES\Digital-Nurture-JavaFSE-main\Java FSE\Deepskilling\Spring Core and Maven\LibraryManagement\target
[INFO] 
[INFO] --- maven-resources-plugin:2.6:resources (default-resources) @ LibraryManagement ---
[INFO] Using 'UTF-8' encoding to copy filtered resources.
[INFO] Copying 1 resource
[INFO] 
[INFO] --- maven-compiler-plugin:3.8.1:compile (default-compile) @ LibraryManagement ---
[INFO] Changes detected - recompiling the module!
[INFO] Compiling 4 source files to D:\IMPORTANT_FILES\PROJECT_FILES\Digital-Nurture-JavaFSE-main\Java FSE\Deepskilling\Spring Core and Maven\LibraryManagement\target\classes
[INFO] ------------------------------------------------------------------------
[INFO] BUILD SUCCESS
[INFO] ------------------------------------------------------------------------
[INFO] Total time:  1.158 s
[INFO] Finished at: 2026-07-02T10:32:24+05:30
[INFO] ------------------------------------------------------------------------
```

---

## Exercise 5: Configuring the Spring IoC Container

### Description
Demonstrates creating a centralized Spring XML configuration (`applicationContext.xml`) to manage beans and dependency injection via setters, defining `BookService` and `BookRepository` beans, and executing operations under the Container context.

### Execution Output
```text
=== Starting LibraryManagementApplication [Exercise 5] ===
BookService [Exercise 5]: Delegating call to repository...
BookRepository [Exercise 5]: Retrieving books list from the database...
=== LibraryManagementApplication [Exercise 5] Completed Successfully ===
```

---

## Exercise 6: Configuring Beans with Annotations

### Description
Demonstrates simplifying bean configurations by using Spring annotations. Enabled component scanning (`<context:component-scan base-package="com.library" />`) in `applicationContext.xml`, annotated `BookRepository` with `@Repository`, `BookService` with `@Service`, and dependency-injected using `@Autowired`.

### Execution Output
```text
=== Starting LibraryManagementApplication [Exercise 6] ===
BookService [Exercise 6]: Autowired setter called for BookRepository.
BookService [Exercise 6]: Delegating call to repository...
BookRepository [Exercise 6]: Retrieving books from database via annotations...
=== LibraryManagementApplication [Exercise 6] Completed Successfully ===
```

---

## Exercise 7: Implementing Constructor and Setter Injection

### Description
Demonstrates combining both constructor-based and setter-based dependency injection methods. The `BookService` bean is initialized by calling its parameterized constructor, and subsequently updated via its setter method under the XML Spring context.

### Execution Output
```text
=== Starting LibraryManagementApplication [Exercise 7] ===
BookService [Exercise 7]: Constructor Injection executed.
BookService [Exercise 7]: Setter Injection executed.
BookService [Exercise 7]: Delegating call to repository...
BookRepository [Exercise 7]: Retrieving books from database via Constructor/Setter Injection...
=== LibraryManagementApplication [Exercise 7] Completed Successfully ===
```

---

## Exercise 8: Implementing Basic AOP with Spring

### Description
Demonstrates defining a Logging Aspect (`LoggingAspect`) containing before (`@Before`) and after (`@After`) execution advice methods, registering the Aspect in the container, and enabling proxying using `<aop:aspectj-autoproxy />`.

### Execution Output
```text
=== Starting LibraryManagementApplication [Exercise 8] ===
[LoggingAspect - Exercise 8] BEFORE method: BookService.listBooks() is about to start.
BookService [Exercise 8]: Delegating call to repository...
BookRepository [Exercise 8]: Accessing database to retrieve books...
[LoggingAspect - Exercise 8] AFTER method: BookService.listBooks() has executed.
=== LibraryManagementApplication [Exercise 8] Completed Successfully ===
```

---

## Exercise 9: Creating a Spring Boot Application

### Description
Demonstrates creating a complete, production-ready Spring Boot project containing Spring Web, Spring Data JPA, and H2 database integration. Wrote REST Controller mappings in `BookController` implementing full CRUD endpoints for entity `Book`. Tested and validated the endpoints using REST client test suites.

### Database Population and Startup Logs
```text
=== Starting LibraryManagementApplication (Spring Boot) [Exercise 9] ===
...
2026-07-02 14:44:20.368  INFO 2188 --- [           main] o.s.b.w.embedded.tomcat.TomcatWebServer  : Tomcat started on port(s): 8081 (http) with context path ''
2026-07-02 14:44:20.379  INFO 2188 --- [           main] c.library.LibraryManagementApplication   : Started LibraryManagementApplication in 2.611 seconds (JVM running for 2.918)
[CommandLineRunner] Populating H2 database with initial book data...
[CommandLineRunner] Database populated successfully. Server ready on port 8081.
```

### CRUD REST Validation Output
```text
--- TEST 1: GET /api/books (GetAll) ---
[
    {
        "id": 1,
        "title": "To Kill a Mockingbird",
        "author": "Harper Lee"
    },
    {
        "id": 2,
        "title": "1984",
        "author": "George Orwell"
    },
    {
        "id": 3,
        "title": "The Great Gatsby",
        "author": "F. Scott Fitzgerald"
    }
]

--- TEST 2: POST /api/books (Create) ---
{
    "id": 4,
    "title": "The Catcher in the Rye",
    "author": "J.D. Salinger"
}

--- TEST 3: GET /api/books/4 (GetById) ---
{
    "id": 4,
    "title": "The Catcher in the Rye",
    "author": "J.D. Salinger"
}

--- TEST 4: PUT /api/books/4 (Update) ---
{
    "id": 4,
    "title": "The Catcher in the Rye - Special Edition",
    "author": "J.D. Salinger"
}

--- TEST 5: DELETE /api/books/4 (Delete) ---
(Response Status: 204 No Content - Deleted successfully)

--- TEST 6: GET /api/books (Verify Delete) ---
[
    {
        "id": 1,
        "title": "To Kill a Mockingbird",
        "author": "Harper Lee"
    },
    {
        "id": 2,
        "title": "1984",
        "author": "George Orwell"
    },
    {
        "id": 3,
        "title": "The Great Gatsby",
        "author": "F. Scott Fitzgerald"
    }
]
```
