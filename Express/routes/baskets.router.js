const express = require('express');
const passport = require('passport');
const basketsController = require('../controllers/baskets.controller');
const router = express.Router();

router.get('/products', passport.authenticate('jwt', {session: false}), basketsController.getBasketProducts);
router.get('/products/page', passport.authenticate('jwt', {session: false}), basketsController.getBasketProductsForPage);
router.get('/count', passport.authenticate('jwt', {session: false}), basketsController.getBasketProductsCount);
router.get('/sum', passport.authenticate('jwt', {session: false}), basketsController.getBasketProductsSumPrice);
router.post('/', passport.authenticate('jwt', {session: false}), basketsController.addProductToBasket);
router.get('/is/:product', passport.authenticate('jwt', {session: false}), basketsController.isAddToBasket);
router.delete('/:product', passport.authenticate('jwt', {session: false}), basketsController.deleteProductFromBasket);

module.exports = router;