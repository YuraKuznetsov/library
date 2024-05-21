package org.example.dto.book;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class BookResponseDTO {

    private Integer id;
    private String title;
    private String author;
    private String description;
    private byte[] cover;
}
