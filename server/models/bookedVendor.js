const {Sequelize} = require('sequelize')
const db = require('../config/database')

const BookedVendor = db.define('bookedVendor', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  price: Sequelize.INTEGER
})

module.exports = BookedVendor