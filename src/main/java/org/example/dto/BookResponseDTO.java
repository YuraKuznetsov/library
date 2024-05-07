package org.example.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class BookResponseDTO {

    private Integer id;
    private String title;
    private String author;
    private String description;
}
