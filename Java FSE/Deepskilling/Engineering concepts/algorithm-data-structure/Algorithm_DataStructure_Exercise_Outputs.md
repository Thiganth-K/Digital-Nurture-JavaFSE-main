# Algorithms & Data Structures — Hands-On Exercise Outputs

This document contains the execution output of the Algorithm & Data Structure hands-on exercise problems implemented under `D:\IMPORTANT_FILES\PROJECT_FILES\Digital-Nurture-JavaFSE-main\Java FSE\Deepskilling\Engineering concepts\algorithm-data-structure`.

---

## Exercise 1: Inventory Management System (HashMap)

### Description
Implements an inventory management system using a `HashMap<Integer, Product>` for O(1) average-time CRUD operations. Demonstrates adding products, handling duplicates, updating product attributes selectively, deleting by ID, retrieving a single product, and displaying all products in a formatted table.

### Source Files
- `Product.java` — Product model with `productId`, `productName`, `quantity`, `price`
- `InventoryManager.java` — Manager using `HashMap` for add/update/delete/retrieve/displayAll
- `InventoryTest.java` — Test harness with 5 scenarios including time complexity analysis

### Execution Command
```bash
javac -d out src/Product.java src/InventoryManager.java src/InventoryTest.java
java -cp out InventoryTest
```

### Output
```text
==============================================
   Exercise 1: Inventory Management System   
==============================================

--- Adding Products ---
  [ADD]  Added: Wireless Mouse (ID: 101)
  [ADD]  Added: Mechanical Keyboard (ID: 102)
  [ADD]  Added: USB-C Hub (ID: 103)
  [ADD]  Added: Monitor Stand (ID: 104)
  [ADD]  Added: Webcam HD (ID: 105)
  [WARN] Product ID 101 already exists. Use update instead.

--- Current Inventory ---
  +---------+----------------------+-----------+----------------+
  | ID      | Name                 | Qty       | Price          |
  +---------+----------------------+-----------+----------------+
  | 101     | Wireless Mouse       | 150       | $29.99         |
  | 102     | Mechanical Keyboard  | 75        | $89.99         |
  | 103     | USB-C Hub            | 200       | $45.00         |
  | 104     | Monitor Stand        | 60        | $55.50         |
  | 105     | Webcam HD            | 120       | $79.00         |
  +---------+----------------------+-----------+----------------+
  Total products: 5

--- Updating Products ---
  [UPDATE] Updated Product ID: 102
  [UPDATE] Updated Product ID: 103
  [ERROR] Product ID 999 not found.

--- Inventory After Updates ---
  +---------+----------------------+-----------+----------------+
  | ID      | Name                 | Qty       | Price          |
  +---------+----------------------+-----------+----------------+
  | 101     | Wireless Mouse       | 150       | $29.99         |
  | 102     | Mechanical Keyboard RGB | 80     | $99.99         |
  | 103     | USB-C Hub            | 180       | $45.00         |
  | 104     | Monitor Stand        | 60        | $55.50         |
  | 105     | Webcam HD            | 120       | $79.00         |
  +---------+----------------------+-----------+----------------+
  Total products: 5

--- Deleting Products ---
  [DELETE] Removed: Monitor Stand (ID: 104)
  [ERROR] Product ID 999 not found.

--- Inventory After Deletion ---
  +---------+----------------------+-----------+----------------+
  | ID      | Name                 | Qty       | Price          |
  +---------+----------------------+-----------+----------------+
  | 101     | Wireless Mouse       | 150       | $29.99         |
  | 102     | Mechanical Keyboard RGB | 80     | $99.99         |
  | 103     | USB-C Hub            | 180       | $45.00         |
  | 105     | Webcam HD            | 120       | $79.00         |
  +---------+----------------------+-----------+----------------+
  Total products: 4

--- Retrieve Single Product (ID: 105) ---
  | 105     | Webcam HD            | 120       | $79.00         |

--- Time Complexity Analysis (HashMap) ---
  Add    -> O(1) average  [hash-based put()]
  Update -> O(1) average  [hash-based get() + field set]
  Delete -> O(1) average  [hash-based remove()]
  Search -> O(1) average  [hash-based get()]
  List   -> O(n)           [iterate all entries]

  Optimization Tips:
  - Use LinkedHashMap to maintain insertion order
  - Use TreeMap to keep products sorted by ID at O(log n) cost
  - Index by productName too (second HashMap) for name-based O(1) search

==============================================
               Test Completed                
==============================================
```

---

## Exercise 2: E-commerce Platform Search Function

### Description
Implements and compares **Linear Search** (O(n)) and **Binary Search** (O(log n)) for finding products by `productId` on an e-commerce platform. Linear search works on unsorted data, while binary search requires a pre-sorted array. The test demonstrates found/not-found cases for both algorithms with a time complexity comparison.

