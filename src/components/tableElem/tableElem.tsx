import { useState } from "react";
import styles from "./tableElem.module.css";

export default function TableElem() {
  const [produkte, setProdukte] = useState([
    { name: "Apfel", preis: 2 },
    { name: "Banane", preis: 1 },
    { name: "Kaffee", preis: 5 }
  ]);

  return (
    <div>
      {produkte.map((produkt, index) => (
        <div key={index} className={styles.Linie}>
          <div className={styles.Name}>
            <h1>{produkt.name}</h1>
          </div>
          <div className={styles.Preis}>
            <h1>{produkt.preis} €</h1>
          </div>
        </div>
      ))}
    </div>
  );
}
