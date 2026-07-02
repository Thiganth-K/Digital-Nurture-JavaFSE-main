package com.example;

import static org.mockito.Mockito.*;
import static org.junit.Assert.assertEquals;
import org.junit.Test;

public class MyServiceTest {
    @Test
    public void testArgumentMatching() {
        ExternalApi mockApi = mock(ExternalApi.class);
        
        // Stub using the anyInt() matcher
        when(mockApi.getDataForId(anyInt())).thenReturn("Stubbed Data");
        
        MyService service = new MyService(mockApi);
        String result = service.fetchDataForId(42);
        
        assertEquals("Stubbed Data", result);
        
        // Verify method call with specific argument using eq() matcher
        verify(mockApi).getDataForId(eq(42));
        
        System.out.println("Mockito Exercise 3: testArgumentMatching passed successfully!");
    }
}
