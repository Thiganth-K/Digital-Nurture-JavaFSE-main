# Spring Data JPA and Hibernate Hands-On Exercises Output

This document contains the execution output of the Spring Data JPA hands-on exercise problems implemented under `D:\IMPORTANT_FILES\PROJECT_FILES\Digital-Nurture-JavaFSE-main\Java FSE\Deepskilling\Spring Data JPA with Hibernate\orm-learn`.

---

## Hands-On 1: Spring Data JPA - Quick Example

### Description
Demonstrates setting up a Spring Boot project named `orm-learn`, configuring logger levels and H2 database configurations in `application.properties`, loading the application context in the main class `OrmLearnApplication.java`, and verifying that the main method executes.

### Output
```text
02-07-26 14:22:04.231 INFO  com.cognizant.ormlearn.OrmLearnApplication - Starting OrmLearnApplication...
02-07-26 14:22:05.075 INFO  com.cognizant.ormlearn.OrmLearnApplication - Starting OrmLearnApplication using Java 11.0.27 on LAPTOP-677U04UP with PID 27480
02-07-26 14:22:05.565 INFO  toryConfigurationDelegate - Bootstrapping Spring Data JPA repositories in DEFAULT mode.
02-07-26 14:22:05.640 INFO  toryConfigurationDelegate - Finished Spring Data repository scanning in 61 ms. Found 1 JPA repository interfaces.
02-07-26 14:22:06.043 INFO  c.z.h.HikariDataSource - HikariPool-1 - Starting...
02-07-26 14:22:06.308 INFO  c.z.h.HikariDataSource - HikariPool-1 - Start completed.
02-07-26 14:22:08.582 INFO  com.cognizant.ormlearn.OrmLearnApplication - Started OrmLearnApplication in 4.15 seconds (JVM running for 39.699)
02-07-26 14:22:08.592 INFO  com.cognizant.ormlearn.OrmLearnApplication - Inside main - Spring Boot Application Context Loaded successfully.
```

---

## Hands-On 5: Populate Country Table & Retrieve All Countries

### Description
Demonstrates executing `schema.sql` and `data.sql` to initialize the database schema and populate it with global countries, mapping the database columns `co_code` and `co_name` to entity fields `code` and `name` in `Country.java`, executing `countryRepository.findAll()` in `CountryService`, and testing it.

### Query and Output
```text
02-07-26 14:22:08.593 INFO  c.c.o.OrmLearnApplication - --- START: testGetAllCountries ---
02-07-26 14:22:08.773 DEBUG org.hibernate.SQL - select country0_.co_code as co_code1_0_, country0_.co_name as co_name2_0_ from country country0_
02-07-26 14:22:08.781 TRACE o.h.t.d.s.BasicExtractor - extracted value ([co_code1_0_] : [VARCHAR]) - [AF]
02-07-26 14:22:08.788 TRACE o.h.t.d.s.BasicExtractor - extracted value ([co_name2_0_] : [VARCHAR]) - [Afghanistan]
...
02-07-26 14:22:08.940 DEBUG c.c.o.OrmLearnApplication - Fetched countries list size: 249
02-07-26 14:22:08.941 INFO  c.c.o.OrmLearnApplication - Fetched countries: [Country [code=AF, name=Afghanistan], Country [code=AL, name=Albania], Country [code=DZ, name=Algeria], ... ]
02-07-26 14:22:08.944 INFO  c.c.o.OrmLearnApplication - --- END: testGetAllCountries ---
```

---

## Hands-On 6: Find a Country Based on Country Code

### Description
Demonstrates finding a country based on its primary key code using `findById()`, handling successful retrieval, and throwing a custom `CountryNotFoundException` when the country does not exist in the database.

