const Sequelize = require('sequelize');
const Baskets = require('../models/baskets.model');
const Products = require('../models/products.model');

module.exports.getBasketProducts = async (req, res, next) => {
    try {
        const basketProducts = await Products.findAll({
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
        if (basketProducts.length){
            res.status(200).json(basketProducts);
        } else {
            res.status(404).json({message: 'No products'});
        }
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

module.exports.getBasketProductsForPage = async (req, res) => {
    try {
        const basketProducts = await Products.findAll({
            offset: (Number(req.query.currentPage) - 1) * 5,
            limit: 5,
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
        if (basketProducts.length){
            res.status(200).json(basketProducts);
        } else {
            res.status(404).json({message: 'Mo products'});
        }
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

module.exports.getBasketProductsCount = async (req, res) => {
    try {
        const basketProductsCount = await Baskets.findOne({
            where: {
                userId: req.userId
            },
            attributes: [
                [Sequelize.fn('count', Sequelize.col('*')), 'count']
            ]
        });
        res.status(200).json(basketProductsCount);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

module.exports.getBasketProductsSumPrice = async (req, res) => {
    try {
        const basketProductsSumPrice = await Products.findOne({
            include: [{
                model: Baskets,
                as: 'products_baskets_fk',
                required: true,
                where: {
                    userId: req.userId
                },
                attributes: []
            }],
            attributes: [
                [Sequelize.fn('sum', Sequelize.col('price')), 'sum']
            ]
        });
        res.status(200).json(basketProductsSumPrice);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

module.exports.addProductToBasket = async (req, res) => {
    try {
        const basketProduct = await Baskets.create({
            userId: req.userId,
            productId: req.body.productId
        });
        res.status(201).json(basketProduct);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

module.exports.isAddToBasket = async (req, res) => {
    try {
        const isBasketProduct = await Baskets.findOne({
            where: {
                userId: req.userId,
                productId: req.params.product
            }
        });
        res.status(200).json({add: !!isBasketProduct});
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

module.exports.deleteProductFromBasket = async (req, res) => {
    try {
        const result = await Baskets.destroy({
            where: {
                userId: req.userId,
                productId: req.params.product
            }
        });
        res.status(201).json(result);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}