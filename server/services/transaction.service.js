const transactionModel = require('../models/transaction.model');
const crypto = require("crypto")

const transactionData = async (mobile, amount, type, description) => {
    try {
        // Validate input
        if (!mobile || !amount || !type || !description) {

            throw new Error("All fields (mobile, amount, type,description) are required.");
        }
        if (!['credit', 'debit'].includes(type)) {
            throw new Error("Invalid transaction type. Use 'credit' or 'debit'.");
        }

        // Create a new transaction record
        const transaction = await transactionModel.create({ mobile, amount, type,description });

        return transaction;
    } catch (err) {
        console.error("Error in createTransaction service:", err.message || err);
        // Propagate the error to the controller
        throw err;
    }
};
const transactionDataGet = async (mobile) => {
    try {
        if (!mobile) {
            throw new Error("Mobile number is required.");
        }

        // Perform both transactions retrieval and aggregation in one request
        const result = await transactionModel.aggregate([
            { $match: { mobile } },
            {
                $facet: {
                    transactions: [{ $sort: { createdAt: -1 } }], // Fetch all transactions, sorted by latest first
                    summary: [
                        {
                            $group: {
                                _id: null,
                                totalCredit: {
                                    $sum: { $cond: [{ $eq: ["$type", "credit"] }, "$amount", 0] }
                                },
                                totalDebit: {
                                    $sum: { $cond: [{ $eq: ["$type", "debit"] }, "$amount", 0] }
                                }
                            }
                        },
                        {
                            $project: {
                                _id: 0,
                                totalCredit: 1,
                                totalDebit: 1,
                                totalBalance: { $subtract: ["$totalCredit", "$totalDebit"] }
                            }
                        }
                    ]
                }
            }
        ]);

        // Extract transactions and summary
        const transactions = result[0].transactions;
        const summary = result[0].summary.length > 0 ? result[0].summary[0] : { totalCredit: 0, totalDebit: 0, totalBalance: 0 };

        return { transactions, summary };

    } catch (err) {
        console.error("Error in transactionDataGet service:", err.message || err);
        throw err;
    }
};


const rechargePayU = async (email, firstname, mobile, amount) => {
    const key = process.env.PAYU_KEY;
    const salt = process.env.PAYU_SALT;
    const BASE_URL = process.env.BASE_URL || 'http://localhost:3000';
    
    if (!key || !salt) {
        throw new Error("Missing PayU key or salt in environment variables");
    }

    const transaction_id = 'PAYU_' + Date.now() + '_' + crypto.randomBytes(4).toString('hex');
    const txnid = transaction_id;
    const productinfo = 'RECHARGE_PAYU';

    try {
        const hashString = `${key}|${txnid}|${amount}|${productinfo}|${firstname}|${email}|||||||||||${salt}`;
        const hash = crypto.createHash('sha512').update(hashString).digest('hex');

        const BASE_URL = process.env.BASE_URL || 'http://localhost:4000';
        const data = await payuClient.paymentInitiate({
            isAmountFilledByCustomer: false,
            amount,
            currency: 'INR',
            firstname,
            email,
            phone: mobile,
            txnid,
            productinfo,
            surl: `${BASE_URL}/api/success/${txnid}`,
            furl: `${BASE_URL}/api/failure/${txnid}`,
            hash
        });

        return data;
    } catch (err) {
        console.error("Error in PayU payment initiation:", err);
        throw err;
    }
};

module.exports = { transactionData, transactionDataGet, rechargePayU };
