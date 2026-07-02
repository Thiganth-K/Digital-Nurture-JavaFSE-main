package com.example;

import org.junit.Test;
import static org.junit.Assert.assertEquals;

/**
 * JUnit test class to verify Calculator methods.
 */
public class CalculatorTest {

    @Test
    public void testAdd() {
        Calculator calculator = new Calculator();
        assertEquals("add(10, 5) should be 15", 15, calculator.add(10, 5));
    }

    @Test
    public void testSubtract() {
        Calculator calculator = new Calculator();
        assertEquals("subtract(10, 5) should be 5", 5, calculator.subtract(10, 5));
    }

    @Test
    public void testMultiply() {
        Calculator calculator = new Calculator();
        assertEquals("multiply(10, 5) should be 50", 50, calculator.multiply(10, 5));
    }

    @Test
    public void testDivide() {
        Calculator calculator = new Calculator();
        assertEquals("divide(10, 5) should be 2.0", 2.0, calculator.divide(10, 5), 0.0001);
    }

    @Test(expected = IllegalArgumentException.class)
    public void testDivideByZero() {
        Calculator calculator = new Calculator();
        calculator.divide(10, 0);
    }
}
