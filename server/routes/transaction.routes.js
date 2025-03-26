const transactionsController = require('../controllers/transaction.controller');

const routes = (data)=>{
    data.post('/api/v1/transactions',transactionsController.createTransaction);
    data.get('/api/v1/transactions',transactionsController.getTransactions);
    data.post('/api/v1/payment',transactionsController.rechargeCashFreePayment);
    data.post('/api/v1/verify',transactionsController.rechargeCashFreePayment);
}

module.exports =routes