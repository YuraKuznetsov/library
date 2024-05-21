import styles from '../css/SearchBar.module.css';

const SearchBar = ({ searchBy, setSearchBy, searchQuery, setSearchQuery }) => {
    return (
        <div className={styles["search-bar"]}>
            <select
                className={styles["search-option"]}
                value={searchBy}
                onChange={(e) => setSearchBy(e.target.value)}
            >
                <option value="title">Title</option>
                <option value="author">Author</option>
            </select>
            <input
                type="text"
                className={styles["search-input"]}
                placeholder={`Search by ${searchBy}`}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
            />
        </div>
    );
};

export default SearchBar;
