const productService = require('../services/product.service');

const createProduct = async (req, res) => {
    const { fundId, mobile, fundName, status, revenueDays, dailyEarnings, totalRevenue, currentPrice, vip, expireDate } = req.body;

    // Validate input
    if (!fundId || !mobile || !fundName || !status || !revenueDays || !dailyEarnings || !totalRevenue || !currentPrice || !vip || !expireDate) {
        return res.status(400).json({
            status: 400,
            message: "All fields (fundId, mobile, fundName, status, revenueDays, dailyEarnings, totalRevenue, currentPrice, vip, expireDate) are required.",
        });
    }

    try {
        // Call the service to create the product
        const product = await productService.createMyProduct(fundId, mobile, fundName, status, revenueDays, dailyEarnings, totalRevenue, currentPrice, vip, expireDate);
        return res.status(201).json({
            status: 201,
            message: "Product created successfully.",
            data: product,
        });
    } catch (err) {
        console.error("Error in createProduct:", err.message || err);
        return res.status(500).json({
            status: 500,
            message: err.message || "Internal server error",
        });
    }
};

const getMyProducts = async (req, res) => {
    const { mobile } = req.query;

    // Validate input
    if (!mobile) {
        return res.status(400).json({
            status: 400,
            message: "Mobile number is required.",
        });
    }

    try {
        // Call the service to fetch products
        const products = await productService.getMyProduct(mobile);
        return res.status(200).json({
            status: 200,
            message: "Products retrieved successfully.",
            data: products,
        });
    } catch (err) {
        console.error("Error in getProducts:", err.message || err);
        return res.status(500).json({
            status: 500,
            message: err.message || "Internal server error",
        });
    }
};

const isClaimed = async (req, res) => {
    const { productId, amount } = req.body;

    // Validate input
    if (!productId) {
        return res.status(400).json({
            status: 400,
            message: "Product ID is required.",
        });
    }

    if (!amount || amount <= 0) {
        return res.status(400).json({
            status: 400,
            message: "A valid amount is required.",
        });
    }

    try {
        // Call the service to update the claimed amount
        const updatedProduct = await productService.isClaimed(productId, amount);
        return res.status(200).json({
            status: 200,
            message: "Claimed amount updated successfully.",
            data: updatedProduct,
        });
    } catch (err) {
        console.error("Error in isClaimed:", err.message || err);
        return res.status(500).json({
            status: 500,
            message: err.message || "Internal server error",
        });
    }
};

const getProducts = async (req, res) => {

    try {
        // Call the service to fetch products
        const products = await productService.getProducts();
        return res.status(200).json({
            status: 200,
            message: "Products retrieved successfully.",
            data: products,
        });
    } catch (err) {
        console.error("Error in getProducts:", err.message || err);
        return res.status(500).json({
            status: 500,
            message: err.message || "Internal server error",
        });
    }
};

module.exports = { createProduct, getProducts, getMyProducts, isClaimed };
