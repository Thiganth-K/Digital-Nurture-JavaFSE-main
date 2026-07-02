package com.library.service;

import com.library.repository.BookRepository;

public class BookService {
    private BookRepository bookRepository;

    // Setter injection for BookRepository
    public void setBookRepository(BookRepository bookRepository) {
        this.bookRepository = bookRepository;
    }

    public void executeServiceAction() {
        System.out.println("BookService: Starting business logic for service action...");
        
        // Simulating some processing time
        try {
            Thread.sleep(150);
        } catch (InterruptedException e) {
            Thread.currentThread().interrupt();
        }

        if (bookRepository != null) {
            bookRepository.executeRepositoryAction();
        } else {
            System.out.println("BookService ERROR: BookRepository has not been injected!");
        }

        System.out.println("BookService: Business logic completed.");
    }
}