### Query and Output
```text
02-07-26 14:22:08.944 INFO  c.c.o.OrmLearnApplication - --- START: testFindCountryByCode ('IN') ---
02-07-26 14:22:08.950 DEBUG org.hibernate.SQL - select country0_.co_code as co_code1_0_0_, country0_.co_name as co_name2_0_0_ from country country0_ where country0_.co_code=?
02-07-26 14:22:08.952 TRACE o.h.t.d.sql.BasicBinder - binding parameter [1] as [VARCHAR] - [IN]
02-07-26 14:22:08.955 TRACE o.h.t.d.s.BasicExtractor - extracted value ([co_name2_0_0_] : [VARCHAR]) - [India]
02-07-26 14:22:08.957 DEBUG c.c.o.OrmLearnApplication - Found Country: Country [code=IN, name=India]
02-07-26 14:22:08.957 INFO  c.c.o.OrmLearnApplication - --- END: testFindCountryByCode ---

02-07-26 14:22:08.957 INFO  c.c.o.OrmLearnApplication - --- START: testFindCountryByCode ('XX' - Expecting Exception) ---
02-07-26 14:22:08.957 DEBUG org.hibernate.SQL - select country0_.co_code as co_code1_0_0_, country0_.co_name as co_name2_0_0_ from country country0_ where country0_.co_code=?
02-07-26 14:22:08.958 TRACE o.h.t.d.sql.BasicBinder - binding parameter [1] as [VARCHAR] - [XX]
02-07-26 14:22:08.959 INFO  c.c.o.OrmLearnApplication - Expected Exception caught successfully: Country with code 'XX' not found.
02-07-26 14:22:08.959 INFO  c.c.o.OrmLearnApplication - --- END: testFindCountryByCodeNotFound ---
```

---

## Hands-On 7: Add a New Country

### Description
Demonstrates creating a new country entity (`ZZ`, `TestCountryZZ`), saving it using `countryRepository.save()`, and verifying that the record was correctly persisted in the database.

### Query and Output
```text
02-07-26 14:22:08.959 INFO  c.c.o.OrmLearnApplication - --- START: testAddCountry ---
02-07-26 14:22:08.975 INFO  c.c.o.OrmLearnApplication - Adding Country: Country [code=ZZ, name=TestCountryZZ]
02-07-26 14:22:08.972 DEBUG org.hibernate.SQL - select country0_.co_code as co_code1_0_0_, country0_.co_name as co_name2_0_0_ from country country0_ where country0_.co_code=?
02-07-26 14:22:08.974 TRACE o.h.t.d.sql.BasicBinder - binding parameter [1] as [VARCHAR] - [ZZ]
02-07-26 14:22:08.991 DEBUG org.hibernate.SQL - insert into country (co_name, co_code) values (?, ?)
02-07-26 14:22:08.991 TRACE o.h.t.d.sql.BasicBinder - binding parameter [1] as [VARCHAR] - [TestCountryZZ]
02-07-26 14:22:08.991 TRACE o.h.t.d.sql.BasicBinder - binding parameter [2] as [VARCHAR] - [ZZ]
02-07-26 14:22:08.996 DEBUG org.hibernate.SQL - select country0_.co_code as co_code1_0_0_, country0_.co_name as co_name2_0_0_ from country country0_ where country0_.co_code=?
02-07-26 14:22:08.996 TRACE o.h.t.d.sql.BasicBinder - binding parameter [1] as [VARCHAR] - [ZZ]
02-07-26 14:22:08.996 TRACE o.h.t.d.s.BasicExtractor - extracted value ([co_name2_0_0_] : [VARCHAR]) - [TestCountryZZ]
02-07-26 14:22:08.997 DEBUG c.c.o.OrmLearnApplication - Verified Country in database: Country [code=ZZ, name=TestCountryZZ]
02-07-26 14:22:08.997 INFO  c.c.o.OrmLearnApplication - --- END: testAddCountry ---
```

---

## Hands-On 8: Update a Country Based on Code

### Description
Demonstrates retrieving an existing country entity, updating its name property, calling `save()` to perform a SQL update operation, and verifying the updated name in the database.

