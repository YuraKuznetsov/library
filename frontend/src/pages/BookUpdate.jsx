import React, {useEffect, useState} from 'react';
import TextInput from "../components/inputs/TextInput";
import TextAreaInput from "../components/inputs/TextAreaInput";
import styles from "../css/Form.module.css"
import FileInput from "../components/inputs/FileInput";
import {useNavigate, useParams} from "react-router-dom";
import API from "../API/axiosConfig";

const BookUpdate = () => {
    const { bookId } = useParams();
    const navigate = useNavigate();
    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [description, setDescription] = useState('');
    const [cover, setCover] = useState(null);
    const [content, setContent] = useState(null);
    const [message, setMessage] = useState('')
    const [messageVisibilityClass, setMessageVisibilityClass] = useState('hidden');

    useEffect(() => {
        fetchBook();
    }, []);

    const fetchBook = () => {
        API.get(`/book/${bookId}`)
            .then(response => response.data)
            .then(data => {
                console.log(data)
                setTitle(data.title)
                setAuthor(data.author)
                setDescription(data.description)
            })
            .catch(error => console.error(error));
    };

    const handleSubmit = (e) => {
        e.preventDefault()

        const formData = new FormData();
        formData.append('title', title);
        formData.append('author', author);
        formData.append('description', description);

        if (cover !== null) {
            formData.append('cover', cover);
        }
        if (content !== null) {
            formData.append('content', content);
        }

        API.put('/book/' + bookId, formData)
            // .then(() => setMessage(`Successfully updated book "${title}"`))
            .then(() => navigate("/"))
            .catch(() => {
                setMessage("Oops... Something went wrong")
                setMessageVisibilityClass("visible")
            });
    };

    return (
        <div className="container">
            <form className={styles.form}>
                <div className={styles.title}>Update book</div>
                <div className={styles.label}>Title</div>
                <TextInput label="title" value={title} setValue={setTitle} />
                <div className={styles.label}>Author</div>
                <TextInput label="author" value={author} setValue={setAuthor} />
                <div className={styles.label}>Description</div>
                <TextAreaInput label="description" value={description} setValue={setDescription} rows="3" />
                <div className={styles.label}>Cover</div>
                <FileInput label="Book cover" onChange={setCover} />
                <div className={styles.label}>Content</div>
                <FileInput label="Book content" onChange={setContent} />
                <button className={styles.button} onClick={handleSubmit}>Submit</button>
                <div className={`${styles.message} ${styles[messageVisibilityClass]}`}>{message}</div>
            </form>
        </div>
        // <div className="container">
        //     <form className={styles["book-form"]}>
        //         <div className={styles.form__title}>Update Book {bookId}</div>
        //         <TextInput label="title" value={title} setValue={setTitle} />
        //         <TextInput label="author" value={author} setValue={setAuthor} />
        //         <TextAreaInput label="description" value={description} setValue={setDescription} rows="3" />
        //         <FileInput label="Book cover" onChange={setCover} />
        //         <FileInput label="Book content" onChange={setContent} />
        //         <button className={styles["form-button"]} onClick={handleSubmit}>Submit</button>
        //         <div className={styles.message}>{message}</div>
        //     </form>
        // </div>
    );
};

export default BookUpdate;
