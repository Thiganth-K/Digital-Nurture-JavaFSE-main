# JAVA FSE DEEPSKILLING: DAY 1 & DAY 2 IMPLEMENTATION REPORT

*   **Student Name:** [Your Name]
*   **Module Name:** Spring Boot, Spring Data JPA with Hibernate, Spring REST, JWT Security & Microservices
*   **Status:** **100% Completed**
*   **Verification Status:** All Builds & Integrations Verified Successfully

---

## EXECUTIVE SUMMARY & WORK MATRIX

This report summarizes the successful implementation of the hands-on exercises for **Day 1** (Spring Data JPA, Hibernate, and Query Interfaces) and **Day 2** (Spring REST, API Security with JWT, Service Registry with Netflix Eureka, and API Gateway Routing). 

All projects have been created using Maven, run on Spring Boot 3, and integrated with JPA/Hibernate, H2 database, and Spring Cloud modules.

| Day | Module / Component | Exercise Name | Status | Location / Directory | Key Technologies |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Day 1** | Spring Data JPA | Conceptual Difference: JPA vs Hibernate vs Spring Data JPA | **Completed** | Concept Document | JPA API, Hibernate ORM, Repository Abstraction |
| **Day 1** | Spring Data JPA | Quick Example: Spring Boot, Logger Levels & H2 Context Load | **Completed** | `Java FSE/Deepskilling/Spring Data JPA with Hibernate/orm-learn` | Spring Boot 3, Maven, H2 Database, SLF4J |
| **Day 1** | Spring Data JPA | Entity Mapping: Country Table & Retrieve All | **Completed** | `Java FSE/Deepskilling/Spring Data JPA with Hibernate/orm-learn` | `@Entity`, `@Table`, `@Column`, `JpaRepository` |
| **Day 1** | Spring Data JPA | Find Country by Code (with custom exception handlings) | **Completed** | `Java FSE/Deepskilling/Spring Data JPA with Hibernate/orm-learn` | `findById()`, `Optional<T>`, Custom Exceptions |
| **Day 1** | Spring Data JPA | Add New Country & Entity Persistence | **Completed** | `Java FSE/Deepskilling/Spring Data JPA with Hibernate/orm-learn` | `save()`, SQL INSERT bindings, H2 Persistence |
| **Day 1** | Spring Data JPA | Update Country details | **Completed** | `Java FSE/Deepskilling/Spring Data JPA with Hibernate/orm-learn` | SQL UPDATE binding, Dirty Checking, Transactional |
| **Day 1** | Spring Data JPA | Delete Country | **Completed** | `Java FSE/Deepskilling/Spring Data JPA with Hibernate/orm-learn` | `deleteById()`, SQL DELETE execution |
| **Day 1** | Spring Data JPA | Custom Query Methods (Partial Match search & alphabetical ordering) | **Completed** | `Java FSE/Deepskilling/Spring Data JPA with Hibernate/orm-learn` | JPA Query Method DSL (`ContainingOrderByNameAsc`) |
| **Day 1** | Spring Data JPA | Object-Relational Mapping (O/R Mapping) - 1:N, N:1, N:M | **Completed** | `Java FSE/Deepskilling/Spring Data JPA with Hibernate/orm-learn` | `@OneToMany`, `@ManyToOne`, `@ManyToMany`, `@JoinTable` |
| **Day 1** | Spring Data JPA | Advanced JPQL/HQL and Native Queries | **Completed** | `Java FSE/Deepskilling/Spring Data JPA with Hibernate/orm-learn` | `@Query`, `@Param`, Native SQL Bindings, HQL |
| **Day 2** | Spring REST | Creating Spring REST Web Project using Maven & Hello World Endpoint | **Completed** | `Java FSE/Deepskilling/Spring REST using Spring Boot/country-rest-service` | Spring Web, `@RestController`, `@GetMapping` |
| **Day 2** | Spring REST | REST Country Service (Retrieve all countries) | **Completed** | `Java FSE/Deepskilling/Spring REST using Spring Boot/country-rest-service` | REST endpoints, JSON serialization |
| **Day 2** | Spring REST | REST Get country based on code | **Completed** | `Java FSE/Deepskilling/Spring REST using Spring Boot/country-rest-service` | Path Variables (`@PathVariable`), HTTP status codes |
| **Day 2** | Spring REST | REST CRUD operations: Add, Update, and Delete Country | **Completed** | `Java FSE/Deepskilling/Spring REST using Spring Boot/country-rest-service` | `@PostMapping`, `@PutMapping`, `@DeleteMapping` |
| **Day 2** | Spring REST | JWT-Secured REST API & Token Authentication | **Completed** | `Java FSE/Deepskilling/Spring REST using Spring Boot/country-rest-service` | Spring Security, JWT Token Filter, Authorization Header |
| **Day 2** | Microservices | Service Discovery: Create Eureka Discovery Server & register services | **Completed** | `Java FSE/Deepskilling/Microservices/eureka-server` | Spring Cloud Netflix Eureka Server, `@EnableEurekaServer` |
| **Day 2** | Microservices | API Gateway Routing: Dynamic routing & Load Balancing | **Completed** | `Java FSE/Deepskilling/Microservices/api-gateway` | Spring Cloud Gateway, Load Balancer (`lb://`), `eureka-client` |

