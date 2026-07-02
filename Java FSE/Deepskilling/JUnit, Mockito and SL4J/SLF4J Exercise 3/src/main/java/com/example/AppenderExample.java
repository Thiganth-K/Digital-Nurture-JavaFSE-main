package com.example;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class AppenderExample {
    private static final Logger logger = LoggerFactory.getLogger(AppenderExample.class);

    public static void main(String[] args) {
        logger.debug("Debug message: Initializing application components...");
        logger.info("Info message: Application started successfully.");
        logger.warn("Warn message: Memory usage is slightly high.");
        logger.error("Error message: Database connection timed out.");
    }
}
