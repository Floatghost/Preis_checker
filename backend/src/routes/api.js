// routes/api.js
const express = require('express');
const router = express.Router();
const db = require('../db');
const Fuse = require('fuse.js'); // ✅ import fuse.js

// Example: GET all users
router.get('/products', (req, res) => {
    const q = req.query.q;

    // Get all products from the database
    const sql = "SELECT * FROM products";

    db.query(sql, (err, results) => {
        if (err) return res.status(500).json({ error: err });

        // If there's no query, return all results
        if (!q) {
            return res.json(results);
        }

        // ✅ Set up Fuse.js with the products
        const fuse = new Fuse(results, {
            keys: ['product_name'], // field(s) to search
            threshold: 0.4,         // lower = stricter match (0.0–1.0)
        });

        // ✅ Run the fuzzy search
        const fuzzyResults = fuse.search(q);

        // Map to extract the original product objects
        const matchedProducts = fuzzyResults.map(result => result.item);

        res.json(matchedProducts);
    });
});

module.exports = router;
