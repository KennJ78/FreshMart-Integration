const axios = require('axios');

const addProduct = async (req, res) => {
    try {
        const response = await axios.post(`${process.env.INVENTORY_SERVICE}/add`, req.body);
        res.status(201).json(response.data); // ✅ 201 is correct for creation
    } catch (error) {
        console.error("Error adding product:", error.message);
        res.status(500).json({ success: false, message: error.message });
    }
};

const fetchProducts = async (req, res) => {
    try {
        const response = await axios.get(`${process.env.INVENTORY_SERVICE}`); // No trailing slash needed
        res.status(200).json(response.data); // ✅ Change 201 to 200
    } catch (error) {
        console.error("Error fetching products:", error.message);
        res.status(500).json({ success: false, message: error.message });
    }
};

module.exports = { addProduct, fetchProducts };
