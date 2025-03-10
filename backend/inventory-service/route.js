const express = require('express')
const router = express.Router()

const {
    createProduct,
    getAllProducts,
    reduceStock
} = require('./controller')

router.post('/add', createProduct)
router.get('/', getAllProducts)
router.patch('/edit/:product_name', reduceStock)

module.exports = router