const transactionService = require('../services/transaction.service');

const createTransaction = async (req, res) => {
    const { mobile, amount, type } = req.body;
    
    // Validate input
    if (!mobile || !amount || !type) {
        
        return res.status(400).json({
            status: 400,
            message: "All fields (mobile, amount, type) are required.",
        });
    }

    try {
        // Call the service to create the transaction
        const transaction = await transactionService.transactionData(mobile, amount, type);
        return res.status(201).json({
            status: 201,
            message: "Transaction created successfully.",
            data: transaction,
        });
    } catch (err) {
        console.error("Error in createTransaction:", err.message || err);
        return res.status(500).json({
            status: 500,
            message: err.message || "Internal server error",
        });
    }
};

const getTransactions = async (req, res) => {
    const { mobile } = req.query;

    // Validate input
    if (!mobile) {
        return res.status(400).json({
            status: 400,
            message: "Mobile number is required.",
        });
    }

    try {
        // Call the service to fetch transactions
        const transactions = await transactionService.transactionDataGet(mobile);
        return res.status(200).json({
            status: 200,
            message: "Transactions retrieved successfully.",
            data: transactions,
        });
    } catch (err) {
        console.error("Error in getTransactions:", err.message || err);
        return res.status(500).json({
            status: 500,
            message: err.message || "Internal server error",
        });
    }
};

module.exports = { createTransaction, getTransactions };
