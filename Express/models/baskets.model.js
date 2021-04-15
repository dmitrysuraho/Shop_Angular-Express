const Sequelize = require('sequelize');
const sequelize = require('../config/sequelize');
const Model = Sequelize.Model;

class Baskets extends Model {
}

Baskets.init(
    {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false
        },
        userId: {
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
        modelName: 'baskets'
    }
);

module.exports = Baskets;