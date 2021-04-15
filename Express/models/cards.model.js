const Sequelize = require('sequelize');
const sequelize = require('../config/sequelize');
const Model = Sequelize.Model;

class Cards extends Model {
}

Cards.init(
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
        cardNumber: {
            type: Sequelize.BIGINT,
            allowNull: true
        },
        cardMonth: {
            type: Sequelize.INTEGER,
            allowNull: true
        },
        cardYear: {
            type: Sequelize.INTEGER,
            allowNull: true
        },
        cardCCV: {
            type: Sequelize.INTEGER,
            allowNull: true
        },
        cardName: {
            type: Sequelize.STRING,
            allowNull: true
        }
    },
    {
        sequelize,
        modelName: 'cards'
    }
);

module.exports = Cards;