/**
 * LibrarySearch.java
 * Exercise 6 - Library Management System
 *
 * Provides Linear Search and Binary Search for books by title.
 *
 * ================================================================
 * SEARCH ALGORITHMS EXPLAINED
 * ================================================================
 *
 * 1. LINEAR SEARCH
 *    - Checks each book one by one from the beginning.
 *    - Works on any array (sorted or unsorted).
 *    - Best Case  : O(1)  — book is the first element
 *    - Average    : O(n)  — book is somewhere in the middle
 *    - Worst Case : O(n)  — book is last or not present
 *    - When to use: Small datasets, unsorted data, or when
 *      the list changes frequently (no cost to keep sorted).
 *
 * 2. BINARY SEARCH
 *    - Starts at the middle. If target is smaller, searches left half;
 *      if larger, searches right half. Repeats on remaining half.
 *    - REQUIRES the array to be sorted (by title alphabetically here).
 *    - Best Case  : O(1)     — book is exactly at the middle
 *    - Average    : O(log n) — halves the search space each step
 *    - Worst Case : O(log n) — must reach a single element
 *    - When to use: Large, sorted datasets where searches are frequent.
 *      For 1,000,000 books: linear needs up to 1,000,000 checks,
 *      binary needs at most 20 checks (log2(1000000) ≈ 20).
 * ================================================================
 */
public class LibrarySearch {

    // ─────────────────────────────────────────────────────────────────
    //  LINEAR SEARCH — by title (case-insensitive, partial match)
    // ─────────────────────────────────────────────────────────────────

    /**
     * Searches for a book by title using Linear Search.
     * Works on unsorted arrays. Returns the first match found.
     *
     * Time Complexity: O(n)
     *
     * @param books     array of Book objects (any order)
     * @param titleKey  title (or part of title) to search for
     * @return the first matching Book, or null if not found
     */
    public static Book linearSearchByTitle(Book[] books, String titleKey) {
        System.out.println("  [Linear Search] Searching for title: \"" + titleKey + "\"");
        int comparisons = 0;
        String key = titleKey.toLowerCase();

        for (int i = 0; i < books.length; i++) {
            comparisons++;
            if (books[i].getTitle().toLowerCase().contains(key)) {
                System.out.println("  Found at index " + i + " after " + comparisons + " comparison(s).");
                return books[i];
            }
        }
        System.out.println("  Not found after " + comparisons + " comparison(s).");
        return null;
    }

    /**
     * Searches for a book by author using Linear Search.
     * (Binary Search on author would require a different sorted array.)
     *
     * Time Complexity: O(n)
     *
     * @param books      array of Book objects (any order)
     * @param authorKey  author name to search for
     * @return the first matching Book, or null if not found
     */
    public static Book linearSearchByAuthor(Book[] books, String authorKey) {
        System.out.println("  [Linear Search] Searching by author: \"" + authorKey + "\"");
        int comparisons = 0;
        String key = authorKey.toLowerCase();

        for (int i = 0; i < books.length; i++) {
            comparisons++;
            if (books[i].getAuthor().toLowerCase().contains(key)) {
                System.out.println("  Found at index " + i + " after " + comparisons + " comparison(s).");
                return books[i];
            }
        }
        System.out.println("  Not found after " + comparisons + " comparison(s).");
        return null;
    }

    // ─────────────────────────────────────────────────────────────────
    //  BINARY SEARCH — by exact title (sorted array required)
    // ─────────────────────────────────────────────────────────────────

    /**
     * Searches for a book by exact title using Binary Search.
     * The array MUST be sorted alphabetically by title.
     *
     * Time Complexity: O(log n)
     *
     * @param sortedBooks  array sorted alphabetically by title
     * @param exactTitle   exact title string to match
     * @return the matching Book, or null if not found
     */
    public static Book binarySearchByTitle(Book[] sortedBooks, String exactTitle) {
        System.out.println("  [Binary Search] Searching for title: \"" + exactTitle + "\"");
        int low  = 0;
        int high = sortedBooks.length - 1;
        int comparisons = 0;

        while (low <= high) {
            int mid = low + (high - low) / 2;
            comparisons++;

            int cmp = sortedBooks[mid].getTitle()
                          .compareToIgnoreCase(exactTitle);

            if (cmp == 0) {
                System.out.println("  Found at index " + mid + " after " + comparisons + " comparison(s).");
                return sortedBooks[mid];
            } else if (cmp < 0) {
                low = mid + 1;   // target is alphabetically after mid
            } else {
                high = mid - 1;  // target is alphabetically before mid
            }
        }
        System.out.println("  Not found after " + comparisons + " comparison(s).");
        return null;
    }
}
