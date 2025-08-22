import { Routes, Route, Link } from 'react-router-dom';
import styles from "./navbar.module.css";

export default function Navbar() {
    return (
        <div className={styles.wrapper}>
            <nav className={styles.navbar}>
                <Link to='/'>
                    <h1 className={styles.title} >Preis Checker</h1>
                </Link>
                <div className={styles.link_wrapper}>
                    <Link to="/" className={styles.linkhome}>Home</Link>
                    <Link to="/stats" className={styles.linkstats}>Stats</Link>
                </div>
            </nav>
        </div>
    );
};