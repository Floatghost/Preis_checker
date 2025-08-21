import React, { useEffect, useState } from 'react';
import styles from "./home.module.css";

type Product = {
    id: number;
    website: string;
    product_name: string;
    preis: number;
};

export default function SearchInput() {
    const [query, setQuery] = useState('');
    const [data, setData] = useState<Product[] | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (query.trim() === "") {
            setData(null);
            setLoading(false);
            return;
        }

        const controller = new AbortController();
        const signal = controller.signal;

        setLoading(true);
        
        fetch(`http://localhost:3000/api/products?q=${query}`, { signal })
            .then(response => {
                if (!response.ok) {
                    throw new Error("Network response was not ok")
                }
                return response.json()
            })
            .then(data => {
                setData(data);
                setLoading(false);
            })
            .catch(error => {
                if (error.name === "AbortError") {
                    //req aborted
                    console.log("abort req");
                    return;
                }
                setError(error.message);
                setLoading(false);
            });
        console.log("fetching:", query);

        return () => {
            controller.abort();
        };
    }, [query]);

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

            <div className={styles.output}>
                {data &&
                    data.map((prod) => {
                        return <b key={prod.id}>{prod.product_name}   {prod.preis}CHF</b>;
                    })
                }
            </div>
        </div>
    );
}
