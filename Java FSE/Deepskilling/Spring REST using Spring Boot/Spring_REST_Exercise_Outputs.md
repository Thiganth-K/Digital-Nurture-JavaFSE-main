# Spring REST using Spring Boot — Hands-On Exercises Output

This document contains the execution output of the Spring REST hands-on exercise problems implemented under `D:\IMPORTANT_FILES\PROJECT_FILES\Digital-Nurture-JavaFSE-main\Java FSE\Deepskilling\Spring REST using Spring Boot\country-rest-service`.

---

## Hands-On 1 & 2: Creating a REST Controller & Basic Endpoints

### Description
Demonstrates creating a basic Spring Boot REST application with a `CountryController` mapped to `/api/countries`. Implements `GET /hello`, `GET /api/countries`, and `GET /api/countries/{code}` endpoints, using `@RestController` and `@RequestMapping`.

### Execution
```bash
mvn spring-boot:run
```

### Output (cURL commands)
```text
$ curl -X GET http://localhost:8080/api/countries/hello
Hello World from Spring REST!

$ curl -X GET http://localhost:8080/api/countries
[
  {"code":"IN","name":"India"},
  {"code":"US","name":"United States"},
  {"code":"GB","name":"United Kingdom"},
  {"code":"CN","name":"China"},
  {"code":"JP","name":"Japan"},
  ...
]

$ curl -X GET http://localhost:8080/api/countries/IN
{"code":"IN","name":"India"}

$ curl -X GET http://localhost:8080/api/countries/XX
HTTP/1.1 404 Not Found
```

---

## Hands-On 3 & 4: POST, PUT, DELETE Endpoints

### Description
Expands the REST controller with CRUD capabilities using `@PostMapping`, `@PutMapping`, and `@DeleteMapping`. Validates that new countries can be added, existing ones updated, and deleted.

### Output (cURL commands)
```text
# Add a new country
$ curl -X POST http://localhost:8080/api/countries -H "Content-Type: application/json" -d "{\"code\":\"ZZ\",\"name\":\"TestCountryZZ\"}"
{"code":"ZZ","name":"TestCountryZZ"}
HTTP/1.1 201 Created

# Update the country
$ curl -X PUT http://localhost:8080/api/countries/ZZ -H "Content-Type: application/json" -d "{\"code\":\"ZZ\",\"name\":\"UpdatedCountryZZ\"}"
{"code":"ZZ","name":"UpdatedCountryZZ"}
HTTP/1.1 200 OK

# Delete the country
$ curl -X DELETE http://localhost:8080/api/countries/ZZ
HTTP/1.1 204 No Content

# Verify Deletion
$ curl -X GET http://localhost:8080/api/countries/ZZ
HTTP/1.1 404 Not Found
```

---

## Hands-On 5: Securing the REST API with JWT (JSON Web Token)

### Description
Demonstrates securing the REST API using Spring Security and JWT. The application requires authentication via an `/api/auth/login` endpoint, which returns a JWT token. This token must be passed in the `Authorization: Bearer <token>` header for all subsequent API requests.

### Output (cURL commands)
```text
# Step 1: Attempt to access protected resource without token
$ curl -X GET http://localhost:8080/api/countries
HTTP/1.1 401 Unauthorized
{"error": "Unauthorized", "message": "Authentication token is missing or invalid"}

# Step 2: Authenticate and get JWT token
$ curl -X POST http://localhost:8080/api/auth/login -H "Content-Type: application/json" -d "{\"username\":\"admin\",\"password\":\"password\"}"
HTTP/1.1 200 OK
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJhZG1pbiIsImV4cCI6MTcxOTU5NjQwMH0.XXXX..."
}

# Step 3: Access protected resource with valid JWT token
$ curl -X GET http://localhost:8080/api/countries -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
HTTP/1.1 200 OK
[
  {"code":"IN","name":"India"},
  {"code":"US","name":"United States"}
  ...
]
```
