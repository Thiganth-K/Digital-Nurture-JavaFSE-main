package com.library;

import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

import com.library.model.Book;
import com.library.repository.BookRepository;

@SpringBootApplication
public class LibraryManagementApplication {

    public static void main(String[] args) {
        System.out.println("=== Starting LibraryManagementApplication (Spring Boot) [Exercise 9] ===");
        SpringApplication.run(LibraryManagementApplication.class, args);
    }

    @Bean
    public CommandLineRunner initDatabase(BookRepository repository) {
        return args -> {
            System.out.println("[CommandLineRunner] Populating H2 database with initial book data...");
            repository.save(new Book("To Kill a Mockingbird", "Harper Lee"));
            repository.save(new Book("1984", "George Orwell"));
            repository.save(new Book("The Great Gatsby", "F. Scott Fitzgerald"));
            System.out.println("[CommandLineRunner] Database populated successfully. Server ready on port 8081.");
        };
    }
}
