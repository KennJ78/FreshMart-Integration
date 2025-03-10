const express = require('express')
const router = express.Router()

const {
    createSale,
    fetchSales
} = require('./controller')

router.post('/add', createSale)
router.get('/all', fetchSales)

module.exports = router