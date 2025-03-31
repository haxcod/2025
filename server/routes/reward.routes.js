const rewardController = require('../controllers/reward.controller');


const routes = (data)=>{
    data.get('/api/v1/reward',rewardController.getRewardData);
    data.post('/api/v1/reward',rewardController.createRewardData);
}

module.exports =routes