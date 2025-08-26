import { Routes, Route, Link } from 'react-router-dom';
import styles from "./navbar.module.css";

export default function Navbar() {
    return (
        <div className={styles.wrapper}>
            <div>
                <Link to="/">
                    <h1 className={styles.title}>Preis checker</h1>
                </Link>
                {/* <p className={styles.hint}>
                Press <kbd className={styles.kbd}>Enter</kbd> to search
                </p> */}
            </div>
        </div>
    );
};