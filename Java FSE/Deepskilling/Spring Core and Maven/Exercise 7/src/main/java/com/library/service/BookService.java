package com.library.service;

import com.library.repository.BookRepository;

public class BookService {
    private BookRepository bookRepository;

    // Constructor Injection
    public BookService(BookRepository bookRepository) {
        System.out.println("BookService [Exercise 7]: Constructor Injection executed.");
        this.bookRepository = bookRepository;
    }

    // Setter Injection
    public void setBookRepository(BookRepository bookRepository) {
        System.out.println("BookService [Exercise 7]: Setter Injection executed.");
        this.bookRepository = bookRepository;
    }

    public void listBooks() {
        System.out.println("BookService [Exercise 7]: Delegating call to repository...");
        if (bookRepository != null) {
            bookRepository.getBooks();
        } else {
            System.out.println("BookService ERROR: BookRepository not injected!");
        }
    }
}
