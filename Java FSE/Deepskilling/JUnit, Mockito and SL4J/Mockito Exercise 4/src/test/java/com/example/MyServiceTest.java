package com.example;

import static org.mockito.Mockito.*;
import org.junit.Test;

public class MyServiceTest {
    @Test
    public void testVoidMethod() {
        ExternalApi mockApi = mock(ExternalApi.class);
        
        // Stub the void method to do nothing (default behavior but explicit here)
        doNothing().when(mockApi).doSomething();
        
        MyService service = new MyService(mockApi);
        service.executeAction();
        
        // Verify the void method was called once
        verify(mockApi, times(1)).doSomething();
        
        System.out.println("Mockito Exercise 4: testVoidMethod passed successfully!");
    }
}
