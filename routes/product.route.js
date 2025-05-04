const express = require('express');

const { products, product, addToCart } = require('../controllers/product.controller');
const { validateProductByIdReq, validateCartProductsReq } = require('../middlewares/products/validation');
const { checkAuth } = require('../middlewares/auth/auth');
const router = express.Router();

router.get('/list',products);
router.get('/getProductById', validateProductByIdReq, product);

router.post('/addtocart',checkAuth, validateCartProductsReq, addToCart);

module.exports = router;