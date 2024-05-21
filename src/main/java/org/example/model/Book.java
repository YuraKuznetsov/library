package org.example.model;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

@Getter
@Setter
@Entity
@Table(name="book")
public class Book {

    @Id
    @GeneratedValue(strategy= GenerationType.AUTO)
    private Integer id;
    private String title;
    private String author;
    @Column(length = 1000)
    private String description;
    @OneToOne(mappedBy = "book", cascade = CascadeType.ALL)
    @PrimaryKeyJoinColumn
    private BookLobs bookLobs;
}
