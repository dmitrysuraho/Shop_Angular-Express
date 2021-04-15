const express = require('express');
const passport = require('passport');
const ordersController = require('../controllers/orders.controller');
const router = express.Router();

router.post('/', passport.authenticate('jwt', {session: false}), ordersController.makeOrder);
router.get('/count', passport.authenticate('jwt', {session: false}), ordersController.getOrdersCount);
router.get('/', passport.authenticate('jwt', {session: false}), ordersController.getOrdersForPage);
router.get('/:order/products', passport.authenticate('jwt', {session: false}), ordersController.getBoughtProductsFromOrder);
router.get('/:order/sum', passport.authenticate('jwt', {session: false}), ordersController.getSumPriceFromOrder);
router.delete('/', passport.authenticate('jwt', {session: false}), ordersController.deleteOrders);

module.exports = router;