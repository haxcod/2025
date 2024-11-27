const transactionsController = require('../controllers/transaction.controller');

const routes = (data)=>{
    data.post('/api/v1/transactions',transactionsController.createTransaction);
    data.get('/api/v1/transactions',transactionsController.getTransactions);
}

module.exports =routes