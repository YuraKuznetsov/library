import styles from "../../css/Input.module.css"
import React from "react";

const TextInput = ({label, value, setValue, showInput=true}) => {
    return (
        <input className={styles.input}
               type={showInput ? 'text' : 'password'}
            placeholder={`Type ${label}`}
            value={value}
            onChange={(e) => setValue(e.target.value)}
        />
    )
}

export default TextInput;