const Sequelize = require('sequelize');
const sequelize = require('../config/sequelize');
const Model = Sequelize.Model;

class OrdersProducts extends Model {
}

OrdersProducts.init(
    {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false
        },
        orderId: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        productId: {
            type: Sequelize.INTEGER,
            allowNull: false
        }
    },
    {
        sequelize,
        modelName: 'ordersProducts'
    }
);

module.exports = OrdersProducts;