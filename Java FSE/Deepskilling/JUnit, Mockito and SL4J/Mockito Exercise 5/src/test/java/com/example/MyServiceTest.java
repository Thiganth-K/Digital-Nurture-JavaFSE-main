package com.example;

import static org.mockito.Mockito.*;
import static org.junit.Assert.assertEquals;
import org.junit.Test;

public class MyServiceTest {
    @Test
    public void testMultipleReturns() {
        ExternalApi mockApi = mock(ExternalApi.class);
        
        // Stub the method to return different values on consecutive calls
        when(mockApi.getData())
            .thenReturn("First Call Value")
            .thenReturn("Second Call Value")
            .thenReturn("Third Call Value");
        
        MyService service = new MyService(mockApi);
        
        String first = service.fetchData();
        String second = service.fetchData();
        String third = service.fetchData();
        
        assertEquals("First Call Value", first);
        assertEquals("Second Call Value", second);
        assertEquals("Third Call Value", third);
        
        System.out.println("Mockito Exercise 5: testMultipleReturns passed with outputs: ");
        System.out.println("  1st call: " + first);
        System.out.println("  2nd call: " + second);
        System.out.println("  3rd call: " + third);
    }
}
