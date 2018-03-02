const Sequelize = require('sequelize')
const sequelize = require('../db')

const Users = sequelize.define('Users', {
  email: {
    type: Sequelize.STRING,
    allowNull: false
  },
  password: Sequelize.STRING
}, {
  tableName: 'Users'
})



module.exports = Users
