const Sale = require('./sale')

//Create Product
const createSale = async(req, res) =>{
    const {items, total_sale, product_name} = req.body

    try{
        const sale = await Sale.create({items, total_sale, product_name})
        res.status(200).json({sucess: true, message: sale})
    }catch(err){
        console.log(err)
        res.status(500).json({success: false, message: err.message})
    }
}

const fetchSales = async (req, res) => {
    try {
        const sales = await Sale.find();
        res.status(200).json({ success: true, data: sales });
    } catch (err) {
        console.log(err);
        res.status(500).json({ success: false, message: err.message });
    }
};

module.exports = {
    createSale,
    fetchSales,
}