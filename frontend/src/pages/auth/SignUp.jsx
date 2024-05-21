import React, { useState } from 'react';
import styles from "../../css/Form.module.css";
import TextInput from "../../components/inputs/TextInput";
import API from "../../API/axiosConfig";
import {useAuth} from "../../components/AuthProvider";

const SignUp = () => {
    const { setToken, setUser } = useAuth();
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirmation, setPasswordConfirmation] = useState('');
    const [message, setMessage] = useState('');
    const [messageVisibilityClass, setMessageVisibilityClass] = useState('hidden');

    const handleSignUp = (event) => {
        event.preventDefault()

        if (email.length === 0 || name.length === 0 || password.length === 0) {
            setMessage("You didn't fill in all the fields");
            setMessageVisibilityClass("visible");
            return;
        }
        else if (password.trim().length < 4) {
            setMessage("Password must be at least 4 characters long");
            setMessageVisibilityClass("visible");
            return;
        } else if (password !== passwordConfirmation) {
            setMessage("Passwords are not the same");
            setMessageVisibilityClass("visible");
            return;
        }

        API.post("/user/sign-up", {email: email, name: name, password: password})
            .then(response => {
                setToken(response.data.token);
                setUser(response.data.user);
                setMessage("");
                setMessageVisibilityClass("hidden");
            })
            .catch(error => {
                setMessage("Invalid data");
                setMessageVisibilityClass("visible");
            });
    };

    return (
        <div className="container">
            <form className={styles.form}>
                <div className={styles.title}>Sign Up</div>

                <div className={styles.label}>Your email address</div>
                <TextInput label="email" value={email} setValue={setEmail} />
                <div className={styles.label}>Choose a screen name</div>
                <TextInput label="name" value={name} setValue={setName} />
                <div className={styles.label}>Choose a password</div>
                <TextInput label="password" value={password} setValue={setPassword} showInput={false} />
                <div className={styles.label}>Password Confirmation</div>
                <TextInput label="password again" value={passwordConfirmation}
                           setValue={setPasswordConfirmation} showInput={false} />
                <button className={styles.button} onClick={handleSignUp}>Sign Up</button>

                <div className={`${styles.message} ${styles[messageVisibilityClass]}`}>{message}</div>
            </form>
        </div>
    );
};

export default SignUp;
