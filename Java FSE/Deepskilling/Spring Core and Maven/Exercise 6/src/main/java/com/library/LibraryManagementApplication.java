package com.library;

import org.springframework.context.ApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;
import com.library.service.BookService;

public class LibraryManagementApplication {
    public static void main(String[] args) {
        System.out.println("=== Starting LibraryManagementApplication [Exercise 6] ===");
        
        // Load applicationContext.xml
        ApplicationContext context = new ClassPathXmlApplicationContext("applicationContext.xml");
        
        // Retrieve BookService bean (scanned and registered automatically as "bookService")
        BookService bookService = context.getBean(BookService.class);
        
        // Test setup
        bookService.listBooks();
        
        System.out.println("=== LibraryManagementApplication [Exercise 6] Completed Successfully ===");
    }
}
