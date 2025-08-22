import { useState } from "react";
import styles from "./tableElem.module.css"

export default function TableElem() {
    const [produktName, setProduktName] = useState('');
    const [produktPreis, setProduktPreis] = useState('');

    
    return (
        <div>
            <div className={styles.Name}>

            </div>
        </div>
    );
};