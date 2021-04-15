const Sequelize = require('sequelize');
module.exports = new Sequelize('sql11404195', 'sql11404195', '64QPbpQ3GB', {
    dialect: 'mysql',
    host: 'sql11.freesqldatabase.com',
    define: {
        timestamps: false
    },
    pool: {
        max: 5,
        min: 0,
        idle: 10000
    }
});
