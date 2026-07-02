# JUnit Basic Testing Exercises Output

This document contains the execution output of the basic JUnit exercise problems implemented under `D:\IMPORTANT_FILES\PROJECT_FILES\Digital-Nurture-JavaFSE-main\Java FSE\Deepskilling\JUnit, Mockito and SL4J`.

---

## Exercise 1: Setting Up JUnit

### Description
Verifies successful integration of JUnit 4 in the project structure. 

### Execution Command
```bash
# Compile
javac -cp "lib/junit-4.13.2.jar" -d bin src/test/java/com/example/BasicTest.java

# Run
java -cp "bin;lib/junit-4.13.2.jar;lib/hamcrest-core-1.3.jar" org.junit.runner.JUnitCore com.example.BasicTest
```

### Output
```text
JUnit version 4.13.2
.Basic JUnit Test running: Environment Setup is correct!

Time: 0.005

OK (1 test)
```

---

## Exercise 2: Writing Basic JUnit Tests

### Description
Tests a `Calculator` class implementing basic arithmetic methods (`add`, `subtract`, `multiply`, `divide`), including validation checks for dividing by zero.

### Execution Command
```bash
# Compile
javac -d bin src/main/java/com/example/Calculator.java
javac -cp "bin;lib/junit-4.13.2.jar" -d bin src/test/java/com/example/CalculatorTest.java

# Run
java -cp "bin;lib/junit-4.13.2.jar;lib/hamcrest-core-1.3.jar" org.junit.runner.JUnitCore com.example.CalculatorTest
```

### Output
```text
JUnit version 4.13.2
.....
Time: 0.008

OK (5 tests)
```

---

## Exercise 3: Assertions in JUnit

### Description
Demonstrates the usage of various JUnit assertions (`assertEquals`, `assertTrue`, `assertFalse`, `assertNull`, `assertNotNull`).

### Execution Command
```bash
# Compile
javac -cp "lib/junit-4.13.2.jar" -d bin src/test/java/com/example/AssertionsTest.java

# Run
java -cp "bin;lib/junit-4.13.2.jar;lib/hamcrest-core-1.3.jar" org.junit.runner.JUnitCore com.example.AssertionsTest
```

### Output
```text
JUnit version 4.13.2
.All assertions in AssertionsTest executed and passed successfully!

Time: 0.006

OK (1 test)
```

---

## Exercise 4: Arrange-Act-Assert (AAA) Pattern, Test Fixtures, Setup and Teardown Methods

### Description
Uses a stateful `BankAccount` model to demonstrate Arrange-Act-Assert testing structure along with `@Before` (setup) and `@After` (teardown) annotations.

### Execution Command
```bash
# Compile
javac -d bin src/main/java/com/example/BankAccount.java
javac -cp "bin;lib/junit-4.13.2.jar" -d bin src/test/java/com/example/BankAccountTest.java

# Run
java -cp "bin;lib/junit-4.13.2.jar;lib/hamcrest-core-1.3.jar" org.junit.runner.JUnitCore com.example.BankAccountTest
```

### Output
```text
JUnit version 4.13.2
.[Setup] Initializing bank account with a starting balance of 100.0
Running testWithdrawOverdraft (expecting exception)...
[Teardown] Cleaning up bank account instance...
.[Setup] Initializing bank account with a starting balance of 100.0
Running testWithdraw...
[Teardown] Cleaning up bank account instance...
.[Setup] Initializing bank account with a starting balance of 100.0
Running testDeposit...
[Teardown] Cleaning up bank account instance...

Time: 0.009

OK (3 tests)
```
