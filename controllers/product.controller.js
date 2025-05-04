const Product = require('../models/product.model');

exports.products = async (req, res) => {
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
}