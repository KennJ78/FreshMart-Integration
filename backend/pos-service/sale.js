const mongoose = require('mongoose')
const product = require('../Inventory-Service/product')

const Schema = mongoose.Schema

const saleSchema = new Schema({
    items: {
        type: [
            {
                product_name: {
                    type: String,
                    required: true
                },
                num_sold: {
                    type: Number,
                    required: true,
                },
                sale: {
                    type: Number,
                    required: true
                }
            }
        ],
        required: true
    },
    total_sale: {
        type: Number,
        required: true
    }
}, {timestamps: true})

module.exports = mongoose.model('Sale',saleSchema)