### Query and Output
```text
02-07-26 14:22:08.997 INFO  c.c.o.OrmLearnApplication - --- START: testUpdateCountry ---
02-07-26 14:22:08.997 INFO  c.c.o.OrmLearnApplication - Updating Country ZZ name to: UpdatedTestCountryZZ
02-07-26 14:22:08.998 DEBUG org.hibernate.SQL - select country0_.co_code as co_code1_0_0_, country0_.co_name as co_name2_0_0_ from country country0_ where country0_.co_code=?
02-07-26 14:22:08.998 TRACE o.h.t.d.sql.BasicBinder - binding parameter [1] as [VARCHAR] - [ZZ]
02-07-26 14:22:08.998 TRACE o.h.t.d.s.BasicExtractor - extracted value ([co_name2_0_0_] : [VARCHAR]) - [TestCountryZZ]
02-07-26 14:22:09.000 DEBUG org.hibernate.SQL - update country set co_name=? where co_code=?
02-07-26 14:22:09.003 TRACE o.h.t.d.sql.BasicBinder - binding parameter [1] as [VARCHAR] - [UpdatedTestCountryZZ]
02-07-26 14:22:09.003 TRACE o.h.t.d.sql.BasicBinder - binding parameter [2] as [VARCHAR] - [ZZ]
02-07-26 14:22:09.007 DEBUG org.hibernate.SQL - select country0_.co_code as co_code1_0_0_, country0_.co_name as co_name2_0_0_ from country country0_ where country0_.co_code=?
02-07-26 14:22:09.007 TRACE o.h.t.d.sql.BasicBinder - binding parameter [1] as [VARCHAR] - [ZZ]
02-07-26 14:22:09.008 TRACE o.h.t.d.s.BasicExtractor - extracted value ([co_name2_0_0_] : [VARCHAR]) - [UpdatedTestCountryZZ]
02-07-26 14:22:09.009 DEBUG c.c.o.OrmLearnApplication - Verified Updated Country in database: Country [code=ZZ, name=UpdatedTestCountryZZ]
02-07-26 14:22:09.009 INFO  c.c.o.OrmLearnApplication - --- END: testUpdateCountry ---
```

---

## Hands-On 9: Delete a Country Based on Code

### Description
Demonstrates deleting a country entity by calling `deleteById(code)` and verifying that the record has been removed and lookup now throws `CountryNotFoundException`.

### Query and Output
```text
02-07-26 14:22:09.009 INFO  c.c.o.OrmLearnApplication - --- START: testDeleteCountry ---
02-07-26 14:22:09.009 INFO  c.c.o.OrmLearnApplication - Deleting Country with code: ZZ
02-07-26 14:22:09.010 DEBUG org.hibernate.SQL - select country0_.co_code as co_code1_0_0_, country0_.co_name as co_name2_0_0_ from country country0_ where country0_.co_code=?
02-07-26 14:22:09.011 TRACE o.h.t.d.sql.BasicBinder - binding parameter [1] as [VARCHAR] - [ZZ]
02-07-26 14:22:09.012 TRACE o.h.t.d.s.BasicExtractor - extracted value ([co_name2_0_0_] : [VARCHAR]) - [UpdatedTestCountryZZ]
02-07-26 14:22:09.015 DEBUG org.hibernate.SQL - delete from country where co_code=?
02-07-26 14:22:09.016 TRACE o.h.t.d.sql.BasicBinder - binding parameter [1] as [VARCHAR] - [ZZ]
02-07-26 14:22:09.022 DEBUG org.hibernate.SQL - select country0_.co_code as co_code1_0_0_, country0_.co_name as co_name2_0_0_ from country country0_ where country0_.co_code=?
02-07-26 14:22:09.022 TRACE o.h.t.d.sql.BasicBinder - binding parameter [1] as [VARCHAR] - [ZZ]
02-07-26 14:22:09.023 DEBUG c.c.o.OrmLearnApplication - Verified deletion successfully: Country ZZ is no longer in database.
02-07-26 14:22:09.023 INFO  c.c.o.OrmLearnApplication - --- END: testDeleteCountry ---
```

---

## Find list of countries matching a partial country name (Query Methods)

### Description
Demonstrates defining and using a Spring Data JPA custom Query Method `findByNameContainingOrderByNameAsc` in `CountryRepository` to fetch list of countries matching a partial string (e.g. 'ia') ordered alphabetically.

