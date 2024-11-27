const productModal = require('../models/product.modal');

// Function to add a new product
const createMyProduct = async (mobile, fundName, status, revenueDays, dailyEarnings, totalRevenue, currentPrice, vip, expireDate) => {
    try {
        // Validate input
        if (!mobile || !fundName || !status || !revenueDays || !dailyEarnings || !totalRevenue || !currentPrice || !vip || !expireDate) {
            throw new Error("All fields are required.");
        }

        // Create a new product record
        const productData = await productModal.create({ mobile, fundName, status, revenueDays, dailyEarnings, totalRevenue, currentPrice, vip, expireDate });

        return productData;
    } catch (err) {
        console.error("Error in createMyProduct service:", err.message || err);
        // Rethrow the error to let the controller handle it
        throw err;
    }
};

const isClaimed = async (productId, amount) => {
    if (!productId) {
        throw new Error('Product ID is required');
    }

    if (amount <= 0) {
        throw new Error('Valid amount is required');
    }

    // Update the product's claimed amount and return the updated document
    try {
        const product = await productModal.findById(productId);
        const currentClaimed = parseInt(product.claimed);
        const newClaimed = currentClaimed + amount;
        const updatedProduct = await productModal.findByIdAndUpdate(
            productId, // Find the product by ID
            { $set: { claimed: newClaimed } }, // Update claimed and optionally mobile
            { new: true } // Return the updated document
        );

        if (!updatedProduct) {
            throw new Error(`Product with ID ${productId} not found.`);
        }

        return updatedProduct;
    } catch (error) {
        console.error('Error updating product:', error.message);
        throw error;
    }
};


// Function to get products by mobile number
const getMyProduct = async (mobile) => {
    try {
        // Find the products for the provided mobile number
        const data = await productModal.find({ mobile });
        return data;
    } catch (err) {
        console.error("Error in getMyProduct service:", err.message || err);
        // Rethrow the error to let the controller handle it
        throw err;
    }
};

module.exports = { createMyProduct, getMyProduct,isClaimed };
