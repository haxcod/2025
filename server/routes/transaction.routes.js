const transactionsController = require('../controllers/transaction.controller');
const authMiddleware = require('../middleware/auth.middleware')
const routes = (data)=>{
    data.post('/api/v1/transactions',transactionsController.createTransaction);
    data.get('/api/v1/transactions',transactionsController.getTransactions);
    data.post('/api/v1/payment',transactionsController.rechargeCashFreePayment);
    data.post('/api/v1/verify',transactionsController.rechargeCashFreeVerify);
}

module.exports =routes