const transactionsController = require('../controllers/transaction.controller');
const authMiddleware = require('../middleware/auth.middleware')
const routes = (data)=>{
    data.post('/api/v1/transactions',authMiddleware.isAuthenticated,transactionsController.createTransaction);
    data.get('/api/v1/transactions',authMiddleware.isAuthenticated,transactionsController.getTransactions);
    data.post('/api/v1/payment',authMiddleware.isAuthenticated,transactionsController.rechargeCashFreePayment);
    data.post('/api/v1/verify',authMiddleware.isAuthenticated,transactionsController.rechargeCashFreeVerify);
}

module.exports =routes