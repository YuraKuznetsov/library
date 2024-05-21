package org.example.dto.book;

import org.example.model.Book;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface BookMapper {

    Book createDTOToBook(BookCreateDTO createDTO);
    @Mapping(source = "bookLobs.cover", target = "cover")
    BookResponseDTO bookToResponseDTO(Book book);
}
