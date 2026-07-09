package com.example;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class ParameterizedLoggingExample {
    private static final Logger logger = LoggerFactory.getLogger(ParameterizedLoggingExample.class);

    public static void main(String[] args) {
        String eventType = "user_login";
        String username = "JohnDoe";
        int attemptNumber = 3;

        // Logging with multiple parameters (placeholder syntax)
        logger.info("Processing event '{}' for user '{}' (attempt number {}).", eventType, username, attemptNumber);

        try {
            // Induce a division by zero exception to log an exception object
            int divisor = 0;
            int result = 42 / divisor;
            logger.debug("Result is {}", result); // Use the variable to prevent warning
        } catch (ArithmeticException e) {
            // In SLF4J, if the last argument is a Throwable, its stack trace is printed/logged
            logger.error("An arithmetic exception occurred during division for user '{}':", username, e);
        }
    }
}
