import React from 'react';
import styles from "../css/BookList.module.css"
import {Link} from "react-router-dom";
import {useAuth} from "./AuthProvider";

const BookList = ({ books, handleRemove }) => {
    const { user } = useAuth();

    return (
        <div className={styles["book-list"]}>
            {books.map((book, index) => (
                <div key={index} className={styles.book}>
                    <div className={styles.book__cover}>
                        {book.cover !== null && <img
                            src={`data:image/jpeg;base64,${book.cover.toString()}`}
                            alt={`Cover of ${book.title}`}
                        />}
                    </div>
                    <div className={styles.book_main}>
                        <div className={styles.book_details}>
                            <div className={styles.book__title}>{book.title}</div>
                            <div>By {book.author}</div>
                            <div className={styles.book__description}>{book.description}</div>
                        </div>
                        <div className={styles.book__buttons}>
                            <Link to={"/book/read/" + book.id}>
                                <button id={styles["open-button"]} className={styles.book_button}>Open</button>
                            </Link>
                            {user.role === "ROLE_ADMIN" &&
                                <>
                                    <Link to={"/book/update/" + book.id}>
                                        <button id={styles["update-button"]} className={styles.book_button}>Update</button>
                                    </Link>
                                    <button id={styles["delete-button"]} className={styles.book_button}
                                            onClick={() => handleRemove(book.id)}>Delete</button>
                                </>
                            }
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default BookList;
