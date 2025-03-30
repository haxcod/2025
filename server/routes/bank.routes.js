const bankController = require('../controllers/bank.controller');
const authMiddleware = require('../middleware/auth.middleware')

const routes = (data)=>{
    data.post('/api/v1/bank',bankController.bankData);
    data.get('/api/v1/bank',bankController.bankDataGet);
}

module.exports =routes