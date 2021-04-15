const Sequelize = require('sequelize');
const sequelize = require('../config/sequelize');
const Model = Sequelize.Model;

class Brands extends Model {
}

Brands.init(
    {
        brand: {
            type: Sequelize.STRING,
            primaryKey: true,
            allowNull: false
        }
    },
    {
        sequelize,
        modelName: 'brands'
    }
);

module.exports = Brands;