const transactionModel = require('../models/transaction.model');
const crypto = require("crypto")
const { Cashfree } = require("cashfree-pg");


Cashfree.XClientId = process.env.CLIENT_ID
Cashfree.XClientSecret = process.env.CLIENT_SECRET
Cashfree.XEnvironment = Cashfree.Environment.SANDBOX

const transactionData = async (mobile, amount, type, description) => {
    try {
        // Validate input
        if (!mobile || !amount || !type || !description) {

            throw new Error("All fields (mobile, amount, type,description) are required.");
        }
        if (!['credit', 'debit', 'buy', 'revenue'].includes(type)) {
            throw new Error("Invalid transaction type. Use 'credit' or 'debit'.");
        }

        // Create a new transaction record
        const transaction = await transactionModel.create({ mobile, amount, type, description });

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

        // Get today's date range (start of today to end of today)
        const startOfToday = new Date();
        startOfToday.setHours(0, 0, 0, 0); // Set time to 00:00:00.000

        const endOfToday = new Date();
        endOfToday.setHours(23, 59, 59, 999); // Set time to 23:59:59.999

        // Perform aggregation for transactions, summary, and today’s revenue
        const result = await transactionModel.aggregate([
            { $match: { mobile } },
            {
                $facet: {
                    transactions: [{ $sort: { createdAt: -1 } }], // Fetch all transactions sorted by latest first
                    summary: [
                        {
                            $group: {
                                _id: null,
                                totalCredit: {
                                    $sum: { $cond: [{ $eq: ["$type", "credit"] }, "$amount", 0] }
                                },
                                totalDebit: {
                                    $sum: { $cond: [{ $eq: ["$type", "debit"] }, "$amount", 0] }
                                },
                                totalDeposit: {
                                    $sum: { $cond: [{ $eq: ["$type", "credit"] }, "$amount", 0] }
                                },
                                totalBuy: {
                                    $sum: { $cond: [{ $eq: ["$type", "buy"] }, "$amount", 0] }
                                },
                                totalRevenue: {
                                    $sum: { $cond: [{ $eq: ["$type", "revenue"] }, "$amount", 0] }
                                }
                            }
                        },
                        {
                            $project: {
                                _id: 0,
                                totalDeposit: { $subtract: ["$totalDeposit", "$totalBuy"] },
                                withdrawBalance: { $subtract: ["$totalRevenue", "$totalDebit"] },
                                totalCredit: 1,
                                totalDebit: 1,
                                totalRevenue: 1,
                                totalBalance: { $subtract: ["$totalCredit", "$totalDebit"] }
                            }
                        }
                    ],
                    todayRevenue: [
                        { $match: { type: "revenue", createdAt: { $gte: startOfToday, $lte: endOfToday } } },
                        {
                            $group: {
                                _id: null,
                                todayRevenue: { $sum: "$amount" }
                            }
                        },
                        { $project: { _id: 0, todayRevenue: 1 } }
                    ]
                }
            }
        ]);

        // Extract transactions, summary, and today's revenue
        const transactions = result[0].transactions;
        const summary = result[0].summary.length > 0
            ? result[0].summary[0]
            : { totalCredit: 0, totalDebit: 0, totalBalance: 0, totalDeposit: 0, withdrawBalance: 0, totalRevenue: 0 };

        const todayRevenue = result[0].todayRevenue.length > 0 ? result[0].todayRevenue[0].todayRevenue : 0;

        return { transactions, summary, todayRevenue };

    } catch (err) {
        console.error("Error in transactionDataGet service:", err.message || err);
        throw err;
    }
};

const generateOrderId = () => {
    return crypto.randomUUID().replace(/-/g, '').substr(0, 12);
 };
 const rechargeCashFreePayment = async (amount, userMobile, userName, userEmail, userId) => {
    try {
        const orderId = generateOrderId();
        // console.log(am);
        
        const request  = {
            "order_amount":Number(amount),
            "order_currency": "INR",
            "order_id": orderId,
            "customer_details": {
                customer_id: String(userId),   // Ensure it's a string
                customer_name: String(userName),
                customer_email: String(userEmail),
                customer_phone: String(userMobile) // Ensure it's a string
            },   
        };
        // var request = {
        //     "order_amount": "1",
        //     "order_currency": "INR",
        //     "customer_details": {
        //       "customer_id": "node_sdk_test",
        //       "customer_name": "",
        //       "customer_email": "example@gmail.com",
        //       "customer_phone": "9999999999"
        //     },
        //     "order_meta": {
        //       "return_url": "https://test.cashfree.com/pgappsdemos/return.php?order_id=order_123"
        //     },
        //     "order_note": ""
        //   }

        const data = await Cashfree.PGCreateOrder("2023-08-01", request);
        return data;
    } catch (err) {
        console.log('Error:', err);
        throw err;
    }
};

const rechargeCashFreeVerify = async (email, firstname, mobile, amount) => {
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

module.exports = { transactionData, transactionDataGet, rechargeCashFreePayment };
