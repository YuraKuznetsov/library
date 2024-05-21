import React from 'react';

const FileInput = ({ onChange }) => {
    const handleChange = (event) => {
        const file = event.target.files[0];
        onChange(file);
    };

    return (
        // <div className={styles["file-row"]}>
            <input type="file" onChange={handleChange}/>
        // </div>
    );
};

export default FileInput;
