const Sequelize = require('sequelize');
const sequelize = require('../config/sequelize');
const Model = Sequelize.Model;

class Addresses extends Model {
}

Addresses.init(
    {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false
        },
        userId: {
            type: Sequelize.INTEGER,
            allowNull: true
        },
        country: {
            type: Sequelize.STRING,
            allowNull: true
        },
        city: {
            type: Sequelize.STRING,
            allowNull: true
        },
        zip: {
            type: Sequelize.INTEGER,
            allowNull: true
        },
        address: {
            type: Sequelize.STRING,
            allowNull: true
        }
    },
    {
        sequelize,
        modelName: 'addresses'
    }
);

module.exports = Addresses;