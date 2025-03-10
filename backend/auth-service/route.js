const express = require('express')
const router = express.Router()

const { login, signup, authenticate } = require('./controller')

router.post('/new', signup)
router.post('/login', login)
router.get('/auth-check/:authorization', authenticate)

module.exports = router