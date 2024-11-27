const transactionModel = require('../models/transaction.model');

const transactionData = async (mobile, amount, type) => {
    try {
        // Validate input
        if (!mobile || !amount || !type) {
            
            throw new Error("All fields (mobile, amount, type) are required.");
        }
        if (!['credit', 'debit'].includes(type)) {
            throw new Error("Invalid transaction type. Use 'credit' or 'debit'.");
        }

        // Create a new transaction record
        const transaction = await transactionModel.create({ mobile, amount, type });

        return transaction;
    } catch (err) {
        console.error("Error in createTransaction service:", err.message || err);
        // Propagate the error to the controller
        throw err;
    }
};
const transactionDataGet = async (mobile) => {
    try {
        // Validate input
        if (!mobile) {
            throw new Error("number are required.");
        }

               // Fetch transactions
        const transactions = await transactionModel.find({ mobile });

        return transactions;
    } catch (err) {
        console.error("Error in getTransactionsByMobile service:", err.message || err);
        // Propagate the error to the controller
        throw err;
    }
};

module.exports = { transactionData,transactionDataGet };
