const Sequelize = require('sequelize');
const sequelize = require('../config/sequelize');
const Products = require('../models/products.model');
const Baskets = require('../models/baskets.model');
const Orders = require('../models/orders.model');
const OrdersProducts = require('../models/ordersProducts.model');

module.exports.makeOrder = async (req, res) => {
    sequelize.transaction({
        isolationLevel: Sequelize.Transaction.ISOLATION_LEVELS.READ_COMMITTED})
        .then(async t => {
            const basketProducts = await Products.findAll({
                raw: true,
                include: [{
                    model: Baskets,
                    as: 'products_baskets_fk',
                    required: true,
                    where: {
                        userId: req.userId
                    },
                    attributes: []
                }]
            });
            const order = await Orders.create({
                userId: req.userId,
                date: Date.now()
            });
            basketProducts.map(async product => {
                await OrdersProducts.create({
                    orderId: order.id,
                    productId: product.id
                });
                await Products.update({
                        buy: product.buy + 1
                    },
                    {
                        where: {
                            id: product.id
                        }
                    })
            });
            await Baskets.destroy({
                where: {
                    userId: req.userId
                }
            });
            res.status(201).json(order);
        })
        .catch(error => {
            res.status(500).json({message: error.message});
        });
}

module.exports.getOrdersCount = async (req, res) => {
    try {
        const ordersCount = await Orders.findOne({
            where: {
                userId: req.userId
            },
            attributes: [
                [Sequelize.fn('count', Sequelize.col('*')), 'count']
            ]
        });
        res.status(200).json(ordersCount);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

module.exports.getOrdersForPage = async (req, res) => {
    try {
        const orders = await Orders.findAll({
            offset: (Number(req.query.currentPage) - 1) * 3,
            limit: 3,
            where: {
                userId: req.userId
            }
        });
        if (orders.length) {
            res.status(200).json(orders);
        } else {
            res.status(404).json({message: 'No orders'});
        }
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

module.exports.getBoughtProductsFromOrder = async (req, res) => {
    try {
        const products = await Products.findAll({
            include: [{
                model: OrdersProducts,
                as: 'products_ordersProducts_fk',
                required: true,
                where: {
                    orderId: req.params.order
                },
                attributes: []
            }]
        });
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

module.exports.getSumPriceFromOrder = async (req, res) => {
    try {
        const orderSumPrice = await Products.findOne({
            attributes: [
                [Sequelize.fn('sum', Sequelize.col('price')), 'sum']
            ],
            include: [{
                model: OrdersProducts,
                as: 'products_ordersProducts_fk',
                required: true,
                where: {
                    orderId: req.params.order
                },
                attributes: []
            }]
        });
        res.status(200).json(orderSumPrice);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

module.exports.deleteOrders = async (req, res) => {
    try {
        await Orders.destroy({
            where: {
                userId: req.userId
            }
        });
        res.status(201).json({message: 'deleted'})
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}