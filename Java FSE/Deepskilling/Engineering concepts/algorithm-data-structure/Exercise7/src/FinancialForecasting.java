import java.util.HashMap;
import java.util.Map;

/**
 * FinancialForecasting.java
 * Exercise 7 - Financial Forecasting
 *
 * Predicts future values based on a past growth rate
 * using both recursive and iterative (optimized) approaches.
 *
 * ================================================================
 * RECURSION EXPLAINED
 * ================================================================
 * Recursion = a method that calls ITSELF with a smaller problem
 * until it reaches a base case (stopping condition).
 *
 * Example: Future Value Formula
 *   FV(n) = PV * (1 + r)^n
 *   Where:
 *     PV = Present Value (initial amount)
 *     r  = growth rate per period (e.g., 0.08 = 8%)
 *     n  = number of periods
 *
 * Recursive breakdown:
 *   FV(0) = PV                         <- Base case
 *   FV(n) = FV(n-1) * (1 + r)         <- Recursive case
 *
 * ================================================================
 * TIME COMPLEXITY ANALYSIS
 * ================================================================
 *
 * Plain Recursion:
 *   - Each call does O(1) work and makes 1 recursive call.
 *   - Total calls = n   =>  Time: O(n),  Space: O(n) call stack
 *
 * Memoized Recursion (Dynamic Programming):
 *   - Stores already-computed results in a cache (HashMap).
 *   - Each unique n computed only ONCE.
 *   - Time: O(n),  Space: O(n) cache  (avoids repeated computation)
 *   - For compound growth with a single rate, plain recursion is
 *     already O(n), but memoization shines when the same subproblem
 *     appears many times (e.g., Fibonacci, complex branching).
 *
 * Iterative (Most Optimized):
 *   - No call stack risk. Space: O(1).
 *   - Recommended for production financial calculations.
 * ================================================================
 */
public class FinancialForecasting {

    // ─────────────────────────────────────────────────────────────────
    //  1. PLAIN RECURSIVE — O(n) time, O(n) space (call stack)
    // ─────────────────────────────────────────────────────────────────

    /**
     * Recursively calculates the future value of an investment.
     *
     * FV(n) = presentValue * (1 + growthRate)^n
     *
     * Base case : n == 0  ->  return presentValue
     * Recursive : FV(n)   ->  FV(n-1) * (1 + growthRate)
     *
     * @param presentValue initial investment amount
     * @param growthRate   annual growth rate (e.g., 0.08 for 8%)
     * @param periods      number of time periods (years/months)
     * @return future value after the given periods
     */
    public static double futureValueRecursive(double presentValue,
                                               double growthRate,
                                               int periods) {
        // Base case: no periods left, return the current value
        if (periods == 0) {
            return presentValue;
        }
        // Recursive case: grow by one period, then recurse
        return futureValueRecursive(presentValue, growthRate, periods - 1)
               * (1 + growthRate);
    }

    // ─────────────────────────────────────────────────────────────────
    //  2. MEMOIZED RECURSIVE — O(n) time, O(n) cache space
    //     Avoids redundant computation via HashMap cache
    // ─────────────────────────────────────────────────────────────────

    /**
     * Public entry point for memoized recursive future value.
     *
     * @param presentValue initial investment amount
     * @param growthRate   annual growth rate
     * @param periods      number of time periods
     * @return future value after the given periods
     */
    public static double futureValueMemoized(double presentValue,
                                              double growthRate,
                                              int periods) {
        Map<Integer, Double> cache = new HashMap<>();
        return memoHelper(presentValue, growthRate, periods, cache);
    }

    private static double memoHelper(double pv, double rate, int n,
                                      Map<Integer, Double> cache) {
        if (n == 0) return pv;
        if (cache.containsKey(n)) return cache.get(n);  // use cached result

        double result = memoHelper(pv, rate, n - 1, cache) * (1 + rate);
        cache.put(n, result);   // store for future reuse
        return result;
    }

    // ─────────────────────────────────────────────────────────────────
    //  3. ITERATIVE — O(n) time, O(1) space (best for production)
    // ─────────────────────────────────────────────────────────────────

    /**
     * Calculates future value iteratively (no recursion).
     * Eliminates stack overflow risk for large n.
     * Mathematically equivalent to Math.pow(1 + rate, n).
     *
     * @param presentValue initial investment amount
     * @param growthRate   annual growth rate
     * @param periods      number of time periods
     * @return future value after the given periods
     */
    public static double futureValueIterative(double presentValue,
                                               double growthRate,
                                               int periods) {
        double value = presentValue;
        for (int i = 0; i < periods; i++) {
            value *= (1 + growthRate);
        }
        return value;
    }

    // ─────────────────────────────────────────────────────────────────
    //  4. VARIABLE GROWTH RATE — recursive with different rates
    //     Simulates realistic forecasting where rate changes each year
    // ─────────────────────────────────────────────────────────────────

    /**
     * Calculates future value when growth rates vary each period.
     *
     * FV = PV * (1 + r0) * (1 + r1) * ... * (1 + r_{n-1})
     *
     * @param presentValue initial investment
     * @param rates        array of growth rates per period
     * @param periodIndex  current period index (start with 0)
     * @return future value after all periods
     */
    public static double futureValueVariableRate(double presentValue,
                                                  double[] rates,
                                                  int periodIndex) {
        // Base case: all periods processed
        if (periodIndex == rates.length) {
            return presentValue;
        }
        // Apply current period's rate and recurse for the next period
        double grown = presentValue * (1 + rates[periodIndex]);
        return futureValueVariableRate(grown, rates, periodIndex + 1);
    }
}
