package org.example.dto;

import org.example.model.Book;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface BookMapper {

    Book createDTOToBook(BookCreateDTO createDTO);
    BookResponseDTO bookToResponseDTO(Book book);
}
