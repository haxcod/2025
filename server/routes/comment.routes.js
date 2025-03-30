const commentController = require('../controllers/comment.controller');
const authMiddleware = require('../middleware/auth.middleware')
const routes = (data)=>{
    data.post('/api/v1/comment',authMiddleware.isAuthenticated,commentController.createComment);
    data.get('/api/v1/comment',authMiddleware.isAuthenticated,commentController.getComments);
}

module.exports =routes