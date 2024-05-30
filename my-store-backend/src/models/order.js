const Sequelize = require('sequelize');

const sequelize = require('../../util/database');


const Order = sequelize.define('order', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    total: {
        type: Sequelize.DOUBLE,
        allowNull: false
    },
    address: Sequelize.STRING,
    status: {
        type: Sequelize.STRING,
        allowNull: false
    },
    phoneNumber: Sequelize.STRING,
    note: Sequelize.STRING,
    userId: {
        type: Sequelize.INTEGER,
        allowNull: false
    }
});

module.exports = Order;