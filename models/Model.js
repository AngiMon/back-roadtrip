var Sequelize = require('sequelize');

const sequelize = new Sequelize(
    process.env.DATABASE, 
    process.env.DATABASE_USER, 
    process.env.DATABASE_PASSWORD, 
    {
        host: process.env.HOST,
        dialect: 'postgres',
        logging: false,
    });

module.exports = sequelize;

sequelize.sync({logging: console.log});