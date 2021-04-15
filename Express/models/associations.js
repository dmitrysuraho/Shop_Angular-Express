const Products = require('./products.model');
const Brands = require('./brands.model');
const Categories = require('./categories.model');
const Users = require('./users.model');
const Addresses = require('./addresses.model');
const Cards = require('./cards.model');
const Baskets = require('./baskets.model');
const Orders = require('../models/orders.model');
const OrdersProducts = require('../models/ordersProducts.model');

module.exports = () => {
    Categories.hasMany(Products, {foreignKey: 'category', as: 'categories_products_fk', onDelete: 'cascade'});
    Products.belongsTo(Categories, {foreignKey: 'category', as: 'products_category_fk'});
    Brands.hasMany(Products, {foreignKey: 'brand', as: 'brands_products_fk', onDelete: 'cascade'});
    Products.belongsTo(Brands, {foreignKey: 'brand', as: 'products_brand_fk'});

    Users.hasOne(Addresses, {foreignKey: 'userId', as: 'users_addresses_fk', onDelete: 'cascade'});
    Addresses.belongsTo(Users, {foreignKey: 'userId', as: 'addresses_users_fk'});
    Users.hasOne(Cards, {foreignKey: 'userId', as: 'users_cards_fk', onDelete: 'cascade'});
    Cards.belongsTo(Users, {foreignKey: 'userId', as: 'cards_users_fk'});

    Users.hasMany(Baskets, {foreignKey: 'userId', as: 'users_baskets_fk', onDelete: 'cascade'});
    Baskets.belongsTo(Users, {foreignKey: 'userId', as: 'baskets_users_fk'});
    Products.hasMany(Baskets, {foreignKey: 'productId', as: 'products_baskets_fk', onDelete: 'cascade'});
    Baskets.belongsTo(Products, {foreignKey: 'productId', as: 'baskets_products_fk'});

    Users.hasMany(Orders, {foreignKey: 'userId', as: 'users_orders_fk', onDelete: 'cascade'});
    Orders.belongsTo(Users, {foreignKey: 'userId', as: 'orders_users_fk'});
    Orders.hasMany(OrdersProducts, {foreignKey: 'orderId', as: 'orders_ordersProducts_fk', onDelete: 'cascade'});
    OrdersProducts.belongsTo(Orders, {foreignKey: 'orderId', as: 'ordersProducts_orders_fk'});
    Products.hasMany(OrdersProducts, {foreignKey: 'productId', as: 'products_ordersProducts_fk', onDelete: 'cascade'});
    OrdersProducts.belongsTo(Products, {foreignKey: 'productId', as: 'ordersProducts_products_fk'});
}