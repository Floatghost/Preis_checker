import { Routes, Route, Link } from 'react-router-dom';
import styles from "./navbar.module.css";

export default function Navbar() {
    return (
        <div className={styles.wrapper}>
            <nav className={styles.navbar}>
                <h1>Preis Checker</h1>
                <div className={styles.link_wrapper}>
                    <Link to="/">Home</Link> | <Link to="/stats">Stats</Link>
                </div>
            </nav>
        </div>
    );
};