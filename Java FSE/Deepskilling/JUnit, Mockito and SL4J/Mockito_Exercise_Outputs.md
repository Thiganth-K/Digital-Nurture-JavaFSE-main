# Mockito Hands-On Exercises Output

This document contains the execution output of the Mockito hands-on exercise problems implemented under `D:\IMPORTANT_FILES\PROJECT_FILES\Digital-Nurture-JavaFSE-main\Java FSE\Deepskilling\JUnit, Mockito and SL4J`.

---

## Mockito Exercise 1: Mocking and Stubbing

### Description
Demonstrates creating a mock object for an external API interface, stubbing its methods to return a predefined value, and verifying that the service correctly uses the stub.

### Output
```text
JUnit version 4.13.2
.OpenJDK 64-Bit Server VM warning: Sharing is only supported for boot loader classes because bootstrap classpath has been appended
Mockito Exercise 1: testExternalApi passed with output: Mock Data

Time: 1.229

OK (1 test)
```

---

## Mockito Exercise 2: Verifying Interactions

### Description
Ensures that a specific interaction (method call) occurs on a mocked object during execution.

### Output
```text
JUnit version 4.13.2
.OpenJDK 64-Bit Server VM warning: Sharing is only supported for boot loader classes because bootstrap classpath has been appended
Mockito Exercise 2: testVerifyInteraction passed successfully!

Time: 1.321

OK (1 test)
```

---

## Mockito Exercise 3: Argument Matching

### Description
Demonstrates using argument matchers (`anyInt()` and `eq()`) to stub and verify method invocations with specific inputs.

### Output
```text
JUnit version 4.13.2
.OpenJDK 64-Bit Server VM warning: Sharing is only supported for boot loader classes because bootstrap classpath has been appended
Mockito Exercise 3: testArgumentMatching passed successfully!

Time: 1.426

OK (1 test)
```

---

## Mockito Exercise 4: Handling Void Methods

### Description
Demonstrates how to stub a void method to do nothing (`doNothing().when(mockApi).doSomething()`) and verify that it was called.

### Output
```text
JUnit version 4.13.2
.OpenJDK 64-Bit Server VM warning: Sharing is only supported for boot loader classes because bootstrap classpath has been appended
Mockito Exercise 4: testVoidMethod passed successfully!

Time: 1.249

OK (1 test)
```

---

## Mockito Exercise 5: Mocking and Stubbing with Multiple Returns

### Description
Demonstrates stubbing a method to return different values on consecutive invocations.

### Output
```text
JUnit version 4.13.2
.OpenJDK 64-Bit Server VM warning: Sharing is only supported for boot loader classes because bootstrap classpath has been appended
Mockito Exercise 5: testMultipleReturns passed with outputs: 
  1st call: First Call Value
  2nd call: Second Call Value
  3rd call: Third Call Value

Time: 1.261

OK (1 test)
```

---

## Mockito Exercise 6: Verifying Interaction Order

### Description
Ensures that methods on a mock object are executed in a specific sequential order using Mockito's `InOrder` verification.

### Output
```text
JUnit version 4.13.2
.OpenJDK 64-Bit Server VM warning: Sharing is only supported for boot loader classes because bootstrap classpath has been appended
Mockito Exercise 6: testVerificationOrder passed successfully! Order verified.

Time: 1.27

OK (1 test)
```

---

## Mockito Exercise 7: Handling Void Methods with Exceptions

### Description
Demonstrates stubbing a void method to throw a specific exception (`doThrow()`) and asserting that the exception propagates correctly.

### Output
```text
JUnit version 4.13.2
.OpenJDK 64-Bit Server VM warning: Sharing is only supported for boot loader classes because bootstrap classpath has been appended
Mockito Exercise 7: Attempting to call executeAction() which should throw RuntimeException...
Mockito Exercise 7: Successfully caught expected exception: API Error

Time: 1.22

OK (1 test)
```
