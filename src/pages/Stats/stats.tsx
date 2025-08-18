import styles from "./stats.module.css";
import website_logo from '../../assets/website.svg';
import product_logo from '../../assets/product.svg';

export default function Stats() {
    const websites_scraped = 3;
    const products_scraped = 10;
    
    return (
        <div className={styles.wrapper}>
            <div className={styles.websites}>
                <div className={styles.header_logo}>
                    {/* change color in svg file under fill */}
                    <img src={website_logo} alt="Website logo" width="60px" />
                    <h1>Websites scraped</h1>
                </div>
                <h1>{websites_scraped}</h1>
            </div>
            <div className={styles.products}>
                <div className={styles.header_logo}>
                    <img src={product_logo} alt="Product Logo" width="60px" />
                    <h1>Products scraped</h1>
                </div>
                <h1>{products_scraped}</h1>
            </div>
        </div>
    );
};