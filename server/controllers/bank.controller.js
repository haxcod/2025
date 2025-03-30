const bankService = require('../services/bank.service');

const bankData = async (req, res) => {
    const { mobile, holder, account, ifsc } = req.body;

    if (!mobile || !holder || !account || !ifsc) {
        return res.status(400).json({
            status: 400,
            message: "All fields (mobile, holder, account, ifsc) are required.",
        });
    }

    try {
        const response = await bankService.bankData(mobile, holder, account, ifsc);
        return res.status(200).json({
            status: 200,
            data: response,
        });
    } catch (err) {
        console.error("Error in bankData:", err);
        return res.status(500).json({
            status: 500,
            message: "Internal server error",
        });
    }
};

const bankDataGet = async (req, res) => {
    const { mobile } = req.query;
    console.log(mobile);
    
    //  req.params;
    if (!mobile) {
        return res.status(400).json({
            status: 400,
            message: "Mobile is required.",
        });
    }

    try {
        const response = await bankService.bankDataGet(mobile);
        return res.status(200).json({
            status: 200,
            data: response,
        });
    } catch (err) {
        console.error("Error in bankDataGet:", err);
        return res.status(500).json({
            status: 500,
            message: "Internal server error",
        });
    }
};

module.exports = { bankData, bankDataGet };
