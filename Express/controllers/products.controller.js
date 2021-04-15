const Sequelize = require("sequelize");
const Products = require('../models/products.model');
const Categories = require('../models/categories.model');

function getParamsForQuery(req) {
    let currentPage;
    const categoriesQuery = {};
    const productsQuery = {};
    const productsOrder = [];
    for (const field in req.query) {
        if (req.query.hasOwnProperty(field) && req.query[field] !== 'all') {
            if (field === 'type') {
                categoriesQuery[field] = req.query[field];
            } else if (field === 'sortPrice') {
                productsOrder.push(['price', req.query[field]]);
            } else if (field === 'filterPrice') {
                const filters = req.query[field].split('-');
                productsQuery['price'] = {
                    [Sequelize.Op.between]: [Number(filters[0]), Number(filters[1])]
                }
            } else if (field === 'search') {
                productsQuery['name'] = {
                    [Sequelize.Op.substring]: req.query[field]
                }
            } else if (field === 'currentPage') {
                currentPage = Number(req.query[field])
            } else {
                productsQuery[field] = req.query[field];
            }
        }
    }
    return [productsQuery, categoriesQuery, productsOrder, currentPage];
}

module.exports.getProductsForPage = async (req, res) => {
    try {
        const query = getParamsForQuery(req);
        const products = await Products.findAll({
            where: query[0],
            order: query[2],
            offset: (query[3] - 1) * 6,
            limit: 6,
            include: [{
                model: Categories,
                as: 'products_category_fk',
                required: true,
                where: query[1],
                attributes: []
            }]
        });
        if (products.length) {
            res.status(200).json(products);
        } else {
            res.status(404).json({message: 'No products'});
        }
    } catch (error) {
        console.log(error.message)
        res.status(500).json({message: error.message});
    }
}

module.exports.getProductsCount = async (req, res) => {
    try {
        const query = getParamsForQuery(req);
        const productsCount = await Products.findOne({
            where: query[0],
            include: [{
                model: Categories,
                as: 'products_category_fk',
                required: true,
                where: query[1],
                attributes: []
            }],
            raw: true,
            attributes: [
                [Sequelize.fn('count', Sequelize.col('*')), 'count']
            ]
        });
        res.status(200).json(productsCount);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

module.exports.getProductById = async (req, res) => {
    try {
        const product = await Products.findByPk(req.params.id);
        if (product) {
            res.status(200).json(product);
        } else {
            res.status(404).json({message: 'No such product'});
        }
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

module.exports.getPopularProducts = async (req, res) => {
    try {
        const products = await Products.findAll({
            raw: true,
            order: [['buy', 'desc']],
            limit: 4
        });
        if (products.length) {
            res.status(200).json(products);
        } else {
            res.status(404).json({message: 'No products'});
        }
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

module.exports.getProductWithMinPrice = async (req, res) => {
    try {
        const minPriceProduct = await Products.findOne({
            raw: true,
            attributes: [
                [Sequelize.fn('min', Sequelize.col('price')), 'min']
            ]
        });
        if (minPriceProduct) {
            res.status(200).json(minPriceProduct);
        } else {
            res.status(404).json({message: 'No products'});
        }
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

module.exports.getProductWithMaxPrice = async (req, res) => {
    try {
        const maxPriceProduct = await Products.findOne({
            raw: true,
            attributes: [
                [Sequelize.fn('max', Sequelize.col('price')), 'max']
            ]
        });
        if (maxPriceProduct) {
            res.status(200).json(maxPriceProduct);
        } else {
            res.status(404).json({message: 'No products'});
        }
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}