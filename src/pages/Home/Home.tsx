import React, { useEffect, useState } from 'react';
import styles from "./home.module.css";
import TableElem from '../../components/tableElem';
import { Link } from 'react-router-dom';

type Product = {
    product_id: number;
    name: string;
    manufacturer: string;
    description: string;
    category_id: number;
};

export default function SearchInput() {
    const [query, setQuery] = useState('');
    const [data, setData] = useState<Product[] | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const [db_server_url, setdb_server_url] = useState(() => {
        const rawUrl = "AhAtAtApAsA:A/A/AlAiAnAgAeArAiAnAgA-AuAnAiAtA-A3A5A6A3A.AlAeAvAiAnA-AlAiAeAcAhAtAiA.AwAoArAkAeArAsA.AdAeAvA";
        return rawUrl.replaceAll("A", "");
    });
    console.log("db_server_url: ", db_server_url);

    useEffect(() => {
        if (query.trim() === "") {
            setData(null);
            setLoading(false);
            return;
        }

        const controller = new AbortController();
        const signal = controller.signal;

        setLoading(true);
        
        // fetch(`http://localhost:3000/api/products?q=${query}`, { signal })
        fetch(`${db_server_url}/api/price?q=${query}`, { signal })
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

            <p className={styles.hint}>
                Press <kbd className={styles.kbd}>Enter</kbd> to search
            </p>

            
            <input
                id="search"
                name="search"
                className={styles.input_field}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Search"
            />

            <Link to="/stats">
                <div className={styles.statsbutton}>view stats</div>
            </Link>

            <div className={styles.Tabelle}>
                <TableElem
                />
            </div>

            <div className={styles.output}>
                {data &&
                    data.map((prod) => {
                        return <b key={prod.product_id}>{prod.name}   {prod.manufacturer}CHF</b>;
                    })
                }
            </div>
        </div>
    );
}
