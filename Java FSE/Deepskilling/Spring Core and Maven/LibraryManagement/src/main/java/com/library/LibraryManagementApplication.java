package com.library;

import com.library.service.BookService;
import org.springframework.context.ApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;

public class LibraryManagementApplication {
    public static void main(String[] args) {
        System.out.println("=== Library Management Application Startup ===");
        
        // 1. Load Spring configuration context
        System.out.println("Loading Spring applicationContext.xml...");
        ApplicationContext context = new ClassPathXmlApplicationContext("applicationContext.xml");
        System.out.println("Spring context loaded successfully.\n");
        
        // 2. Retrieve BookService bean
        System.out.println("Retrieving BookService bean from context...");
        BookService bookService = context.getBean("bookService", BookService.class);
        System.out.println("BookService bean retrieved.\n");
        
        // 3. Test dependency injection and AOP aspect
        System.out.println("Invoking executeServiceAction()...");
        bookService.executeServiceAction();
        System.out.println();
        
        System.out.println("=== Library Management Application Shutdown ===");
    }
}