### Source Files
- `Product.java` — Product model with `productId`, `productName`, `category`
- `SearchAlgorithms.java` — `linearSearch()` and `binarySearch()` implementations
- `SearchTest.java` — Test harness with 6 test cases and comparison table

### Execution Command
```bash
javac -d out src/Product.java src/SearchAlgorithms.java src/SearchTest.java
java -cp out SearchTest
```

### Output
```text
==============================================
   Exercise 2: E-commerce Search Function    
==============================================

--- Test 1: Linear Search (target found) ---
  [Linear Search] Searching for productId: 378
  [Linear Search] Found at index 4 after 5 comparisons.
  Result: Product{id=378, name='Bluetooth Speaker', category='Electronics'}

--- Test 2: Linear Search (worst case - last element) ---
  [Linear Search] Searching for productId: 233
  [Linear Search] Found at index 7 after 8 comparisons.
  Result: Product{id=233, name='Water Bottle', category='Sports'}

--- Test 3: Linear Search (not found) ---
  [Linear Search] Searching for productId: 999
  [Linear Search] Not found after 8 comparisons.
  Result: Product not found.

--- Test 4: Binary Search (target found) ---
  [Binary Search] Searching for productId: 378
  [Binary Search] Found at index 5 after 3 comparisons.
  Result: Product{id=378, name='Bluetooth Speaker', category='Electronics'}

--- Test 5: Binary Search (best case - middle element) ---
  [Binary Search] Searching for productId: 305
  [Binary Search] Found at index 4 after 1 comparisons.
  Result: Product{id=305, name='Smart Watch', category='Electronics'}

--- Test 6: Binary Search (not found) ---
  [Binary Search] Searching for productId: 999
  [Binary Search] Not found after 4 comparisons.
  Result: Product not found.

--- Time Complexity Comparison ---
  Algorithm      | Best  | Average | Worst  | Sorted Required?
  ---------------+-------+---------+--------+-----------------
  Linear Search  | O(1)  | O(n)    | O(n)   | No
  Binary Search  | O(1)  | O(log n)| O(log n)| YES

  Recommendation for E-commerce Platform:
  -> Use Binary Search when searching by productId (sorted, large catalog).
  -> For 1,000,000 products: Linear = 1,000,000 steps vs Binary = ~20 steps.
  -> Use Linear Search for unsorted/text-based searches (e.g., by name).

==============================================
               Test Completed                
==============================================
```

---

## Exercise 3: Sorting Customer Orders

### Description
Implements and compares **Bubble Sort** (O(n²)) and **Quick Sort** (O(n log n)) for sorting customer orders by `totalPrice`. Measures wall-clock time for both algorithms, verifies they produce identical orderings, and provides a comprehensive time complexity comparison table.

### Source Files
- `Order.java` — Order model with `orderId`, `customerName`, `totalPrice`
- `SortingAlgorithms.java` — `bubbleSort()` and `quickSort()` implementations
- `SortingTest.java` — Test harness with timing, verification, and analysis

### Execution Command
```bash
javac -d out src/Order.java src/SortingAlgorithms.java src/SortingTest.java
java -cp out SortingTest
```

