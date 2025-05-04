const Product = require('../../models/product.model');
const mongoose = require('mongoose')

exports.addPoduct = async (req, res, next) => {
    try {
        const { productName, productCategory } = req.body;
        const userId = req.user;
        const isExistingProduct = await Product.findOne({ productName, productCategory, productSupplier: new mongoose.Types.ObjectId(userId) });
        if (isExistingProduct) {
            return res.status(401).json({message: "Product already exists", success: false});
        }

        const product = new Product({ ...req.body, productSupplier: userId });
        await product.save();
        return res.status(201).json({
            success: true,
            message: "Product added successfully",
        })
    } catch (err) {
        console.dir(err, { depth: null });
        const error = new Error("Internal Server error");
        error.status = 500;
        return next(error);
    }
}
