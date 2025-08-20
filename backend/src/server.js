// server.js
const express = require('express');
const dotenv = require('dotenv');
const apiRoutes = require('./routes/api');
const cors = require('cors');

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use('/api', apiRoutes);

app.get('/', (req, res) => {
    res.send('API is running...');
});

app.get("/stats", (req, res) => {
    let data = {websites_scraped: Math.floor(Math.random() * 10000), products_scraped: Math.floor(Math.random() * 10000)};
    
    res.send(data);
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
