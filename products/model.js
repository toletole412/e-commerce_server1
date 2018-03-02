const Sequelize = require('sequelize')
const sequelize = require('../db')

const Product = sequelize.define('Product', {
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  price: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  description: {
    type: Sequelize.STRING,
    allowNull: false
  },
  image: Sequelize.STRING
}, {
  tableName: 'Products',
  timestamps: false
})


module.exports = Product
