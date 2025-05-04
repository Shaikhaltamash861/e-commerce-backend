const mongoose = require('mongoose');

exports.validateProductByIdReq = async (req, res, next) => {
    try {
        const { productId } = req.query;
        if (!productId) {
            return res.status(404).json({ message: 'productId is required', success: false });
        }
        if (!mongoose.Types.ObjectId.isValid(productId)) {
            return res.status(404).json({ message: 'Invalid product id', success: false });
        }
        next();
    } catch (error) {
        console.log("error", error);
        const err = new Error("Internal Server Error");
        err.status = 500;
        return next(err);
    }
}

exports.validateCartProductsReq = (req, res, next) => {
    const { productId, notes, quantity } = req.body;
    if (!productId) {
        return res.status(404).json({message: "Product ID is required", success: false});
    }
    if (!mongoose.Types.ObjectId.isValid(productId)) {
        return res.status(404).json({message: "Product ID is invalid", success: false});
    }
    if (!quantity) {
        return res.status(400).json({message: "Quantity is required", success: false});
    }
    if (typeof quantity !== "number") {
        return res.status(400).json({message: "Quantity must be a number", success: false});
    }
    if (quantity <= 0) {
        return res.status(400).json({message: "Quantity must be a positive number", success: false});
    }
    if (notes && typeof notes !== "string") {
        return res.status(400).json({message: "Notes must be a string", success: false});
    }

    next();
};