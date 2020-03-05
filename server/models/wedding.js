const Sequelize = require('sequelize')
const db = require('../config/database')

const Wedding = db.define('wedding', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  partner1: Sequelize.STRING,
  partner2: Sequelize.STRING,
  date: Sequelize.DATEONLY,
  num_of_guests: Sequelize.INTEGER,
  budget: Sequelize.INTEGER,
  preferred_location: Sequelize.STRING
})

module.exports = Wedding