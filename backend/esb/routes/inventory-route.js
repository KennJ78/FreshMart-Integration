const express = require('express')
const router = express.Router()

//const requireAuth = require('../middleware/requireAuth')
const {
    addProduct,
    fetchProducts
} = require('../controllers/inventory-controller')

//router.use(requireAuth)

router.post('/new', addProduct)
router.get('/all', fetchProducts)

module.exports = router