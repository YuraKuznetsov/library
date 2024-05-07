package org.example.repository;

import org.example.model.Book;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BookRepository extends JpaRepository<Book, Integer> {

    @Query("SELECT b FROM Book b WHERE LOWER(b.title) LIKE %:title% AND LOWER(b.author) LIKE %:author%")
    List<Book> findBooks(@Param("title") String title, @Param("author") String author);
}
