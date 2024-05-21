import React, { useState } from 'react';
import TextInput from "../components/inputs/TextInput";
import TextAreaInput from "../components/inputs/TextAreaInput";
import styles from "../css/Form.module.css"
import FileInput from "../components/inputs/FileInput";
import API from "../API/axiosConfig";
import {useNavigate} from "react-router-dom";

const BookCreate = () => {
    const navigate = useNavigate();
    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [description, setDescription] = useState('');
    const [cover, setCover] = useState(null);
    const [content, setContent] = useState(null);
    const [message, setMessage] = useState('')
    const [messageVisibilityClass, setMessageVisibilityClass] = useState('hidden');

    const handleSubmit = (e) => {
        e.preventDefault()
        const formData = new FormData();
        formData.append('title', title);
        formData.append('author', author);
        formData.append('description', description);
        formData.append('cover', cover);
        formData.append('content', content);

        API.post('http://localhost:8080/book', formData)
            // .then(() => setMessage(`Successfully added book "${title}"`))
            .then(() => navigate("/"))
            .catch(() => {
                setMessage("Oops... Something went wrong")
                setMessageVisibilityClass("visible")
            });
    };

    return (
        <div className="container">
            <form className={styles.form}>
                <div className={styles.title}>Add a new book</div>
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
    );
};

export default BookCreate;
