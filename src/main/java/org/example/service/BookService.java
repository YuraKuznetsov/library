package org.example.service;

import lombok.RequiredArgsConstructor;
import org.example.dto.BookCreateDTO;
import org.example.dto.BookMapper;
import org.example.dto.BookResponseDTO;
import org.example.dto.BookSearchParams;
import org.example.model.Book;
import org.example.model.BookLobs;
import org.example.repository.BookLobsRepository;
import org.example.repository.BookRepository;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import javax.transaction.Transactional;
import java.io.IOException;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class BookService {

    private final BookRepository bookRepository;
    private final BookLobsRepository bookLobsRepository;
    private final BookMapper bookMapper;

    public Resource getBookResource(Integer bookId) {
        BookLobs bookLobs = bookLobsRepository.findById(bookId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));

        return new ByteArrayResource(bookLobs.getContent());
    }

    @Transactional
    public BookResponseDTO createBook(BookCreateDTO createDTO) {
        Book book = bookMapper.createDTOToBook(createDTO);
        Book savedBook = bookRepository.save(book);
        try {
            BookLobs bookLobs = new BookLobs();
            bookLobs.setId(100);
            bookLobs.setBook(savedBook);
            bookLobs.setContent(createDTO.getFile().getBytes());
            bookLobsRepository.save(bookLobs);
        } catch (IOException e) {
            throw new RuntimeException(e);
        }

        return bookMapper.bookToResponseDTO(savedBook);
    }

    public List<BookResponseDTO> searchBooks(BookSearchParams searchParams) {
        String lowerTitle = searchParams.getTitle().toLowerCase();
        String lowerAuthor = searchParams.getAuthor().toLowerCase();
        List<Book> books = bookRepository.findBooks(lowerTitle, lowerAuthor);

        return books.stream()
                .map(bookMapper::bookToResponseDTO)
                .collect(Collectors.toList());
    }
}
