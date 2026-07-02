package com.example;

import static org.mockito.Mockito.*;
import org.junit.Test;
import org.mockito.InOrder;

public class MyServiceTest {
    @Test
    public void testVerificationOrder() {
        ExternalApi mockApi = mock(ExternalApi.class);
        MyService service = new MyService(mockApi);
        
        service.executeSequence();
        
        // Setup InOrder verification
        InOrder inOrder = inOrder(mockApi);
        
        // Verify that getData() is called before doSomething()
        inOrder.verify(mockApi).getData();
        inOrder.verify(mockApi).doSomething();
        
        System.out.println("Mockito Exercise 6: testVerificationOrder passed successfully! Order verified.");
    }
}