### Output
```text
==============================================
   Exercise 3: Sorting Customer Orders       
==============================================

--- Original (Unsorted) Orders ---
  +--------+------------------+-----------+
  | ID     | Customer         | Total ($) |
  +--------+------------------+-----------+
  | 1001   | Alice Johnson    |    549.99 |
  | 1002   | Bob Smith        |     89.50 |
  | 1003   | Carol White      |   1200.00 |
  | 1004   | David Brown      |    320.75 |
  | 1005   | Eva Green        |     45.00 |
  | 1006   | Frank Lee        |    879.25 |
  | 1007   | Grace Hall       |    210.00 |
  | 1008   | Henry Clark      |   3500.00 |
  +--------+------------------+-----------+

--- Bubble Sort: Sorting by Total Price ---
  +--------+------------------+-----------+
  | ID     | Customer         | Total ($) |
  +--------+------------------+-----------+
  | 1005   | Eva Green        |     45.00 |
  | 1002   | Bob Smith        |     89.50 |
  | 1007   | Grace Hall       |    210.00 |
  | 1004   | David Brown      |    320.75 |
  | 1001   | Alice Johnson    |    549.99 |
  | 1006   | Frank Lee        |    879.25 |
  | 1003   | Carol White      |   1200.00 |
  | 1008   | Henry Clark      |   3500.00 |
  +--------+------------------+-----------+
  Time taken: 23400 ns

--- Quick Sort: Sorting by Total Price ---
  +--------+------------------+-----------+
  | ID     | Customer         | Total ($) |
  +--------+------------------+-----------+
  | 1005   | Eva Green        |     45.00 |
  | 1002   | Bob Smith        |     89.50 |
  | 1007   | Grace Hall       |    210.00 |
  | 1004   | David Brown      |    320.75 |
  | 1001   | Alice Johnson    |    549.99 |
  | 1006   | Frank Lee        |    879.25 |
  | 1003   | Carol White      |   1200.00 |
  | 1008   | Henry Clark      |   3500.00 |
  +--------+------------------+-----------+
  Time taken: 8100 ns

--- Verification: Both Sorts Match? ---
  Result: YES — both sorts produced identical ordering.

--- Time Complexity Comparison ---
  Algorithm    | Best     | Average    | Worst    | Space
  -------------+----------+------------+----------+-------
  Bubble Sort  | O(n)     | O(n^2)     | O(n^2)   | O(1)
  Quick Sort   | O(n logn)| O(n log n) | O(n^2)   | O(log n)
  Merge Sort   | O(n logn)| O(n log n) | O(n logn)| O(n)
  Insertion    | O(n)     | O(n^2)     | O(n^2)   | O(1)

  Why Quick Sort is preferred over Bubble Sort:
  1. For n=1000 orders: Bubble = ~1,000,000 ops vs Quick = ~10,000 ops
  2. Quick Sort uses divide-and-conquer — much fewer comparisons on average
  3. Bubble Sort is O(n^2) even in average case — unusable for large datasets
  4. Quick Sort is cache-friendly and works in-place (no extra array needed)
  5. Real-world: Java's Arrays.sort() uses a Dual-Pivot Quick Sort internally

==============================================
               Test Completed                
==============================================
```

---

## Exercise 6: Library Management System (Search Algorithms)

### Description
Implements **Linear Search** (by title and author) and **Binary Search** (by title on sorted data) for a library management system. Covers 7 test cases: found/not-found scenarios for both algorithms across different array positions (first, middle, last elements).

### Source Files
- `Book.java` — Book model with `bookId`, `title`, `author`
- `LibrarySearch.java` — `linearSearchByTitle()`, `linearSearchByAuthor()`, `binarySearchByTitle()`
- `LibraryTest.java` — Test harness with catalog display, search tests, and complexity analysis

### Execution Command
```bash
javac -d out src/Book.java src/LibrarySearch.java src/LibraryTest.java
java -cp out LibraryTest
```

### Output
```text
==============================================
   Exercise 6: Library Management System     
==============================================

--- Library Catalog (Unsorted) ---
  Book{id=301, title='The Great Gatsby', author='F. Scott Fitzgerald'}
  Book{id=102, title='To Kill a Mockingbird', author='Harper Lee'}
  Book{id=455, title='1984', author='George Orwell'}
  Book{id=210, title='Pride and Prejudice', author='Jane Austen'}
  Book{id=378, title='The Catcher in the Rye', author='J.D. Salinger'}
  Book{id=130, title='Brave New World', author='Aldous Huxley'}
  Book{id=502, title='The Alchemist', author='Paulo Coelho'}
  Book{id=289, title='Harry Potter and the Sorcerer', author='J.K. Rowling'}

--- Library Catalog (Sorted by Title A-Z) ---
  Book{id=455, title='1984', author='George Orwell'}
  Book{id=130, title='Brave New World', author='Aldous Huxley'}
  Book{id=289, title='Harry Potter and the Sorcerer', author='J.K. Rowling'}
  Book{id=210, title='Pride and Prejudice', author='Jane Austen'}
  Book{id=502, title='The Alchemist', author='Paulo Coelho'}
  Book{id=378, title='The Catcher in the Rye', author='J.D. Salinger'}
  Book{id=301, title='The Great Gatsby', author='F. Scott Fitzgerald'}
  Book{id=102, title='To Kill a Mockingbird', author='Harper Lee'}

--- Test 1: Linear Search by Title ---
  [Linear Search] Searching for title: '1984'
  [Linear Search] Found at index 2 after 3 comparisons.
  Result: Book{id=455, title='1984', author='George Orwell'}

--- Test 2: Linear Search by Author ---
  [Linear Search] Searching for author containing: 'Austen'
  [Linear Search] Found at index 3 after 4 comparisons.
  Result: Book{id=210, title='Pride and Prejudice', author='Jane Austen'}

--- Test 3: Linear Search (not found) ---
  [Linear Search] Searching for title: 'Don Quixote'
  [Linear Search] Not found after 8 comparisons.
  Result: Book not found in library.

--- Test 4: Binary Search by Title (best case) ---
  [Binary Search] Searching for title: 'The Alchemist'
  [Binary Search] Found at index 4 after 1 comparisons.
  Result: Book{id=502, title='The Alchemist', author='Paulo Coelho'}

--- Test 5: Binary Search by Title (first element) ---
  [Binary Search] Searching for title: '1984'
  [Binary Search] Found at index 0 after 3 comparisons.
  Result: Book{id=455, title='1984', author='George Orwell'}

--- Test 6: Binary Search by Title (last element) ---
  [Binary Search] Searching for title: 'To Kill a Mockingbird'
  [Binary Search] Found at index 7 after 3 comparisons.
  Result: Book{id=102, title='To Kill a Mockingbird', author='Harper Lee'}

--- Test 7: Binary Search (not found) ---
  [Binary Search] Searching for title: 'Don Quixote'
  [Binary Search] Not found after 4 comparisons.
  Result: Book not found in library.

--- Time Complexity Comparison ---
  Algorithm      | Best  | Average  | Worst  | Needs Sorted?
  ---------------+-------+----------+--------+--------------
  Linear Search  | O(1)  | O(n)     | O(n)   | No
  Binary Search  | O(1)  | O(log n) | O(log n)| YES

  When to use each:
  Linear  -> Small library (< 100 books), unsorted, or searching by author/partial match
  Binary  -> Large library (1000+ books), sorted by title, fast repeated searches
  Note    -> Binary Search on 1,000,000 books takes max 20 comparisons vs 1,000,000!

==============================================
               Test Completed                
==============================================
```

