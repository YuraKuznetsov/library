import React, {useEffect, useState} from 'react';
import SearchBar from "../components/SearchBar";
import BookList from "../components/BookList";
import styles from "../css/HomePage.module.css"
import API from "../API/axiosConfig";

const Home = () => {
    const [searchBy, setSearchBy] = useState('title');
    const [searchQuery, setSearchQuery] = useState('');
    const [books, setBooks] = useState([]);

    useEffect(() => {
        fetchBooks();
    }, [searchBy, searchQuery]);

    const fetchBooks = () => {
        API.get(`/book?${searchBy}=${searchQuery}`)
            .then(response => response.data)
            .then(data => setBooks(data.reverse()))
            .catch(error => console.error(error));
    };

    const deleteBook = (bookId) => {
        const newBooks = books.filter((book) => book.id !== bookId)
        setBooks(newBooks)

        API.delete("/book/" + bookId)
            .catch(error => console.log(error))
    }

    return (
        <div className="container">
            <SearchBar searchBy={searchBy} setSearchBy={setSearchBy}
                       searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
            <div className={styles["search-result"]}>
                <div className={styles.title}>
                    {searchQuery.trim().length === 0 ? "All Books" : `Search by ${searchBy}: ${searchQuery}`}
                </div>
                {books.length > 0
                    ? <BookList books={books} handleRemove={deleteBook} />
                    : <>No books found</>}
            </div>
        </div>
    );
};

export default Home;
