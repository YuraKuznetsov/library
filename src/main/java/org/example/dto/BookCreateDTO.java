package org.example.dto;

import lombok.Getter;
import lombok.Setter;
import org.springframework.web.multipart.MultipartFile;

import javax.validation.constraints.NotNull;

@Getter
@Setter
public class BookCreateDTO {

    @NotNull
    private String title;
    @NotNull
    private String author;
    private String description;
    @NotNull
    private MultipartFile file;
}
