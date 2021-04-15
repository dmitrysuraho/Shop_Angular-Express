const Sequelize = require('sequelize');
const sequelize = require('../config/sequelize');
const Model = Sequelize.Model;

class Categories extends Model {
}

Categories.init(
    {
        category: {
            type: Sequelize.STRING,
            primaryKey: true,
            allowNull: false
        },
        type: {
            type: Sequelize.STRING,
            allowNull: false
        }
    },
    {
        sequelize,
        modelName: 'categories'
    }
);

module.exports = Categories;
