const bankController = require('../controllers/bank.controller');
const authMiddleware = require('../middleware/auth.middleware')

const routes = (data)=>{
    data.post('/api/v1/bank',authMiddleware.isAuthenticated,bankController.bankData);
    data.get('/api/v1/bank',authMiddleware.isAuthenticated,bankController.bankDataGet);
}

module.exports =routes