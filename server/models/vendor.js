const {Sequelize} = require('sequelize')
const db = require('../config/database')

const Vendor = db.define('vendor', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  category: Sequelize.STRING,
  name: Sequelize.STRING,
  image: Sequelize.STRING,
  location: Sequelize.STRING,
  rating: Sequelize.INTEGER,
  contact: Sequelize.STRING,
  phone: Sequelize.STRING,
  email: Sequelize.STRING,
  small_prints: Sequelize.STRING
})

module.exports = Vendor