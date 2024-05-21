import styles from "../../css/Input.module.css"
import React from "react";

const TextAreaInput = ({label, value, setValue, rows}) => {
    return (
        <textarea className={styles.input}
                  rows={rows}
                  placeholder={`Type ${label}`}
                  value={value}
                  onChange={(e) => setValue(e.target.value)}
        />
    )
}

export default TextAreaInput;