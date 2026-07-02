# SLF4J Logging Exercises Output

This document contains the execution output of the SLF4J logging hands-on exercise problems implemented under `D:\IMPORTANT_FILES\PROJECT_FILES\Digital-Nurture-JavaFSE-main\Java FSE\Deepskilling\JUnit, Mockito and SL4J`.

---

## SLF4J Exercise 1: Logging Error Messages and Warning Levels

### Description
Demonstrates basic error and warning level logging using SLF4J and Logback bindings.

### Execution Command
```bash
# Compile
javac -cp "lib/slf4j-api-1.7.30.jar" -d bin src/main/java/com/example/LoggingExample.java

# Run
java -cp "bin;lib/slf4j-api-1.7.30.jar;lib/logback-classic-1.2.3.jar;lib/logback-core-1.2.3.jar" com.example.LoggingExample
```

### Output
```text
16:04:49.283 [main] ERROR com.example.LoggingExample - This is an error message
16:04:49.285 [main] WARN com.example.LoggingExample - This is a warning message
```

---

## SLF4J Exercise 2: Parameterized Logging

### Description
Demonstrates parameterized logging using placeholders (`{}`) for efficient string rendering without upfront concatenation, and exception logging with stack trace capture.

### Execution Command
```bash
# Compile
javac -cp "lib/slf4j-api-1.7.30.jar" -d bin src/main/java/com/example/ParameterizedLoggingExample.java

# Run
java -cp "bin;lib/slf4j-api-1.7.30.jar;lib/logback-classic-1.2.3.jar;lib/logback-core-1.2.3.jar" com.example.ParameterizedLoggingExample
```

### Output
```text
16:04:50.198 [main] INFO com.example.ParameterizedLoggingExample - Processing event 'user_login' for user 'JohnDoe' (attempt number 3).
16:04:50.205 [main] ERROR com.example.ParameterizedLoggingExample - An arithmetic exception occurred during division for user 'JohnDoe':
java.lang.ArithmeticException: / by zero
	at com.example.ParameterizedLoggingExample.main(ParameterizedLoggingExample.java:20)
```

---

## SLF4J Exercise 3: Using Different Appenders

### Description
Uses a custom configuration file (`logback.xml`) to declare both a console appender and a file appender (`app.log`) and logs messages to both simultaneously.

### Configuration File (`logback.xml`)
```xml
<configuration>
    <appender name="console" class="ch.qos.logback.core.ConsoleAppender">
        <encoder>
            <pattern>%d{HH:mm:ss.SSS} [%thread] %-5level %logger{36} - %msg%n</pattern>
        </encoder>
    </appender>

    <appender name="file" class="ch.qos.logback.core.FileAppender">
        <file>app.log</file>
        <encoder>
            <pattern>%d{HH:mm:ss.SSS} [%thread] %-5level %logger{36} - %msg%n</pattern>
        </encoder>
    </appender>

    <root level="debug">
        <appender-ref ref="console" />
        <appender-ref ref="file" />
    </root>
</configuration>
```

### Execution Command
```bash
# Compile
javac -cp "lib/slf4j-api-1.7.30.jar" -d bin src/main/java/com/example/AppenderExample.java

# Run
java -cp "bin;src/main/resources;lib/slf4j-api-1.7.30.jar;lib/logback-classic-1.2.3.jar;lib/logback-core-1.2.3.jar" com.example.AppenderExample
```

### Console Output & File Output (`app.log`)
```text
16:04:51.397 [main] DEBUG com.example.AppenderExample - Debug message: Initializing application components...
16:04:51.399 [main] INFO  com.example.AppenderExample - Info message: Application started successfully.
16:04:51.400 [main] WARN  com.example.AppenderExample - Warn message: Memory usage is slightly high.
16:04:51.400 [main] ERROR com.example.AppenderExample - Error message: Database connection timed out.
```
