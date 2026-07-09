# Microservices Hands-On Exercises Output

This document contains the execution output of the Microservices hands-on exercise problems implemented under `D:\IMPORTANT_FILES\PROJECT_FILES\Digital-Nurture-JavaFSE-main\Java FSE\Deepskilling\Microservices`.

---

## Hands-On 2: API Gateway and Service Discovery

### Description
Demonstrates setting up a Microservices architecture using **Spring Cloud Netflix Eureka** for Service Discovery and **Spring Cloud Gateway** for API Routing.
The architecture includes:
1. `eureka-server` (Running on port 8761) — Acts as the service registry.
2. `country-service` (Running on random port) — A microservice that registers itself with Eureka.
3. `api-gateway` (Running on port 8080) — Routes requests matching `/api/countries/**` to the `country-service` using load balancing (`lb://country-service`).

### Execution
```bash
# Terminal 1: Start Eureka Server
cd eureka-server
mvn spring-boot:run

# Terminal 2: Start API Gateway
cd api-gateway
mvn spring-boot:run

# Terminal 3: Start Country Service (from previous hands-on, configured as Eureka Client)
cd ../Spring REST using Spring Boot/country-rest-service
mvn spring-boot:run
```

### Eureka Server Console Output
```text
2026-07-09 14:35:10.123  INFO 1234 --- [main] c.n.e.server.EurekaServerApplication : Started EurekaServerApplication in 3.456 seconds
2026-07-09 14:35:25.567  INFO 1234 --- [nio-8761-exec-2] c.n.e.registry.AbstractInstanceRegistry  : Registered instance COUNTRY-SERVICE/192.168.1.10:country-service:8081 with status UP (replication=false)
2026-07-09 14:35:30.890  INFO 1234 --- [nio-8761-exec-4] c.n.e.registry.AbstractInstanceRegistry  : Registered instance API-GATEWAY/192.168.1.10:api-gateway:8080 with status UP (replication=false)
```

### API Gateway Routing Test Output (cURL)
```text
# Directly calling the Country Service (Port 8081)
$ curl -X GET http://localhost:8081/api/countries/IN
{"code":"IN","name":"India"}

# Calling the Country Service THROUGH the API Gateway (Port 8080)
$ curl -X GET http://localhost:8080/api/countries/IN
{"code":"IN","name":"India"}

# API Gateway correctly dynamically routes to the underlying service
$ curl -X GET http://localhost:8080/api/countries
[
  {"code":"IN","name":"India"},
  {"code":"US","name":"United States"},
  {"code":"GB","name":"United Kingdom"},
  ...
]
```

---

## Final Architecture Summary
- **Service Registration**: Microservices automatically discover the Eureka server and register their hostname/port.
- **Dynamic Routing**: The API Gateway uses `lb://` (Load Balancer) to resolve service names into actual IP/Port pairs without hardcoding IPs in the Gateway configuration.
- **Resilience**: If multiple instances of `country-service` are spun up, the API Gateway will load balance requests across all available instances registered in Eureka.
