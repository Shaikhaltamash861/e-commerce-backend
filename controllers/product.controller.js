const Cart = require('../models/cart.model');
const Product = require('../models/product.model');

exports.products = async (req, res) => {
    try {

        const {
            page = 1,
            limit = 10,
            search = "",
            sortField = "createdAt",
            sortOrder = "desc",
        } = req.query;

        const skip = (page - 1) * limit;
        const regex = new RegExp(search, "i");
        const filter = search
            ? {
                $or: [
                    { productName: regex },
                    { productCategory: regex },
                    { productDescription: regex },
                ],
            }
            : {};
        const sortOptions = {};
        sortOptions[sortField] = sortOrder === "asc" ? 1 : -1;
        const products = await Product.find(filter)
            .sort(sortOptions)
            .skip(skip)
            .limit(limit);
        const total = await Product.countDocuments(filter);
        const totalPages = Math.ceil(total / limit);
        const response = {
            success: true,
            data: products,
            count: total,
            totalPages: totalPages,
            currentPage: parseInt(page)
        };

        return res.status(200).json(response);
    } catch (error) {
        return res.status(500).json({ message: "Internal server error" });
    }
}

exports.product = async (req, res, next) => {
    try {
        const { productId } = req.query;
        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).json({ message: "Product not found", success: false });
        }
        return res.status(200).json({ success: true, data: product });
    } catch (error) {
        return res.status(500).json({ message: "Internal server error" });
    }
}

exports.addToCart = async (req, res, next) => {
    try {
        const { productId, quantity, notes } = req.body;
        const userId = req.user;
        let totalAmount = 0;
        const product = await Product.findById(productId).select("productPrice");
        if (!product) {
            return res.status(404).json({ message: 'Product not found', success: false });
        }
        const existingCart = await Cart.findOne({ userId, cartStatus: "Pending" });
        if (existingCart) {
            const existingProduct = existingCart.products.find(
                (product) => product.productId.toString() === productId
            );
            if (existingProduct) {
                existingProduct.quantity += quantity;
                existingCart.totalAmount += product?.productPrice * quantity;
            } else {
                existingCart.totalAmount += product?.productPrice * quantity;
                existingCart.products.push({ productId, quantity: quantity || 1 });
            }
            existingCart.notes = notes || "";
            await existingCart.save();
            return res.status(200).json({ success: true, data: existingCart });
        }
        else {
            totalAmount += product?.productPrice * quantity;
            const cart = {
                userId,
                products: [{ productId, quantity: quantity || 1 }],
                totalAmount,
                cartStatus: "Pending",
                notes: notes || "",
            };
            const newCart = new Cart(cart);
            await newCart.save();
            return res.status(200).json({ success: true, data: newCart });
        }
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: "Internal server error" });
    }
}