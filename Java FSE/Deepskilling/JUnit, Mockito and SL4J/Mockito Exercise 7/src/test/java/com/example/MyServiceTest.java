package com.example;

import static org.mockito.Mockito.*;
import org.junit.Test;

public class MyServiceTest {
    
    @Test(expected = RuntimeException.class)
    public void testVoidMethodException() {
        ExternalApi mockApi = mock(ExternalApi.class);
        
        // Stub the void method to throw a RuntimeException
        doThrow(new RuntimeException("API Error")).when(mockApi).doSomething();
        
        MyService service = new MyService(mockApi);
        
        System.out.println("Mockito Exercise 7: Attempting to call executeAction() which should throw RuntimeException...");
        try {
            service.executeAction();
        } catch (RuntimeException e) {
            System.out.println("Mockito Exercise 7: Successfully caught expected exception: " + e.getMessage());
            throw e; // Rethrow to let JUnit verify
        }
    }
}
