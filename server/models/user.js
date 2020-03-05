const {Sequelize} = require('sequelize')
const db = require('../config/database')

const User = db.define('user', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  email: Sequelize.STRING,
  password: Sequelize.STRING
})

module.exports = User