const userController = require('../controllers/user.controller');
const authMiddleware = require('../middleware/auth.middleware')

const routes = (data)=>{
    data.post('/api/v1/register',userController.createUser);
    data.post('/api/v1/login',userController.loginUser);
    data.patch('/api/v1/password',userController.updatePassword);
    data.get('/api/v1/invites', userController.getInviteUser);
    data.get('/api/v1/find-invite-by', userController.findInvitedByUser);
}

module.exports =routes