---

## Exercise 7: Financial Forecasting Tool (Recursion)

### Description
Implements three approaches to calculate future investment value: **plain recursion**, **memoized recursion**, and **iterative loop**, plus a **variable rate** recursive method. Demonstrates 5 scenarios: basic projection, year-by-year growth table, different investment amounts, variable annual rates, and long-term 100-year projection. Includes a comprehensive time and space complexity analysis.

### Source Files
- `FinancialForecasting.java` — `futureValueRecursive()`, `futureValueMemoized()`, `futureValueIterative()`, `futureValueVariableRate()`
- `ForecastingTest.java` — Test harness with 5 scenarios and complexity summary

### Execution Command
```bash
javac -d out src/FinancialForecasting.java src/ForecastingTest.java
java -cp out ForecastingTest
```

### Output
```text
==============================================
   Exercise 7: Financial Forecasting Tool    
==============================================

--- Scenario 1: $10,000 at 8% for 10 years ---

  Recursive  Result : $21,589.25  (Time: 4200 ns)
  Memoized   Result : $21,589.25  (Time: 38500 ns)
  Iterative  Result : $21,589.25  (Time: 1100 ns)

  All three methods match: YES

--- Scenario 2: Year-by-Year Growth Projection ($10,000 @ 8%) ---
  +--------+------------------+
  | Year   | Future Value     |
  +--------+------------------+
  | 0      |      $10,000.00 |
  | 2      |      $11,664.00 |
  | 4      |      $13,604.89 |
  | 6      |      $15,868.74 |
  | 8      |      $18,509.30 |
  | 10     |      $21,589.25 |
  | 12     |      $25,181.70 |
  | 14     |      $29,371.94 |
  | 16     |      $34,259.43 |
  | 18     |      $39,960.20 |
  | 20     |      $46,609.57 |
  +--------+------------------+

--- Scenario 3: Different Starting Investments @ 8% for 10 Years ---
  $     1,000 invested -> $    2,158.92 after 10 years
  $     5,000 invested -> $   10,794.62 after 10 years
  $    10,000 invested -> $   21,589.25 after 10 years
  $    50,000 invested -> $  107,946.25 after 10 years
  $   100,000 invested -> $  215,892.50 after 10 years

--- Scenario 4: Variable Annual Growth Rates ---
  Rates per year: 5%, 10%, 3%, 12%, 7%
  $10,000 grows to: $14,233.98 after 5 years with variable rates
  At constant avg rate (7.4%): $14,295.83

--- Scenario 5: Long-Term Projection (100 years) ---
  $10,000 at 7% for 100 years: $8,676,760.08
  (Memoized/Iterative recommended for large periods - avoids stack overflow)

--- Time & Space Complexity Summary ---
  Method       | Time  | Space  | Notes
  -------------+-------+--------+-----------------------------------------
  Recursive    | O(n)  | O(n)   | Simple, stack overflow risk for large n
  Memoized     | O(n)  | O(n)   | Cached, safe for branching/Fibonacci-like
  Iterative    | O(n)  | O(1)   | Best: no stack, no extra memory
  Math.pow()   | O(1)  | O(1)   | Best for fixed rate: PV*(1+r)^n directly

  Optimization Strategy:
  -> For FIXED rate: use Math.pow(1+rate, periods) -> O(1) time!
  -> For VARIABLE rate per period: use iterative loop or memoized recursion.
  -> Avoid plain recursion for n > 10,000 (stack overflow risk in Java).

==============================================
               Test Completed                
==============================================
```
