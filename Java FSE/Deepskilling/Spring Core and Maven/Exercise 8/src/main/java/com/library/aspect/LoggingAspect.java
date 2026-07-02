package com.library.aspect;

import org.aspectj.lang.JoinPoint;
import org.aspectj.lang.annotation.After;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Before;

@Aspect
public class LoggingAspect {

    // Before Advice
    @Before("execution(* com.library.service.BookService.*(..))")
    public void logBefore(JoinPoint joinPoint) {
        String methodName = joinPoint.getSignature().toShortString();
        System.out.println("[LoggingAspect - Exercise 8] BEFORE method: " + methodName + " is about to start.");
    }

    // After Advice
    @After("execution(* com.library.service.BookService.*(..))")
    public void logAfter(JoinPoint joinPoint) {
        String methodName = joinPoint.getSignature().toShortString();
        System.out.println("[LoggingAspect - Exercise 8] AFTER method: " + methodName + " has executed.");
    }
}
