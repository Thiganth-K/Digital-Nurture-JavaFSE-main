package com.example;

import org.junit.After;
import org.junit.Before;
import org.junit.Test;
import static org.junit.Assert.assertEquals;

/**
 * JUnit test class demonstrating AAA pattern and setup/teardown test fixtures.
 */
public class BankAccountTest {

    private BankAccount account;

    // `@Before` method is run before each test method to arrange/setup initial state.
    @Before
    public void setUp() {
        System.out.println("[Setup] Initializing bank account with a starting balance of 100.0");
        account = new BankAccount(100.0);
    }

    // `@After` method is run after each test method to perform teardown/cleanup.
    @After
    public void tearDown() {
        System.out.println("[Teardown] Cleaning up bank account instance...");
        account = null;
    }

    @Test
    public void testDeposit() {
        System.out.println("Running testDeposit...");
        // 1. Arrange: Setup is handled in @Before (initial balance 100.0)
        double depositAmount = 50.0;
        double expectedBalance = 150.0;

        // 2. Act: Perform deposit
        account.deposit(depositAmount);

        // 3. Assert: Verify the outcome
        assertEquals(expectedBalance, account.getBalance(), 0.0001);
    }

    @Test
    public void testWithdraw() {
        System.out.println("Running testWithdraw...");
        // 1. Arrange: Setup is handled in @Before (initial balance 100.0)
        double withdrawAmount = 30.0;
        double expectedBalance = 70.0;

        // 2. Act: Perform withdrawal
        account.withdraw(withdrawAmount);

        // 3. Assert: Verify the outcome
        assertEquals(expectedBalance, account.getBalance(), 0.0001);
    }

    @Test(expected = IllegalArgumentException.class)
    public void testWithdrawOverdraft() {
        System.out.println("Running testWithdrawOverdraft (expecting exception)...");
        // 1. Arrange: Setup is handled in @Before
        double overdraftAmount = 150.0;

        // 2. Act: Attempt withdrawal that exceeds balance (should throw exception)
        account.withdraw(overdraftAmount);

        // 3. Assert: Handled by expected annotation
    }
}
