// routes/api.js
const express = require('express');
const router = express.Router();
const db = require('../db');

// Example: GET all users
router.get('/products', (req, res) => {
    db.query('SELECT * FROM products', (err, results) => {
        if (err) return res.status(500).json({ error: err });
        res.json(results);
    });
});

module.exports = router;
