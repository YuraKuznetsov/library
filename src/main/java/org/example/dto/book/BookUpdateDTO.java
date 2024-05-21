package org.example.dto.book;

import lombok.Getter;
import lombok.Setter;
import org.springframework.web.multipart.MultipartFile;

import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.Size;

@Getter
@Setter
public class BookUpdateDTO {

    @NotEmpty
    private String title;
    @NotEmpty
    private String author;
    @Size(max = 1000)
    private String description;
    private MultipartFile cover;
    private MultipartFile content;
}
