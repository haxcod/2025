const productController = require('../controllers/product.controller');
const authMiddleware = require('../middleware/auth.middleware')
const routes = (data) => {
    data.get('/api/v1/product', productController.getProducts);
    data.post('/api/v1/my/product', productController.createProduct);
    data.get('/api/v1/my/product', productController.getMyProducts);
    data.patch('/api/v1/my/product/claim', productController.isClaimed);
}

module.exports = routes