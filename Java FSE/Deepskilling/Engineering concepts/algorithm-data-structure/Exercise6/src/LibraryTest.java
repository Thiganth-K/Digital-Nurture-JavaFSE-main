/**
 * LibraryTest.java
 * Exercise 6 - Library Management System
 *
 * Demonstrates and compares Linear Search and Binary Search
 * for finding books by title and author.
 */
public class LibraryTest {

    public static void main(String[] args) {

        System.out.println("==============================================");
        System.out.println("   Exercise 6: Library Management System     ");
        System.out.println("==============================================\n");

        // ── Unsorted array — for Linear Search ───────────────────────
        Book[] unsortedBooks = {
            new Book(301, "The Great Gatsby",              "F. Scott Fitzgerald"),
            new Book(102, "To Kill a Mockingbird",         "Harper Lee"),
            new Book(455, "1984",                          "George Orwell"),
            new Book(210, "Pride and Prejudice",           "Jane Austen"),
            new Book(378, "The Catcher in the Rye",        "J.D. Salinger"),
            new Book(130, "Brave New World",               "Aldous Huxley"),
            new Book(502, "The Alchemist",                 "Paulo Coelho"),
            new Book(289, "Harry Potter and the Sorcerer", "J.K. Rowling"),
        };

        // ── Sorted array (by title A-Z) — for Binary Search ──────────
        Book[] sortedBooks = {
            new Book(455, "1984",                          "George Orwell"),
            new Book(130, "Brave New World",               "Aldous Huxley"),
            new Book(289, "Harry Potter and the Sorcerer", "J.K. Rowling"),
            new Book(210, "Pride and Prejudice",           "Jane Austen"),
            new Book(502, "The Alchemist",                 "Paulo Coelho"),
            new Book(378, "The Catcher in the Rye",        "J.D. Salinger"),
            new Book(301, "The Great Gatsby",              "F. Scott Fitzgerald"),
            new Book(102, "To Kill a Mockingbird",         "Harper Lee"),
        };

        System.out.println("--- Library Catalog (Unsorted) ---");
        for (Book b : unsortedBooks) System.out.println(b);

        System.out.println("\n--- Library Catalog (Sorted by Title A-Z) ---");
        for (Book b : sortedBooks) System.out.println(b);

        // ── Test 1: Linear Search by title ───────────────────────────
        System.out.println("\n--- Test 1: Linear Search by Title ---");
        Book found = LibrarySearch.linearSearchByTitle(unsortedBooks, "1984");
        if (found != null) System.out.println("  Result: " + found);

        // ── Test 2: Linear Search by author ──────────────────────────
        System.out.println("\n--- Test 2: Linear Search by Author ---");
        found = LibrarySearch.linearSearchByAuthor(unsortedBooks, "Austen");
        if (found != null) System.out.println("  Result: " + found);

        // ── Test 3: Linear Search — not found ────────────────────────
        System.out.println("\n--- Test 3: Linear Search (not found) ---");
        found = LibrarySearch.linearSearchByTitle(unsortedBooks, "Don Quixote");
        if (found == null) System.out.println("  Result: Book not found in library.");

        // ── Test 4: Binary Search — best case (middle element) ───────
        System.out.println("\n--- Test 4: Binary Search by Title (best case) ---");
        found = LibrarySearch.binarySearchByTitle(sortedBooks, "The Alchemist");
        if (found != null) System.out.println("  Result: " + found);

        // ── Test 5: Binary Search — first element ────────────────────
        System.out.println("\n--- Test 5: Binary Search by Title (first element) ---");
        found = LibrarySearch.binarySearchByTitle(sortedBooks, "1984");
        if (found != null) System.out.println("  Result: " + found);

        // ── Test 6: Binary Search — last element ─────────────────────
        System.out.println("\n--- Test 6: Binary Search by Title (last element) ---");
        found = LibrarySearch.binarySearchByTitle(sortedBooks, "To Kill a Mockingbird");
        if (found != null) System.out.println("  Result: " + found);

        // ── Test 7: Binary Search — not found ────────────────────────
        System.out.println("\n--- Test 7: Binary Search (not found) ---");
        found = LibrarySearch.binarySearchByTitle(sortedBooks, "Don Quixote");
        if (found == null) System.out.println("  Result: Book not found in library.");

        // ── Analysis ─────────────────────────────────────────────────
        System.out.println("\n--- Time Complexity Comparison ---");
        System.out.println("  Algorithm      | Best  | Average  | Worst  | Needs Sorted?");
        System.out.println("  ---------------+-------+----------+--------+--------------");
        System.out.println("  Linear Search  | O(1)  | O(n)     | O(n)   | No");
        System.out.println("  Binary Search  | O(1)  | O(log n) | O(log n)| YES");

        System.out.println("\n  When to use each:");
        System.out.println("  Linear  -> Small library (< 100 books), unsorted, or searching by author/partial match");
        System.out.println("  Binary  -> Large library (1000+ books), sorted by title, fast repeated searches");
        System.out.println("  Note    -> Binary Search on 1,000,000 books takes max 20 comparisons vs 1,000,000!");

        System.out.println("\n==============================================");
        System.out.println("               Test Completed                ");
        System.out.println("==============================================");
    }
}
