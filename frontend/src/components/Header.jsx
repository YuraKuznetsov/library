import styles from "../css/Header.module.css"
import {Link} from "react-router-dom";
import {useAuth} from "./AuthProvider";

const Header = () => {
    const { user, logOut } = useAuth();

    return (
        <div className={styles.header}>
            <div className="container">
                <div className={styles.header__content}>
                    <div className={styles.logo}>
                        <div className={styles.logo__text}>Online Library</div>
                        <img className={styles.logo_img} src="/img/book-open-solid.svg" alt="Logo"/>
                    </div>
                    <nav className={styles.navbar}>
                        <ul className={styles.navbar__links}>
                            {user &&
                                <li className={styles.navbar__link}>
                                    <Link to="/">Home</Link>
                                </li>
                            }
                            {user && user.role === "ROLE_ADMIN" &&
                                <li className={styles.navbar__link}>
                                    <Link to="/book/create">New Book</Link>
                                </li>
                            }
                        </ul>
                        <ul className={styles.navbar__buttons}>
                            {user ?
                                <li className={[styles.header_button].join(' ')} id={styles["logout-btn"]}>
                                    <Link to="/auth/log-in" onClick={logOut}>Log out</Link>
                                </li> :
                                <>
                                    <li className={[styles.header_button].join(' ')} id={styles["login-btn"]}>
                                        <Link to="/auth/log-in">Log In</Link>
                                    </li>
                                    <li className={[styles.header_button].join(' ')} id={styles["signup-btn"]}>
                                        <Link to="/auth/sign-up">Sign Up</Link>
                                    </li>
                                </>
                            }
                        </ul>
                    </nav>
                </div>
            </div>
        </div>
    );
};

export default Header;
