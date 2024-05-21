import React, { useState } from 'react';
import styles from "../../css/Form.module.css"
import TextInput from "../../components/inputs/TextInput";
import { useAuth } from "../../components/AuthProvider";
import API from "../../API/axiosConfig";
import { useNavigate } from "react-router-dom";

const LogIn = () => {
    const { setToken, setUser } = useAuth();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const [messageVisibilityClass, setMessageVisibilityClass] = useState('hidden');
    const navigate = useNavigate()

    const handleLogin = (event) => {
        event.preventDefault()
        API.post("/user/log-in", {email: email, password: password})
            .then(response => {
                setToken(response.data.token);
                setUser(response.data.user);
                setMessage("");
                setMessageVisibilityClass("hidden");
                navigate("/")
            })
            .catch(error => {
                setMessage("Invalid email or password");
                setMessageVisibilityClass("visible");
            });
    };

    return (
        <div className="container">
            <form className={styles.form}>
                <div className={styles.title}>Log in</div>
                <div className={styles.label}>Your email address</div>
                <TextInput label="email" value={email} setValue={setEmail} />
                <div className={styles.label}>Password</div>
                <TextInput label="password" value={password} setValue={setPassword} showInput={false} />
                <button className={styles.button} onClick={handleLogin}>Log in</button>
                <div className={`${styles.message} ${styles[messageVisibilityClass]}`}>{message}</div>
            </form>
        </div>
    );
};

export default LogIn;
