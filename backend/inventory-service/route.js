const express = require('express')
const router = express.Router()
const productServices = require('./routes/inventory-routes');

const {
    createProduct,
    getAllProducts,
    reduceStock
} = require('./controller')

router.post('/add', createProduct)
router.get('/', getAllProducts)
router.patch('/edit/:product_name', reduceStock)

module.exports = router
