const express = require('express')
const router = express.Router()

//const requireAuth = require('../middleware/requireAuth')
const {
    getEmployees, createEmployee
} = require('../controllers/employee-controller')

//router.use(requireAuth)

router.post('/create', createEmployee)
router.get('/all', getEmployees)

module.exports = router