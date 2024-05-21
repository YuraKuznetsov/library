import React, {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import API from "../API/axiosConfig";


const BookRead = () => {
    const { bookId } = useParams();
    const [pdfUrl, setPdfUrl] = useState('');

    useEffect(() => {
        fetchBookResource();
    }, [bookId]);


    const fetchBookResource = () => {
        API.get(`/book/${bookId}/resource`, {responseType: 'blob'})
            .then(response => response.data)
            .then(data => {
                console.log(localStorage.getItem("auth_token"))
                console.log(data)
                const blob = new Blob([data], { type: 'application/pdf' });
                const url = window.URL.createObjectURL(blob);
                setPdfUrl(url);
            })
            .catch(error => console.error('Failed to fetch the book resource: ', error));
    };

    return (
        <div className="container">
            <div style={{height: "90vh"}}>
                <object data={pdfUrl} type="application/pdf" width="100%" height="100%" >
                    <p>Your browser does not support PDFs. Download the PDF to view it: <a href={pdfUrl}>Download PDF</a>.</p>
                </object>
            </div>
        </div>
    )
}

export default BookRead;