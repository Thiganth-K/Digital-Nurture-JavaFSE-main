package com.library.aspect;

import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.Around;
import org.aspectj.lang.annotation.Aspect;

@Aspect
public class LoggingAspect {

    @Around("execution(* com.library.service.BookService.*(..))")
    public Object logExecutionTime(ProceedingJoinPoint joinPoint) throws Throwable {
        long startTime = System.currentTimeMillis();
        String methodName = joinPoint.getSignature().toShortString();
        
        System.out.println("[LoggingAspect] >> Starting execution of method: " + methodName);
        
        Object result = joinPoint.proceed();
        
        long elapsedTime = System.currentTimeMillis() - startTime;
        System.out.println("[LoggingAspect] << Finished execution of method: " + methodName + " | Time taken: " + elapsedTime + " ms");
        
        return result;
    }
}