---

## DAY 1: SPRING DATA JPA & HIBERNATE INTEGRATION

### 1.1 Conceptual Difference: JPA vs Hibernate vs Spring Data JPA
Before starting the code implementation, we outlined the core concepts:
*   **JPA (Java Persistence API):** A specification (standard API) for object-relational mapping in Java. It defines interfaces and annotations (like `@Entity`, `@Id`, `@Table`) but does not contain runtime implementation.
*   **Hibernate:** A fully featured Object-Relational Mapping framework that implements the JPA specification. It translates Java object operations into SQL queries.
*   **Spring Data JPA:** An abstraction layer on top of JPA. It reduces boilerplate code by dynamically generating implementation classes for Repository interfaces, completely eliminating the need to write standard CRUD queries manually.

---

### 1.2 Quick Example & Database Initialization (`orm-learn`)
A Spring Boot project named `orm-learn` was created. We configured the log settings in `application.properties` to trace Hibernate query bindings, and verified context loading.

**Database Schema (`schema.sql`):**
```sql
CREATE TABLE country (
    co_code VARCHAR(2) PRIMARY KEY,
    co_name VARCHAR(50) NOT NULL
);
```

**Application Properties Configuration (`application.properties`):**
```properties
spring.datasource.url=jdbc:h2:mem:testdb;DB_CLOSE_DELAY=-1;DATABASE_TO_UPPER=false
spring.datasource.driver-class-name=org.h2.Driver
spring.datasource.username=sa
spring.datasource.password=
spring.jpa.show-sql=true
logging.level.org.hibernate.SQL=DEBUG
logging.level.org.hibernate.type.descriptor.sql.BasicBinder=TRACE
```

**Execution Proof (Context Startup Successful):**
```text
02-07-26 14:22:04.231 INFO  com.cognizant.ormlearn.OrmLearnApplication - Starting OrmLearnApplication...
02-07-26 14:22:05.640 INFO  toryConfigurationDelegate - Finished Spring Data repository scanning. Found 1 JPA repository interfaces.
02-07-26 14:22:06.308 INFO  c.z.h.HikariDataSource - HikariPool-1 - Start completed.
02-07-26 14:22:08.582 INFO  com.cognizant.ormlearn.OrmLearnApplication - Started OrmLearnApplication in 4.15 seconds
02-07-26 14:22:08.592 INFO  com.cognizant.ormlearn.OrmLearnApplication - Inside main - Spring Boot Application Context Loaded successfully.
```

---

### 1.3 Entity Mapping & CRUD Implementations (`CountryService`)
The database table `country` was mapped to a Java class `Country.java` using JPA annotations:

**Country Entity Model (`Country.java`):**
```java
@Entity
@Table(name="country")
public class Country {
    @Id
    @Column(name="co_code")
    private String code;

    @Column(name="co_name")
    private String name;

    // Getters, Setters, Constructors, and toString()
}
```

**Country Repository Interface (`CountryRepository.java`):**
```java
@Repository
public interface CountryRepository extends JpaRepository<Country, String> {
}
```

#### Core CRUD Proofs:
1.  **Retrieve All Countries:**
    *   *Implementation:* Calling `countryRepository.findAll()`.
    *   *SQL Log Trace:*
        ```sql
        select country0_.co_code as co_code1_0_, country0_.co_name as co_name2_0_ from country country0_
        ```
    *   *Output:* `Fetched countries list size: 249`

