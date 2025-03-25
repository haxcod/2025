const transactionService = require('../services/transaction.service');

const createTransaction = async (req, res) => {
    const { mobile, amount, type,description } = req.body;
    
    // Validate input
    if (!mobile || !amount || !type|| !description) {
        
        return res.status(400).json({
            status: 400,
            message: "All fields (mobile, amount, type,description) are required.",
        });
    }

    try {
        // Call the service to create the transaction
        const transaction = await transactionService.transactionData(mobile, amount, type,description);
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

const rechargePayU = async (req, res) => {
    try {
        const { firstname, email, mobile, amount } = req.body;

        // Validate required fields
        if (!firstname || !email || !mobile || !amount) {
            return res.status(400).json({
                status: 400,
                message: "Missing required fields: firstname, email, mobile, amount",
            });
        }

        // Validate amount (should be a positive number)
        if (isNaN(amount) || amount <= 0) {
            return res.status(400).json({
                status: 400,
                message: "Invalid amount. It must be a positive number.",
            });
        }

        // Call service function
        const data = await transactionService.rechargePayU({ firstname, email, mobile, amount });

        return res.json({
            status: 200,
            message: "Transaction initiated successfully",
            data,
        });

    } catch (err) {
        console.error("Error in rechargePayU:", err);
        return res.status(500).json({
            status: 500,
            message: err.message || "Internal server error",
        });
    }
};


module.exports = { createTransaction, getTransactions };
