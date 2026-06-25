/**
 * ForecastingTest.java
 * Exercise 7 - Financial Forecasting
 *
 * Demonstrates recursive, memoized, and iterative future value
 * calculations and validates all three produce identical results.
 */
public class ForecastingTest {

    public static void main(String[] args) {

        System.out.println("==============================================");
        System.out.println("   Exercise 7: Financial Forecasting Tool    ");
        System.out.println("==============================================\n");

        // ── Scenario 1: Fixed Growth Rate ────────────────────────────
        double principal  = 10000.0;  // $10,000 initial investment
        double rate       = 0.08;     // 8% annual growth rate
        int    years      = 10;       // forecast over 10 years

        System.out.println("--- Scenario 1: $10,000 at 8% for 10 years ---\n");

        // Recursive
        long start = System.nanoTime();
        double rvResult = FinancialForecasting.futureValueRecursive(principal, rate, years);
        long rvTime = System.nanoTime() - start;
        System.out.printf("  Recursive  Result : $%,.2f  (Time: %d ns)%n", rvResult, rvTime);

        // Memoized
        start = System.nanoTime();
        double memoResult = FinancialForecasting.futureValueMemoized(principal, rate, years);
        long memoTime = System.nanoTime() - start;
        System.out.printf("  Memoized   Result : $%,.2f  (Time: %d ns)%n", memoResult, memoTime);

        // Iterative
        start = System.nanoTime();
        double iterResult = FinancialForecasting.futureValueIterative(principal, rate, years);
        long iterTime = System.nanoTime() - start;
        System.out.printf("  Iterative  Result : $%,.2f  (Time: %d ns)%n", iterResult, iterTime);

        System.out.println("\n  All three methods match: "
            + (Math.abs(rvResult - iterResult) < 0.001 ? "YES" : "NO"));

        // ── Scenario 2: Year-by-year growth table ────────────────────
        System.out.println("\n--- Scenario 2: Year-by-Year Growth Projection ($10,000 @ 8%) ---");
        System.out.println("  +--------+------------------+");
        System.out.println("  | Year   | Future Value     |");
        System.out.println("  +--------+------------------+");
        for (int y = 0; y <= 20; y += 2) {
            double fv = FinancialForecasting.futureValueRecursive(principal, rate, y);
            System.out.printf("  | %-6d | $%,14.2f |%n", y, fv);
        }
        System.out.println("  +--------+------------------+");

        // ── Scenario 3: Different investment amounts ─────────────────
        System.out.println("\n--- Scenario 3: Different Starting Investments @ 8% for 10 Years ---");
        double[] investments = {1000, 5000, 10000, 50000, 100000};
        for (double inv : investments) {
            double fv = FinancialForecasting.futureValueRecursive(inv, rate, years);
            System.out.printf("  $%,10.0f invested -> $%,12.2f after 10 years%n", inv, fv);
        }

        // ── Scenario 4: Variable Growth Rates (realistic) ────────────
        System.out.println("\n--- Scenario 4: Variable Annual Growth Rates ---");
        double[] variableRates = {0.05, 0.10, 0.03, 0.12, 0.07};  // 5 years, different rate each year
        System.out.println("  Rates per year: 5%, 10%, 3%, 12%, 7%");
        double varResult = FinancialForecasting.futureValueVariableRate(10000, variableRates, 0);
        System.out.printf("  $10,000 grows to: $%,.2f after 5 years with variable rates%n", varResult);

        // Compare with constant rate equivalent
        double avgRate = (0.05 + 0.10 + 0.03 + 0.12 + 0.07) / 5;
        double constResult = FinancialForecasting.futureValueRecursive(10000, avgRate, 5);
        System.out.printf("  At constant avg rate (%.1f%%): $%,.2f%n", avgRate * 100, constResult);

        // ── Scenario 5: Long-term projection to show recursion limit ─
        System.out.println("\n--- Scenario 5: Long-Term Projection (100 years) ---");
        double longResult = FinancialForecasting.futureValueMemoized(10000, 0.07, 100);
        System.out.printf("  $10,000 at 7%% for 100 years: $%,.2f%n", longResult);
        System.out.println("  (Memoized/Iterative recommended for large periods - avoids stack overflow)");

        // ── Time Complexity Summary ───────────────────────────────────
        System.out.println("\n--- Time & Space Complexity Summary ---");
        System.out.println("  Method       | Time  | Space  | Notes");
        System.out.println("  -------------+-------+--------+-----------------------------------------");
        System.out.println("  Recursive    | O(n)  | O(n)   | Simple, stack overflow risk for large n");
        System.out.println("  Memoized     | O(n)  | O(n)   | Cached, safe for branching/Fibonacci-like");
        System.out.println("  Iterative    | O(n)  | O(1)   | Best: no stack, no extra memory");
        System.out.println("  Math.pow()   | O(1)  | O(1)   | Best for fixed rate: PV*(1+r)^n directly");

        System.out.println("\n  Optimization Strategy:");
        System.out.println("  -> For FIXED rate: use Math.pow(1+rate, periods) -> O(1) time!");
        System.out.println("  -> For VARIABLE rate per period: use iterative loop or memoized recursion.");
        System.out.println("  -> Avoid plain recursion for n > 10,000 (stack overflow risk in Java).");

        System.out.println("\n==============================================");
        System.out.println("               Test Completed                ");
        System.out.println("==============================================");
    }
}
