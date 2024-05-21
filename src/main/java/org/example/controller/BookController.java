package org.example.controller;

import lombok.RequiredArgsConstructor;
import org.example.dto.book.BookCreateDTO;
import org.example.dto.book.BookResponseDTO;
import org.example.dto.book.BookSearchParams;
import org.example.dto.book.BookUpdateDTO;
import org.example.service.BookService;
import org.springframework.core.io.Resource;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/book")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:3000")
public class BookController {

    private final BookService bookService;

    @GetMapping("/{id}")
    public BookResponseDTO getBook(@PathVariable("id") Integer bookId) {
        return bookService.getBook(bookId);
    }

    @GetMapping(value = "/{id}/resource", produces = MediaType.APPLICATION_PDF_VALUE)
    public Resource getBookResource(@PathVariable("id") Integer bookId) {
        return bookService.getBookResource(bookId);
    }

    @PostMapping
    public BookResponseDTO createBook(@Valid BookCreateDTO bookCreateDTO) {
        return bookService.createBook(bookCreateDTO);
    }

    @GetMapping
    public List<BookResponseDTO> searchBooks(@Valid BookSearchParams searchParams) {
        return bookService.searchBooks(searchParams);
    }

    @PutMapping("/{id}")
    public void updateBook(@PathVariable("id") Integer bookId, @Valid BookUpdateDTO updateDTO) {
        bookService.updateBook(bookId, updateDTO);
    }

    @DeleteMapping("/{id}")
    public void deleteById(@PathVariable("id") Integer bookId) {
        bookService.deleteById(bookId);
    }
}
