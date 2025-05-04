const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  productName: {
    type: String,
    required: true,
    trim: true
  },
  productPrice: {
    type: Number,
    required: true,
    min: 0
  },
  productImage: {
    type: String,
    required: true,
    trim: true
  },
  productCategory: {
    type: String,
    required: true,
    enum: [
      "Fruit",
      "Vegetable",
      "Gadget",
      "Dairy",
      "Meat",
      "Fish",
      "Furniture",
      "Electronics",
      "Beverage",
      "Food",
      "Musical",
      "Other"
    ]
  },
  productDescription: {
    type: String,
    required: true,
    trim: true
  },
  productQuantity: {
    type: Number,
    required: true,
    min: 0
  },
  productStatus: {
    type: String,
    required: true,
    enum: ["Available", "Out of Stock", "Discontinued"] // You can modify this enum based on actual status options
  },
  productSupplier: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  productRating: {
    type: Number,
    required: true,
    min: 0,
    max: 5
  },
  productReview: {
    type: String,
    required: true,
    trim: true
  },
  productStock: {
    type: Number,
    required: true,
    min: 0
  },
  productDiscount: {
    type: Number,
    required: true,
    min: 0,
    max: 100
  },
  productBrand: {
    type: String,
    required: true,
    trim: true
  },
  isDeleted: {
    type: Boolean,
    default: false
  }
}, { timestamps: true });

// Create a compound unique index to avoid duplicate product entries by name, category, and supplier
productSchema.index({ productName: 1, productCategory: 1, productSupplier: 1 }, { unique: true });

module.exports = mongoose.model("Product", productSchema);
