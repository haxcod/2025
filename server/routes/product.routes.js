const productController = require('../controllers/product.controller');
const authMiddleware = require('../middleware/auth.middleware')
const routes = (data)=>{
    data.post('/api/v1/my/product',authMiddleware.isAuthenticated,productController.createProduct);
    data.get('/api/v1/my/product',authMiddleware.isAuthenticated,productController.getProducts);
    data.patch('/api/v1/my/product/claim',authMiddleware.isAuthenticated, productController.isClaimed); 
}

module.exports =routes