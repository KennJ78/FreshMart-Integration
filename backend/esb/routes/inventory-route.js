const express = require('express');
const router = express.Router();

const {
    createProduct,
    getAllProducts,
    reduceStock
} = require('../controllers');  // Ensure correct path

// Route for adding a product
router.post('/add', createProduct);

// Route for fetching all products
router.get('/', getAllProducts);

// Route for reducing stock
router.patch('/edit/:product_name', reduceStock);

module.exports = router;