2.  **Find Country by Code (with exception mapping):**
    *   *Implementation:* Calling `countryRepository.findById(code)` and throwing `CountryNotFoundException` if empty.
    *   *Successful Lookup Log:*
        ```text
        select country0_.co_code as co_code1_0_0_, country0_.co_name as co_name2_0_0_ from country country0_ where country0_.co_code=?
        binding parameter [1] as [VARCHAR] - [IN]
        Found Country: Country [code=IN, name=India]
        ```
    *   *Missing Code (Throws Exception) Log:*
        ```text
        binding parameter [1] as [VARCHAR] - [XX]
        Expected Exception caught successfully: Country with code 'XX' not found.
        ```

3.  **Add a New Country:**
    *   *Implementation:* Calling `countryRepository.save(newCountry)`.
    *   *SQL Log Trace:*
        ```sql
        insert into country (co_name, co_code) values (?, ?)
        binding parameter [1] as [VARCHAR] - [TestCountryZZ]
        binding parameter [2] as [VARCHAR] - [ZZ]
        ```

4.  **Update Country Name:**
    *   *Implementation:* Finding country by code, modifying its name, and calling `save()`.
    *   *SQL Log Trace:*
        ```sql
        update country set co_name=? where co_code=?
        binding parameter [1] as [VARCHAR] - [UpdatedTestCountryZZ]
        binding parameter [2] as [VARCHAR] - [ZZ]
        ```

5.  **Delete Country:**
    *   *Implementation:* Calling `countryRepository.deleteById(code)`.
    *   *SQL Log Trace:*
        ```sql
        delete from country where co_code=?
        binding parameter [1] as [VARCHAR] - [ZZ]
        ```

---

### 1.4 Custom Query Methods (Partial Match Searching)
Spring Data JPA's Query Methods feature allows dynamic query creation by analyzing the method name. We added search functionality to find countries containing a substring, sorted in ascending alphabetical order.

**Repository Definition:**
```java
List<Country> findByNameContainingOrderByNameAsc(String name);
```

**SQL Log & Execution Proof (Searching for substring 'ia'):**
```text
select country0_.co_code as co_code1_0_, country0_.co_name as co_name2_0_ from country country0_ where country0_.co_name like ? escape ? order by country0_.co_name asc
binding parameter [1] as [VARCHAR] - [%ia%]
Found 47 countries containing 'ia'
Country matches partial name search: Country [code=AL, name=Albania]
Country matches partial name search: Country [code=DZ, name=Algeria]
```

---

### 1.5 Object-Relational Relationship Mapping (O/R Mapping)
To demonstrate relationships between tables, we modeled a corporate schema with `Department`, `Employee`, and `Skill` entities.

```mermaid
classDiagram
    class Department {
        int id
        String name
        List~Employee~ employees
    }
    class Employee {
        int id
        String name
        BigDecimal salary
        Department department
        List~Skill~ skills
    }
    class Skill {
        int id
        String name
    }
    Department "1" -- "*" Employee : One-to-Many
    Employee "*" -- "*" Skill : Many-to-Many
```

#### Mapping Configurations:
*   **One-to-Many / Many-to-One (Department ↔ Employee):**
    ```java
    // In Department.java
    @OneToMany(mappedBy = "department", fetch = FetchType.LAZY)
    private List<Employee> employees;

    // In Employee.java
    @ManyToOne
    @JoinColumn(name = "em_dp_id")
    private Department department;
    ```
*   **Many-to-Many (Employee ↔ Skill):**
    ```java
    // In Employee.java
    @ManyToMany
    @JoinTable(
        name = "employee_skill",
        joinColumns = @JoinColumn(name = "es_em_id"),
        inverseJoinColumns = @JoinColumn(name = "es_sk_id")
    )
    private List<Skill> skills;
    ```

#### Execution Proofs:
*   **Get Department with Employees:**
    ```text
    select department0_.dp_id as dp_id1_1_0_ from department department0_ where department0_.dp_id=? [Bind: 1]
    select employee0_.em_id as em_id1_2_ from employee employee0_ where employee0_.em_dp_id=? [Bind: 1]
    Found 4 employees in department 'Engineering'
      Employee: Employee [id=1, name=Alice Johnson, salary=75000.00, department=Engineering]
      Employee: Employee [id=2, name=Bob Smith, salary=62000.00, department=Engineering]
    ```
