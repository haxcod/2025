const productController = require('../controllers/product.controller');

const routes = (data)=>{
    data.post('/api/v1/my/product',productController.createProduct);
    data.get('/api/v1/my/product',productController.getProducts);
    data.patch('/api/v1/my/product/claim', productController.isClaimed); 
}

module.exports =routes