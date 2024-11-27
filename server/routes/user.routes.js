const userController = require('../controllers/user.controller');

const routes = (data)=>{
    data.post('/api/v1/register',userController.createUser);
    data.post('/api/v1/login',userController.loginUser);
    data.get('/api/v1/invite', userController.getInviteUser);
}

module.exports =routes