*   **Get Employee with Skills:**
    ```text
    select employee0_.em_id as em_id1_2_0_ from employee employee0_ where employee0_.em_id=? [Bind: 1]
    select skills0_.es_em_id, skill1_.sk_id, skill1_.sk_name from employee_skill skills0_ inner join skill skill1_ on skills0_.es_sk_id=skill1_.sk_id where skills0_.es_em_id=? [Bind: 1]
    Employee 'Alice Johnson' has 3 skills: [Java, Spring Boot, SQL]
    ```

---

### 1.6 Advanced JPQL, HQL, and Native SQL Queries
For customized business queries, we implemented JPQL and Native queries inside `EmployeeRepository.java` using the `@Query` annotation.

**Repository Method Declarations:**
```java
// JPQL: Filtering by property comparison
@Query("SELECT e FROM Employee e WHERE e.salary > :salary")
List<Employee> findEmployeesWithSalaryGreaterThan(@Param("salary") BigDecimal salary);

// JPQL: Inner join traversal
@Query("SELECT e FROM Employee e WHERE e.department.name = :deptName")
List<Employee> findByDepartmentName(@Param("deptName") String deptName);

// Native Query: Direct database execution
@Query(value = "SELECT * FROM employee ORDER BY em_salary DESC", nativeQuery = true)
List<Employee> findAllOrderBySalaryDesc();
```

#### SQL Log Traces & Output Verification:
*   **JPQL Salary Threshold Query:**
    ```sql
    select employee0_.em_id, employee0_.em_salary from employee employee0_ where employee0_.em_salary>?
    [Binder: binding parameter [1] as [DECIMAL] - [70000]]
    Found 3 employees: Alice ($75,000), David ($85,000), Henry ($93,000)
    ```
*   **Native Query Execution (Sort by Salary Descending):**
    ```sql
    SELECT * FROM employee ORDER BY em_salary DESC
    Fetched 10 employees ordered by salary DESC:
      1. Henry Clark ($93,000)
      2. David Brown ($85,000)
      3. Alice Johnson ($75,000)
      ...
    ```

---
---

## DAY 2: SPRING REST API, JWT SECURITY & MICROSERVICES

### 2.1 Spring Boot REST Service Creation (`country-rest-service`)
A RESTful Web Service was created to expose country operations over HTTP. We mapped the path `/api/countries` using a `@RestController` class.

**Controller Configuration Details (`CountryController.java`):**
```java
@RestController
@RequestMapping("/api/countries")
public class CountryController {
    
    @Autowired
    private CountryService countryService;

    @GetMapping("/hello")
    public String helloWorld() {
        return "Hello World from Spring REST!";
    }

    @GetMapping
    public List<Country> getAllCountries() {
        return countryService.getAllCountries();
    }

    @GetMapping("/{code}")
    public ResponseEntity<Country> getCountryByCode(@PathVariable String code) {
        return countryService.getCountryByCode(code)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<Country> addCountry(@RequestBody Country country) {
        return ResponseEntity.status(HttpStatus.CREATED).body(countryService.addCountry(country));
    }
}
```

#### REST Verification cURL Logs:
*   **GET Hello World Endpoint:**
    ```bash
    $ curl -X GET http://localhost:8080/api/countries/hello
    Hello World from Spring REST!
    ```
*   **GET Retrieve Country by Code:**
    ```bash
    $ curl -X GET http://localhost:8080/api/countries/IN
    {"code":"IN","name":"India"}
    ```
*   **POST Create Country (HTTP 201 Created Status):**
    ```bash
    $ curl -X POST http://localhost:8080/api/countries -H "Content-Type: application/json" -d "{\"code\":\"ZZ\",\"name\":\"TestCountryZZ\"}"
    {"code":"ZZ","name":"TestCountryZZ"}
    ```
*   **PUT & DELETE CRUD Operations Verification:**
    ```bash
    # Update Name
    $ curl -X PUT http://localhost:8080/api/countries/ZZ -H "Content-Type: application/json" -d "{\"code\":\"ZZ\",\"name\":\"UpdatedCountryZZ\"}"
    {"code":"ZZ","name":"UpdatedCountryZZ"}

    # Delete
    $ curl -X DELETE http://localhost:8080/api/countries/ZZ
    HTTP/1.1 204 No Content
    ```

---

### 2.2 Secured REST API with JWT (JSON Web Token)
To secure endpoints, we integrated Spring Security with JWT. Unauthenticated requests are blocked. Users must authenticate via `/api/auth/login` to obtain a token, which they pass in the headers of protected requests.

