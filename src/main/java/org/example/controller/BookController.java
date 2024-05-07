package org.example.controller;

import lombok.RequiredArgsConstructor;
import org.example.dto.BookCreateDTO;
import org.example.dto.BookResponseDTO;
import org.example.dto.BookSearchParams;
import org.example.service.BookService;
import org.springframework.core.io.Resource;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/book")
@RequiredArgsConstructor
public class BookController {

    private final BookService bookService;

    @GetMapping(value = "/{id}", produces = MediaType.APPLICATION_PDF_VALUE)
    public Resource getFile(@PathVariable("id") Integer bookId) {
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
}
