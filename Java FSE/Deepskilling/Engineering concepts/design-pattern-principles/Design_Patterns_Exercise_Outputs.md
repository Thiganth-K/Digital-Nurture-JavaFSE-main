# Design Patterns and Principles — Hands-On Exercise Outputs

This document contains the execution output of the Design Patterns hands-on exercise problems implemented under `D:\IMPORTANT_FILES\PROJECT_FILES\Digital-Nurture-JavaFSE-main\Java FSE\Deepskilling\Engineering concepts\design-pattern-principles`.

---

## Exercise 1: Singleton Pattern — Logger

### Description
Implements the **Singleton Design Pattern** using a thread-safe, double-checked locking approach. The `Logger` class guarantees only one instance exists across the entire application, providing `log()`, `warn()`, and `error()` methods. The `LoggerTest` validates singleton behavior by obtaining multiple references and verifying they share the same identity hash code.

### Source Files
- `Logger.java` — Singleton class with lazy initialization and synchronized double-checked locking
- `LoggerTest.java` — Test harness validating single instance, logging operations, and cross-method reference equality

### Execution Command
```bash
# Compile
javac -d out src/Logger.java src/LoggerTest.java

# Run
java -cp out LoggerTest
```

### Output
```text
======================================
   Singleton Pattern - Logger Test    
======================================

>> Obtaining Logger instance (first call)...
[Logger] Logger instance created.
>> Obtaining Logger instance (second call)...

-- Singleton Verification --
logger1 hashCode : 1554547125
logger2 hashCode : 1554547125
✔ SUCCESS: Both references point to the SAME Logger instance.

-- Using logger1 --
[INFO]  Application has started.
[WARN]  Low memory detected.
[ERROR] Unable to connect to database.

-- Using logger2 --
[INFO]  Processing user request.
[WARN]  Deprecated API called.
[ERROR] Null pointer encountered.

>> Obtaining Logger instance (third call from helper method)...
logger3 hashCode : 1554547125
✔ SUCCESS: Helper method also returned the SAME Logger instance.

======================================
           Test Completed             
======================================
```

---

## Exercise 2: Factory Method Pattern — Document Processing

### Description
Implements the **Factory Method Design Pattern** for a document processing system. An abstract `DocumentFactory` declares the factory method `createDocument()`, which concrete factories (`WordDocumentFactory`, `PdfDocumentFactory`, `ExcelDocumentFactory`) override to produce specific `Document` types (`WordDocument`, `PdfDocument`, `ExcelDocument`). The client code works exclusively with the `Document` interface and `DocumentFactory` abstraction, enabling open/closed extensibility.

### Source Files
- `Document.java` — Abstract interface with `open()`, `save()`, `close()`, `getDocumentType()`
- `DocumentFactory.java` — Abstract factory with `createDocument()` and template method `openAndSaveDocument()`
- `WordDocument.java`, `PdfDocument.java`, `ExcelDocument.java` — Concrete products
- `WordDocumentFactory.java`, `PdfDocumentFactory.java`, `ExcelDocumentFactory.java` — Concrete factories
- `DocumentFactoryTest.java` — Test harness demonstrating factory usage and polymorphism

### Execution Command
```bash
# Compile
javac -d out src/*.java

# Run
java -cp out DocumentFactoryTest
```

### Output
```text
============================================
   Factory Method Pattern - Document Test   
============================================

--- Test 1: Creating documents via factories ---

  Created: Word Document (.docx)
  Created: PDF Document (.pdf)
  Created: Excel Document (.xlsx)

--- Test 2: Word Document operations ---
  [Word]  Opening Word document (.docx)...
  [Word]  Saving Word document (.docx)...
  [Word]  Closing Word document (.docx).

--- Test 3: PDF Document operations ---
  [PDF]   Opening PDF document (.pdf)...
  [PDF]   Saving PDF document (.pdf)...
  [PDF]   Closing PDF document (.pdf).

--- Test 4: Excel Document operations ---
  [Excel] Opening Excel document (.xlsx)...
  [Excel] Saving Excel document (.xlsx)...
  [Excel] Closing Excel document (.xlsx).

--- Test 5: Using factory template method (openAndSaveDocument) ---

  >> WordDocumentFactory:
  >> Created: Word Document (.docx)
  [Word]  Opening Word document (.docx)...
  [Word]  Saving Word document (.docx)...
  [Word]  Closing Word document (.docx).

  >> PdfDocumentFactory:
  >> Created: PDF Document (.pdf)
  [PDF]   Opening PDF document (.pdf)...
  [PDF]   Saving PDF document (.pdf)...
  [PDF]   Closing PDF document (.pdf).

  >> ExcelDocumentFactory:
  >> Created: Excel Document (.xlsx)
  [Excel] Opening Excel document (.xlsx)...
  [Excel] Saving Excel document (.xlsx)...
  [Excel] Closing Excel document (.xlsx).

--- Test 6: Polymorphic factory usage ---

  Factory produced: Word Document (.docx)
  [Word]  Opening Word document (.docx)...
  [Word]  Saving Word document (.docx)...
  [Word]  Closing Word document (.docx).

  Factory produced: PDF Document (.pdf)
  [PDF]   Opening PDF document (.pdf)...
  [PDF]   Saving PDF document (.pdf)...
  [PDF]   Closing PDF document (.pdf).

  Factory produced: Excel Document (.xlsx)
  [Excel] Opening Excel document (.xlsx)...
  [Excel] Saving Excel document (.xlsx)...
  [Excel] Closing Excel document (.xlsx).

============================================
             Test Completed                 
============================================
```

