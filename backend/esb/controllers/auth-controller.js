const axios = require('axios')

const login = async(req, res) =>{
    try {
        const response = await axios.post(`${process.env.AUTH_SERVICE}/login`, req.body)
        res.status(201).json(response.data)
    } catch (error) {
        res.status(500).json({success: false, message: error.message})
    }
}

const signup = async(req, res) =>{
    try {
        const response = await axios.post(`${process.env.AUTH_SERVICE}/new`, req.body)
        res.status(201).json(response.data)
    } catch (error) {
        res.status(500).json({success: false, message: error.message})
    }
}

module.exports = {login, signup}