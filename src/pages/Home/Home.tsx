import React, { useState } from 'react';
import styles from "./home.module.css";

export default function SearchInput() {
    const [query, setQuery] = useState('');

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            console.log('Query:', query);
        }
    };

    return (
        <div className={styles.wrapper}>
            <input
                className={styles.input_field}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Search"
            />
            <div className={styles.Tabelle}>
                
            </div>
        </div>
    );
}