---

## Exercise 3: Builder Pattern — Computer Configuration

### Description
Implements the **Builder Design Pattern** via a static nested `Builder` class inside the `Computer` product class. The builder separates required parameters (`cpu`, `ramGB`) from numerous optional ones (`storage`, `gpu`, `OS`, `wifi`, `bluetooth`, `power supply`, `cooling system`). The fluent API enables readable, step-by-step construction of different Computer configurations — from a minimal budget PC to a full gaming rig and headless server.

### Source Files
- `Computer.java` — Product class with private constructor, static nested `Builder` class, fluent API, and formatted `toString()`
- `ComputerBuilderTest.java` — Test harness building 5 different configurations

### Execution Command
```bash
# Compile
javac -d out src/Computer.java src/ComputerBuilderTest.java

# Run
java -cp out ComputerBuilderTest
```

### Output
```text
=============================================
    Builder Pattern - Computer Config Test   
=============================================

[Config 1] Minimal Budget PC

  +---------------------------------------+
  |       Computer Configuration          |
  +---------------------------------------+
  |  CPU            : Intel Core i3        |
  |  RAM            : 8 GB                |
  |  Storage        : 256 GB HDD          |
  |  GPU            : Integrated           |
  |  OS             : Linux Ubuntu         |
  |  Power Supply   : Standard             |
  |  Cooling        : Air Cooling          |
  |  Wi-Fi          : Yes                  |
  |  Bluetooth      : No                   |
  +---------------------------------------+

[Config 2] Standard Office Laptop

  +---------------------------------------+
  |       Computer Configuration          |
  +---------------------------------------+
  |  CPU            : Intel Core i5        |
  |  RAM            : 16 GB               |
  |  Storage        : 512 GB SSD          |
  |  GPU            : Integrated           |
  |  OS             : Windows 11           |
  |  Power Supply   : 65W Adapter          |
  |  Cooling        : Air Cooling          |
  |  Wi-Fi          : Yes                  |
  |  Bluetooth      : Yes                  |
  +---------------------------------------+

[Config 3] High-End Gaming Rig

  +---------------------------------------+
  |       Computer Configuration          |
  +---------------------------------------+
  |  CPU            : Intel Core i9-14900K |
  |  RAM            : 64 GB               |
  |  Storage        : 2000 GB NVMe SSD    |
  |  GPU            : NVIDIA RTX 4090 24GB |
  |  OS             : Windows 11 Pro       |
  |  Power Supply   : 1000W Platinum       |
  |  Cooling        : 360mm Liquid Cooling |
  |  Wi-Fi          : Yes                  |
  |  Bluetooth      : Yes                  |
  +---------------------------------------+

[Config 4] Developer Workstation

  +---------------------------------------+
  |       Computer Configuration          |
  +---------------------------------------+
  |  CPU            : AMD Ryzen 9 7950X   |
  |  RAM            : 128 GB              |
  |  Storage        : 4000 GB SSD         |
  |  GPU            : NVIDIA RTX 3060      |
  |  OS             : macOS Ventura        |
  |  Power Supply   : 850W Gold            |
  |  Cooling        : Air Tower Cooler     |
  |  Wi-Fi          : Yes                  |
  |  Bluetooth      : Yes                  |
  +---------------------------------------+

[Config 5] Headless Server

  +---------------------------------------+
  |       Computer Configuration          |
  +---------------------------------------+
  |  CPU            : AMD EPYC 9654       |
  |  RAM            : 512 GB              |
  |  Storage        : 10000 GB SSD RAID   |
  |  GPU            : Integrated           |
  |  OS             : None                 |
  |  Power Supply   : 1600W Titanium       |
  |  Cooling        : Data Center Cooling  |
  |  Wi-Fi          : No                   |
  |  Bluetooth      : No                   |
  +---------------------------------------+

-- Object Identity Check --
  budgetPC    hashCode : 1023892928
  gamingPC    hashCode : 558638686
  devStation  hashCode : 1149319664
  (All different — each build() creates a new Computer object)

=============================================
             Test Completed                  
=============================================
```
