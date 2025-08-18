// https://www.youtube.com/watch?v=ji8F8ppY8bs
import axios from "axios";

const headers = {
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/138.0.0.0 Safari/537.36"
};

axios.get('https://www.adidas.ch/api/product-list/JQ2909', { headers })  // <-- pass headers inside an object here
    .then(response => {
        console.log(response.data);
    })
    .catch(error => {
        console.error(error);
    });
