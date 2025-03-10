const express = require('express')
const router = express.Router()

//const requireAuth = require('../middleware/requireAuth')
const {
    newSale,
    fetchSales
} = require('../controllers/pos-controller')

//router.use(requireAuth)

router.post('/new', newSale)
router.get('/all', fetchSales)

module.exports = router