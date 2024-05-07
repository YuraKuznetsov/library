package org.example.repository;

import org.example.model.BookLobs;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface BookLobsRepository extends JpaRepository<BookLobs, Integer> {
}
