const bankModal = require('../models/bank.model');

const bankData = async (mobile, holder, account, ifsc) => {
    try {
        // Validate input
        if (!mobile || !holder || !account || !ifsc) {
            throw new Error("All fields (number, holder, account, ifsc) are required.");
        }

        // Create a new bank record
        const data = await bankModal.create({ mobile, holder, account, ifsc });

        return data;
    } catch (err) {
        console.error("Error in bankData service:", err.message || err);
        // Rethrow the error to let the controller handle it
        throw err;
    }
};
const bankDataGet = async (mobile) => {
    try {
        // Validate input
        if (!mobile) {
            throw new Error("number are required.");
        }

        // Create a new bank record
        const data = await bankModal.find({ mobile});

        return data;
    } catch (err) {
        console.error("Error in bankData service:", err.message || err);
        // Rethrow the error to let the controller handle it
        throw err;
    }
};

module.exports = { bankData,bankDataGet };