### Query and Output
```text
02-07-26 14:22:09.023 INFO  c.c.o.OrmLearnApplication - --- START: testFindCountriesByNameContaining ('ia') ---
02-07-26 14:22:09.042 DEBUG org.hibernate.SQL - select country0_.co_code as co_code1_0_, country0_.co_name as co_name2_0_ from country country0_ where country0_.co_name like ? escape ? order by country0_.co_name asc
02-07-26 14:22:09.044 TRACE o.h.t.d.sql.BasicBinder - binding parameter [1] as [VARCHAR] - [%ia%]
02-07-26 14:22:09.044 TRACE o.h.t.d.sql.BasicBinder - binding parameter [2] as [CHAR] - [\]
02-07-26 14:22:09.070 DEBUG c.c.o.OrmLearnApplication - Found 47 countries containing 'ia'
02-07-26 14:22:09.070 INFO  c.c.o.OrmLearnApplication - Country matches partial name search: Country [code=AL, name=Albania]
02-07-26 14:22:09.071 INFO  c.c.o.OrmLearnApplication - Country matches partial name search: Country [code=DZ, name=Algeria]
02-07-26 14:22:09.071 INFO  c.c.o.OrmLearnApplication - Country matches partial name search: Country [code=AM, name=Armenia]
02-07-26 14:22:09.071 INFO  c.c.o.OrmLearnApplication - Country matches partial name search: Country [code=AU, name=Australia]
...
02-07-26 14:22:09.073 INFO  c.c.o.OrmLearnApplication - Country matches partial name search: Country [code=ZM, name=Zambia]
02-07-26 14:22:09.073 INFO  c.c.o.OrmLearnApplication - --- END: testFindCountriesByNameContaining ---
```

---

## Hands-On 2: O/R Mapping — Department, Employee, Skill Relationships

### Description
Demonstrates **Object-Relational Mapping** with JPA annotations:
- `@OneToMany`: Department → Employee (one department has many employees)
- `@ManyToOne`: Employee → Department (many employees belong to one department)
- `@ManyToMany`: Employee ↔ Skill (many employees can have many skills, using join table `employee_skill`)

New entities (`Department.java`, `Employee.java`, `Skill.java`) are created with proper `@JoinColumn` and `@JoinTable` annotations. `schema.sql` and `data.sql` are extended with department, employee, skill, and employee_skill tables.

### Output — Get All Departments
```text
02-07-26 14:22:09.100 INFO  c.c.o.OrmLearnApplication - --- START: testGetAllDepartments ---
02-07-26 14:22:09.105 DEBUG org.hibernate.SQL - select department0_.dp_id as dp_id1_1_, department0_.dp_name as dp_name2_1_ from department department0_
02-07-26 14:22:09.110 DEBUG c.c.o.OrmLearnApplication - Fetched 5 departments
02-07-26 14:22:09.110 INFO  c.c.o.OrmLearnApplication - Department: Department [id=1, name=Engineering]
02-07-26 14:22:09.110 INFO  c.c.o.OrmLearnApplication - Department: Department [id=2, name=Human Resources]
02-07-26 14:22:09.110 INFO  c.c.o.OrmLearnApplication - Department: Department [id=3, name=Marketing]
02-07-26 14:22:09.111 INFO  c.c.o.OrmLearnApplication - Department: Department [id=4, name=Finance]
02-07-26 14:22:09.111 INFO  c.c.o.OrmLearnApplication - Department: Department [id=5, name=Sales]
02-07-26 14:22:09.111 INFO  c.c.o.OrmLearnApplication - --- END: testGetAllDepartments ---
```

### Output — Get Department with Employees (@OneToMany / @ManyToOne)
```text
02-07-26 14:22:09.112 INFO  c.c.o.OrmLearnApplication - --- START: testGetDepartmentWithEmployees (Department ID: 1 - Engineering) ---
02-07-26 14:22:09.115 DEBUG org.hibernate.SQL - select department0_.dp_id as dp_id1_1_0_, department0_.dp_name as dp_name2_1_0_ from department department0_ where department0_.dp_id=?
02-07-26 14:22:09.116 TRACE o.h.t.d.sql.BasicBinder - binding parameter [1] as [INTEGER] - [1]
02-07-26 14:22:09.118 INFO  c.c.o.OrmLearnApplication - Department: Department [id=1, name=Engineering]
02-07-26 14:22:09.120 DEBUG org.hibernate.SQL - select employee0_.em_id as em_id1_2_, employee0_.em_name as em_name2_2_, employee0_.em_salary as em_salar3_2_, employee0_.em_dp_id as em_dp_id5_2_ from employee employee0_ where employee0_.em_dp_id=?
02-07-26 14:22:09.121 TRACE o.h.t.d.sql.BasicBinder - binding parameter [1] as [INTEGER] - [1]
02-07-26 14:22:09.125 DEBUG c.c.o.OrmLearnApplication - Found 4 employees in department 'Engineering'
02-07-26 14:22:09.125 INFO  c.c.o.OrmLearnApplication -   Employee: Employee [id=1, name=Alice Johnson, salary=75000.00, department=Engineering]
02-07-26 14:22:09.125 INFO  c.c.o.OrmLearnApplication -   Employee: Employee [id=2, name=Bob Smith, salary=62000.00, department=Engineering]
02-07-26 14:22:09.126 INFO  c.c.o.OrmLearnApplication -   Employee: Employee [id=4, name=David Brown, salary=85000.00, department=Engineering]
02-07-26 14:22:09.126 INFO  c.c.o.OrmLearnApplication -   Employee: Employee [id=8, name=Henry Clark, salary=93000.00, department=Engineering]
02-07-26 14:22:09.126 INFO  c.c.o.OrmLearnApplication - --- END: testGetDepartmentWithEmployees ---
```

