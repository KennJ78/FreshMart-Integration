const Product = require('./product')
const mongoose = require('mongoose')

//Create Product
const createProduct = async(req, res) =>{
    const {name, description, stock, price} = req.body

    try{
        const product = await Product.create({name, description, stock, price})
        res.status(200).json({success: true, message: product})
    }catch(err){
        console.log(err)
        res.status(500).json({success: false, message: err.message})
    }
}

//get all products
const getAllProducts = async(req, res) =>{
    try{
        const products = await Product.find({})
        res.status(200).json({success: true, message: products})
    }catch(err){
        console.log(err)
        res.status(500).json({success: false, message: err.message})
    }
}


//Reduce Stock
const reduceStock = async(req, res) => {
    const { product_name } = req.params;
    const { sold } = req.body;

    try {
        const product = await Product.findOne({ name: product_name });

        if (!product) {
            return res.status(404).json({ success: false, message: `No such product exists with the name: ${product_name}` });
        }

        if (sold > product.stock) {
            return res.status(400).json({ success: false, message: `The stock of ${product.name} is insufficient` });
        }

        product.stock -= sold;
        await product.save();

        return res.status(200).json({ success: true, message: product });

    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
}

module.exports = {
    createProduct,
    getAllProducts,
    reduceStock
}