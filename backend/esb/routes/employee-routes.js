const express = require('express')
const router = express.Router()

//const requireAuth = require('../middleware/requireAuth')
const {
    getEmployees, createEmployee, updateEmployee, deleteEmployee
} = require('../controllers/employee-controller')

//router.use(requireAuth)

router.post('/create', createEmployee)
router.get('/all', getEmployees)
router.put('/update/:id', updateEmployee);
router.delete('/delete/:id', deleteEmployee)

module.exports = router