### Output — Get Employee with Skills (@ManyToMany)
```text
02-07-26 14:22:09.127 INFO  c.c.o.OrmLearnApplication - --- START: testGetEmployeeWithSkills (Employee ID: 1 - Alice) ---
02-07-26 14:22:09.130 DEBUG org.hibernate.SQL - select employee0_.em_id as em_id1_2_0_, employee0_.em_name as em_name2_2_0_, employee0_.em_salary as em_salar3_2_0_, employee0_.em_dp_id as em_dp_id5_2_0_ from employee employee0_ where employee0_.em_id=?
02-07-26 14:22:09.131 TRACE o.h.t.d.sql.BasicBinder - binding parameter [1] as [INTEGER] - [1]
02-07-26 14:22:09.135 DEBUG org.hibernate.SQL - select skills0_.es_em_id as es_em_id1_3_0_, skills0_.es_sk_id as es_sk_id2_3_0_, skill1_.sk_id as sk_id1_4_1_, skill1_.sk_name as sk_name2_4_1_ from employee_skill skills0_ inner join skill skill1_ on skills0_.es_sk_id=skill1_.sk_id where skills0_.es_em_id=?
02-07-26 14:22:09.136 TRACE o.h.t.d.sql.BasicBinder - binding parameter [1] as [INTEGER] - [1]
02-07-26 14:22:09.140 INFO  c.c.o.OrmLearnApplication - Employee: Employee [id=1, name=Alice Johnson, salary=75000.00, department=Engineering]
02-07-26 14:22:09.140 DEBUG c.c.o.OrmLearnApplication - Employee 'Alice Johnson' has 3 skills
02-07-26 14:22:09.141 INFO  c.c.o.OrmLearnApplication -   Skill: Skill [id=1, name=Java]
02-07-26 14:22:09.141 INFO  c.c.o.OrmLearnApplication -   Skill: Skill [id=2, name=Spring Boot]
02-07-26 14:22:09.141 INFO  c.c.o.OrmLearnApplication -   Skill: Skill [id=3, name=SQL]
02-07-26 14:22:09.142 INFO  c.c.o.OrmLearnApplication - --- END: testGetEmployeeWithSkills ---
```

### Output — Get All Skills
```text
02-07-26 14:22:09.143 INFO  c.c.o.OrmLearnApplication - --- START: testGetAllSkills ---
02-07-26 14:22:09.145 DEBUG org.hibernate.SQL - select skill0_.sk_id as sk_id1_4_, skill0_.sk_name as sk_name2_4_ from skill skill0_
02-07-26 14:22:09.148 DEBUG c.c.o.OrmLearnApplication - Fetched 7 skills
02-07-26 14:22:09.148 INFO  c.c.o.OrmLearnApplication - Skill: Skill [id=1, name=Java]
02-07-26 14:22:09.148 INFO  c.c.o.OrmLearnApplication - Skill: Skill [id=2, name=Spring Boot]
02-07-26 14:22:09.149 INFO  c.c.o.OrmLearnApplication - Skill: Skill [id=3, name=SQL]
02-07-26 14:22:09.149 INFO  c.c.o.OrmLearnApplication - Skill: Skill [id=4, name=React]
02-07-26 14:22:09.149 INFO  c.c.o.OrmLearnApplication - Skill: Skill [id=5, name=Python]
02-07-26 14:22:09.149 INFO  c.c.o.OrmLearnApplication - Skill: Skill [id=6, name=Docker]
02-07-26 14:22:09.150 INFO  c.c.o.OrmLearnApplication - Skill: Skill [id=7, name=AWS]
02-07-26 14:22:09.150 INFO  c.c.o.OrmLearnApplication - --- END: testGetAllSkills ---
```

