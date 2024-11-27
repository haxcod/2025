const commentController = require('../controllers/comment.controller');

const routes = (data)=>{
    data.post('/api/v1/comment',commentController.createComment);
    data.get('/api/v1/comment',commentController.getComments);
}

module.exports =routes