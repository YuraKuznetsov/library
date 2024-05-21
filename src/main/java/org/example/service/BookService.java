package org.example.service;

import lombok.RequiredArgsConstructor;
import org.example.dto.book.*;
import org.example.model.Book;
import org.example.model.BookLobs;
import org.example.repository.BookLobsRepository;
import org.example.repository.BookRepository;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.server.ResponseStatusException;

import javax.transaction.Transactional;
import java.io.IOException;
import java.util.List;
import java.util.NoSuchElementException;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class BookService {

    private final BookRepository bookRepository;
    private final BookLobsRepository bookLobsRepository;
    private final BookMapper bookMapper;

    @Transactional
    public BookResponseDTO getBook(Integer bookId) {
        return bookMapper.bookToResponseDTO(bookRepository.getById(bookId));
    }

    public Resource getBookResource(Integer bookId) {
        BookLobs bookLobs = bookLobsRepository.findById(bookId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));

        return new ByteArrayResource(bookLobs.getContent());
    }

    @Transactional
    public BookResponseDTO createBook(BookCreateDTO createDTO) {
        Book book = bookMapper.createDTOToBook(createDTO);
        Book savedBook = bookRepository.save(book);

        BookLobs bookLobs = new BookLobs();
        bookLobs.setBook(savedBook);

        try {
            bookLobs.setContent(createDTO.getContent().getBytes());
            bookLobs.setCover(createDTO.getCover().getBytes());
        } catch (IOException e) {
            throw new RuntimeException(e);
        }

        bookLobsRepository.save(bookLobs);

        return bookMapper.bookToResponseDTO(savedBook);
    }

    @Transactional
    public List<BookResponseDTO> searchBooks(BookSearchParams searchParams) {
        String lowerTitle = searchParams.getTitle().toLowerCase();
        String lowerAuthor = searchParams.getAuthor().toLowerCase();
        List<Book> books = bookRepository.findBooks(lowerTitle, lowerAuthor);

        return books.stream()
                .map(bookMapper::bookToResponseDTO)
                .collect(Collectors.toList());
    }

    @Transactional
    public void updateBook(Integer bookId, BookUpdateDTO updateDTO) {
        Book book = bookRepository.findById(bookId)
                .orElseThrow(NoSuchElementException::new);

        book.setTitle(updateDTO.getTitle());
        book.setAuthor(updateDTO.getAuthor());
        book.setDescription(updateDTO.getDescription());

        if (updateDTO.getContent() == null && updateDTO.getCover() == null) return;

        if (updateDTO.getContent() == null) {
            book.getBookLobs().setCover(getBytes(updateDTO.getCover()));
        } else {
            book.getBookLobs().setContent(getBytes(updateDTO.getContent()));
        }

        bookRepository.save(book);
    }

    public void deleteById(Integer bookId) {
        bookRepository.deleteById(bookId);
    }

    private byte[] getBytes(MultipartFile file) {
        try {
            return file.getBytes();
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }
}