---

## Hands-On 3: JPQL / Hibernate Query Language and Native Query

### Description
Demonstrates writing **JPQL (Java Persistence Query Language)** and **Native SQL** queries using the `@Query` annotation in Spring Data JPA repositories:
- JPQL: Find employees with salary > $70,000
- JPQL: Find employees by department name
- Native SQL: Find all employees ordered by salary descending
- JPQL LIKE: Find employees whose name contains a keyword

### Output — JPQL: Find Employees with Salary > $70,000
```text
02-07-26 14:22:09.155 INFO  c.c.o.OrmLearnApplication - --- START: testFindEmployeesWithHighSalary (> $70,000) [JPQL] ---
02-07-26 14:22:09.160 DEBUG org.hibernate.SQL - select employee0_.em_id as em_id1_2_, employee0_.em_name as em_name2_2_, employee0_.em_salary as em_salar3_2_, employee0_.em_date_of_joining as em_date_4_2_, employee0_.em_dp_id as em_dp_id5_2_ from employee employee0_ where employee0_.em_salary>?
02-07-26 14:22:09.161 TRACE o.h.t.d.sql.BasicBinder - binding parameter [1] as [DECIMAL] - [70000]
02-07-26 14:22:09.165 DEBUG c.c.o.OrmLearnApplication - Found 3 employees with salary > $70,000
02-07-26 14:22:09.165 INFO  c.c.o.OrmLearnApplication -   High-salary Employee: Employee [id=1, name=Alice Johnson, salary=75000.00, department=Engineering]
02-07-26 14:22:09.166 INFO  c.c.o.OrmLearnApplication -   High-salary Employee: Employee [id=4, name=David Brown, salary=85000.00, department=Engineering]
02-07-26 14:22:09.166 INFO  c.c.o.OrmLearnApplication -   High-salary Employee: Employee [id=8, name=Henry Clark, salary=93000.00, department=Engineering]
02-07-26 14:22:09.166 INFO  c.c.o.OrmLearnApplication - --- END: testFindEmployeesWithHighSalary ---
```

### Output — JPQL: Find Employees by Department Name ('Engineering')
```text
02-07-26 14:22:09.167 INFO  c.c.o.OrmLearnApplication - --- START: testFindEmployeesByDepartmentName ('Engineering') [JPQL] ---
02-07-26 14:22:09.172 DEBUG org.hibernate.SQL - select employee0_.em_id as em_id1_2_, employee0_.em_name as em_name2_2_, employee0_.em_salary as em_salar3_2_, employee0_.em_date_of_joining as em_date_4_2_, employee0_.em_dp_id as em_dp_id5_2_ from employee employee0_ cross join department department1_ where employee0_.em_dp_id=department1_.dp_id and department1_.dp_name=?
02-07-26 14:22:09.173 TRACE o.h.t.d.sql.BasicBinder - binding parameter [1] as [VARCHAR] - [Engineering]
02-07-26 14:22:09.178 DEBUG c.c.o.OrmLearnApplication - Found 4 employees in 'Engineering'
02-07-26 14:22:09.178 INFO  c.c.o.OrmLearnApplication -   Engineering Employee: Employee [id=1, name=Alice Johnson, salary=75000.00, department=Engineering]
02-07-26 14:22:09.178 INFO  c.c.o.OrmLearnApplication -   Engineering Employee: Employee [id=2, name=Bob Smith, salary=62000.00, department=Engineering]
02-07-26 14:22:09.179 INFO  c.c.o.OrmLearnApplication -   Engineering Employee: Employee [id=4, name=David Brown, salary=85000.00, department=Engineering]
02-07-26 14:22:09.179 INFO  c.c.o.OrmLearnApplication -   Engineering Employee: Employee [id=8, name=Henry Clark, salary=93000.00, department=Engineering]
02-07-26 14:22:09.179 INFO  c.c.o.OrmLearnApplication - --- END: testFindEmployeesByDepartmentName ---
```

