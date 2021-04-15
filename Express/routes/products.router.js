const express = require('express');
const passport = require('passport');
const productsController = require('../controllers/products.controller');
const router = express.Router();

router.get('/', productsController.getProductsForPage);
router.get('/count', productsController.getProductsCount);
router.get('/product/:id', productsController.getProductById);
router.get('/popular', productsController.getPopularProducts);
router.get('/min', productsController.getProductWithMinPrice);
router.get('/max', productsController.getProductWithMaxPrice);

module.exports = router;