const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    products: [
        {
            productId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Product",
                required: true,
            },
            quantity: {
                type: Number,
                required: true,
            },
        },
    ],
    totalAmount: {
        type: Number,
        required: true,
    },
    cartStatus: {
        type: String,
        required: true,
        enum: ["Pending", "Confirmed", "Cancelled", "Shipped", "Delivered", "Returned"],
        default: "Pending",
    },
    notes: {
        type: String,
        required: false,
    },
},{timestamps: true});

module.exports = mongoose.model('Cart', cartSchema);