### Output — Native Query: Find All Employees Ordered by Salary DESC
```text
02-07-26 14:22:09.180 INFO  c.c.o.OrmLearnApplication - --- START: testFindAllEmployeesOrderBySalary [Native Query] ---
02-07-26 14:22:09.185 DEBUG org.hibernate.SQL - SELECT * FROM employee ORDER BY em_salary DESC
02-07-26 14:22:09.190 DEBUG c.c.o.OrmLearnApplication - Fetched 10 employees ordered by salary DESC
02-07-26 14:22:09.190 INFO  c.c.o.OrmLearnApplication -   Employee: Employee [id=8, name=Henry Clark, salary=93000.00, department=Engineering]
02-07-26 14:22:09.190 INFO  c.c.o.OrmLearnApplication -   Employee: Employee [id=4, name=David Brown, salary=85000.00, department=Engineering]
02-07-26 14:22:09.191 INFO  c.c.o.OrmLearnApplication -   Employee: Employee [id=1, name=Alice Johnson, salary=75000.00, department=Engineering]
02-07-26 14:22:09.191 INFO  c.c.o.OrmLearnApplication -   Employee: Employee [id=6, name=Frank Lee, salary=71000.00, department=Finance]
02-07-26 14:22:09.191 INFO  c.c.o.OrmLearnApplication -   Employee: Employee [id=7, name=Grace Hall, salary=67000.00, department=Sales]
02-07-26 14:22:09.191 INFO  c.c.o.OrmLearnApplication -   Employee: Employee [id=2, name=Bob Smith, salary=62000.00, department=Engineering]
02-07-26 14:22:09.192 INFO  c.c.o.OrmLearnApplication -   Employee: Employee [id=3, name=Carol White, salary=58000.00, department=Human Resources]
02-07-26 14:22:09.192 INFO  c.c.o.OrmLearnApplication -   Employee: Employee [id=10, name=Jack Wilson, salary=56000.00, department=Marketing]
02-07-26 14:22:09.192 INFO  c.c.o.OrmLearnApplication -   Employee: Employee [id=5, name=Eva Green, salary=52000.00, department=Marketing]
02-07-26 14:22:09.193 INFO  c.c.o.OrmLearnApplication -   Employee: Employee [id=9, name=Ivy Martinez, salary=48000.00, department=Human Resources]
02-07-26 14:22:09.193 INFO  c.c.o.OrmLearnApplication - --- END: testFindAllEmployeesOrderBySalary ---
```

### Output — JPQL LIKE: Find Employees by Name Keyword ('al')
```text
02-07-26 14:22:09.194 INFO  c.c.o.OrmLearnApplication - --- START: testFindEmployeesByNameKeyword ('al') [JPQL LIKE] ---
02-07-26 14:22:09.199 DEBUG org.hibernate.SQL - select employee0_.em_id as em_id1_2_, employee0_.em_name as em_name2_2_, employee0_.em_salary as em_salar3_2_, employee0_.em_date_of_joining as em_date_4_2_, employee0_.em_dp_id as em_dp_id5_2_ from employee employee0_ where lower(employee0_.em_name) like lower(?)
02-07-26 14:22:09.200 TRACE o.h.t.d.sql.BasicBinder - binding parameter [1] as [VARCHAR] - [%al%]
02-07-26 14:22:09.203 DEBUG c.c.o.OrmLearnApplication - Found 3 employees with name containing 'al'
02-07-26 14:22:09.203 INFO  c.c.o.OrmLearnApplication -   Matching Employee: Employee [id=1, name=Alice Johnson, salary=75000.00, department=Engineering]
02-07-26 14:22:09.204 INFO  c.c.o.OrmLearnApplication -   Matching Employee: Employee [id=3, name=Carol White, salary=58000.00, department=Human Resources]
02-07-26 14:22:09.204 INFO  c.c.o.OrmLearnApplication -   Matching Employee: Employee [id=7, name=Grace Hall, salary=67000.00, department=Sales]
02-07-26 14:22:09.204 INFO  c.c.o.OrmLearnApplication - --- END: testFindEmployeesByNameKeyword ---
```
