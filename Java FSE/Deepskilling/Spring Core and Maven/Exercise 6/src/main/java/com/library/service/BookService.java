package com.library.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.library.repository.BookRepository;

@Service
public class BookService {
    private BookRepository bookRepository;

    // Autowired Setter injection
    @Autowired
    public void setBookRepository(BookRepository bookRepository) {
        System.out.println("BookService [Exercise 6]: Autowired setter called for BookRepository.");
        this.bookRepository = bookRepository;
    }

    public void listBooks() {
        System.out.println("BookService [Exercise 6]: Delegating call to repository...");
        if (bookRepository != null) {
            bookRepository.getBooks();
        } else {
            System.out.println("BookService ERROR: BookRepository not autowired!");
        }
    }
}
