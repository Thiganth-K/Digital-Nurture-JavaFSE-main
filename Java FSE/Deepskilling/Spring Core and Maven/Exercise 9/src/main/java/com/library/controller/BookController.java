package com.library.controller;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.library.model.Book;
import com.library.repository.BookRepository;

@RestController
@RequestMapping("/api/books")
public class BookController {

    @Autowired
    private BookRepository bookRepository;

    // Get all books
    @GetMapping
    public List<Book> getAllBooks() {
        return bookRepository.findAll();
    }

    // Get book by id
    @GetMapping("/{id}")
    public ResponseEntity<Book> getBookById(@PathVariable Long id) {
        return bookRepository.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    // Create a book
    @PostMapping
    public Book createBook(@RequestBody Book book) {
        return bookRepository.save(book);
    }

    // Update a book
    @PutMapping("/{id}")
    public ResponseEntity<Book> updateBook(@PathVariable Long id, @RequestBody Book bookDetails) {
        return bookRepository.findById(id)
                .map(book -> {
                    book.setTitle(bookDetails.getTitle());
                    book.setAuthor(bookDetails.getAuthor());
                    Book updatedBook = bookRepository.save(book);
                    return ResponseEntity.ok(updatedBook);
                })
                .orElse(ResponseEntity.notFound().build());
    }

    // Delete a book
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteBook(@PathVariable Long id) {
        return bookRepository.findById(id)
                .map(book -> {
                    bookRepository.delete(book);
                    return ResponseEntity.noContent().<Void>build();
                })
                .orElse(ResponseEntity.notFound().build());
    }
}