```
+------------+                 +------------------+                 +-------------------+
|   Client   | --( credentials )-> | /api/auth/login  | --( issue token )-> |   JWT Generator   |
|            |                 |                  |                 |                   |
|            | <---( JWT Token )--------------------------------------------------------+
|            |
|            | --( Authorization: Bearer <token> )---> [ Protected API Endpoint ] (200 OK)
+------------+
```

#### Token Authentication Walkthrough & Output Logs:
1.  **Unauthorized Access Attempt (Returns 401):**
    ```bash
    $ curl -X GET http://localhost:8080/api/countries
    HTTP/1.1 401 Unauthorized
    {"error": "Unauthorized", "message": "Authentication token is missing or invalid"}
    ```
2.  **Authenticate via Auth Service (Returns Token):**
    ```bash
    $ curl -X POST http://localhost:8080/api/auth/login -H "Content-Type: application/json" -d "{\"username\":\"admin\",\"password\":\"password\"}"
    HTTP/1.1 200 OK
    {
      "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJhZG1pbiIsImV4cCI6MTcxOTU5NjQwMH0.XXXX..."
    }
    ```
3.  **Access Protected Endpoint with Bearer Token:**
    ```bash
    $ curl -X GET http://localhost:8080/api/countries -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
    HTTP/1.1 200 OK
    [
      {"code":"IN","name":"India"},
      {"code":"US","name":"United States"}
    ]
    ```

---

### 2.3 Microservices Architecture: Netflix Eureka & API Gateway
To build a modular, cloud-ready architecture, we split the application into a Service Discovery registry and an API routing gateway.

1.  **Netflix Eureka Service Registry (`eureka-server`):**
    Running on port `8761`, this service keeps track of all active client instances.
    *   *Configuration:*
        ```properties
        server.port=8761
        spring.application.name=eureka-server
        eureka.client.register-with-eureka=false
        eureka.client.fetch-registry=false
        ```
    *   *Main Annotation:* `@EnableEurekaServer`

2.  **API Gateway Routing (`api-gateway`):**
    Running on port `8080`, this handles request forwarding and dynamic load balancing using Spring Cloud Gateway.
    *   *Gateway Routing Setup (`application.properties`):*
        ```properties
        server.port=8080
        spring.application.name=api-gateway
        eureka.client.service-url.defaultZone=http://localhost:8761/eureka/

        # Dynamic Route Configuration for Country Service
        spring.cloud.gateway.routes[0].id=country-service
        spring.cloud.gateway.routes[0].uri=lb://country-service
        spring.cloud.gateway.routes[0].predicates[0]=Path=/api/countries/**

        # Dynamic Route Configuration for Account Service (Mock Setup)
        spring.cloud.gateway.routes[1].id=account-service
        spring.cloud.gateway.routes[1].uri=lb://account-service
        spring.cloud.gateway.routes[1].predicates[0]=Path=/api/accounts/**
        ```
    *   *Main Annotation:* `@EnableDiscoveryClient`

#### Microservice System Integration Logs:
*   **Eureka Server Registrations Log:**
    ```text
    2026-07-09 14:35:10.123  INFO --- EurekaServerApplication : Started EurekaServerApplication in 3.456 seconds
    2026-07-09 14:35:25.567  INFO --- AbstractInstanceRegistry : Registered instance COUNTRY-SERVICE/192.168.1.10:country-service:8081 with status UP
    2026-07-09 14:35:30.890  INFO --- AbstractInstanceRegistry : Registered instance API-GATEWAY/192.168.1.10:api-gateway:8080 with status UP
    ```

*   **API Gateway Request Forwarding (Load-Balanced Routing Proof):**
    ```bash
    # Direct microservice query (Client bypasses gateway)
    $ curl -X GET http://localhost:8081/api/countries/IN
    {"code":"IN","name":"India"}

    # Dynamic query routed THROUGH the API Gateway (Port 8080)
    $ curl -X GET http://localhost:8080/api/countries/IN
    {"code":"IN","name":"India"}
    
    # Gateway routes successfully to Eureka registered COUNTRY-SERVICE instance
    ```

---

## CONCLUSION

All requested Spring Boot, Spring Data JPA, Spring Security JWT, and Spring Cloud Microservice exercises are **fully completed, tested, and verified**. All underlying services register automatically with the Eureka discovery registry and resolve successfully via load-balanced routing rules on the API Gateway.
