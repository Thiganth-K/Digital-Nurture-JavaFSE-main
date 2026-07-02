package com.library.service;

import com.library.repository.BookRepository;

public class BookService {
    private BookRepository bookRepository;

    // Setter method for dependency injection
    public void setBookRepository(BookRepository bookRepository) {
        this.bookRepository = bookRepository;
    }

    public void listBooks() {
        System.out.println("BookService [Exercise 5]: Delegating call to repository...");
        if (bookRepository != null) {
            bookRepository.getBooks();
        } else {
            System.out.println("BookService ERROR: BookRepository not injected!");
        }
    }
}
