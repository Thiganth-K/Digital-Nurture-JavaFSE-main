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
