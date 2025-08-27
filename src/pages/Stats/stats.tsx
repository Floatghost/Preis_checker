import styles from "./stats.module.css";
import website_logo from '../../assets/website.svg';
import product_logo from '../../assets/product.svg';
import { useEffect, useState } from "react";

interface StatsData {
    websites_scraped: number;
    products_scraped: number;
}

export default function Stats() {
    const [data, setData] = useState<StatsData | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const [db_server_url, setdb_server_url] = useState(() => {
        const rawUrl = "AhAtAtApAsA:A/A/AlAiAnAgAeArAiAnAgA-AuAnAiAtA-A3A5A6A3A.AlAeAvAiAnA-AlAiAeAcAhAtAiA.AwAoArAkAeArAsA.AdAeAvA";
        return rawUrl.replaceAll("A", "");
    });
    
    useEffect(() => {
        // fetch(`http://localhost:3000/stats`)
        fetch(`${db_server_url}/api/stats`)
            .then(response => {
                if (!response.ok) {
                throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                setData(data);
                setLoading(false);
            })
            .catch(error => {
                setError(error.message);
                setLoading(false);
            });
        console.log("fetched stats");
    }, []);


    return (
        <div className={styles.wrapper}>
            <div className={styles.websites}>
                <div className={styles.header_logo}>
                    {/* change color in svg file under fill */}
                    <img src={website_logo} alt="Website logo" width="60px" />
                    <h1>Websites scraped</h1>
                </div>
                <h1>{data?.websites_scraped}</h1>
            </div>
            <div className={styles.products}>
                <div className={styles.header_logo}>
                    <img src={product_logo} alt="Product Logo" width="60px" />
                    <h1>Products scraped</h1>
                </div>
                <h1>{data?.products_scraped}</h1>
            </div>
        </div>
    );
};