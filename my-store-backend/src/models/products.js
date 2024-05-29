const Sequelize = require('sequelize');

const sequelize = require('../../util/database');

const Product = sequelize.define('product', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    title: Sequelize.STRING,
    price: {
        type: Sequelize.DOUBLE,
        allowNull: false
    },
    image: {
        type: Sequelize.TEXT("long")
    },
    description: {
        type: Sequelize.TEXT,
        allowNull: false
    },
    total: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },
    category: {
        type: Sequelize.TEXT("long"),
    }
});


module.exports = Product;
