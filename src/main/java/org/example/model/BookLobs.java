package org.example.model;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

@Getter
@Setter
@Entity
@Table(name = "book_lobs")
public class BookLobs {

    @Id
    private Integer id;
    @OneToOne
    @MapsId
    private Book book;
    @Lob
    private byte[] cover;
    @Lob
    private byte[] content;
}
