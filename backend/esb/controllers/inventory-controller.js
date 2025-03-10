const axios = require('axios')

const addProduct = async(req, res) =>{
    try{
        const response = await axios.post(`${process.env.INVENTORY_SERVICE}/add`, req.body)
        res.status(201).json(response.data)
    }catch(error){
        res.status(500).json({success: false, message: error.message})
    }
}

const fetchProducts = async(req, res) =>{
    try{
        const response = await axios.get(`${process.env.INVENTORY_SERVICE}/`)
        res.status(201).json(response.data)
    }catch(error){
        res.status(500).json({success: false, message: error.message})
    }
}

module.exports = {addProduct, fetchProducts}