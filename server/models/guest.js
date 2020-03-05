const {Sequelize} = require('sequelize')
const db = require('../config/database')

const Guest = db.define('guest', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  name: Sequelize.STRING,
  partySize: Sequelize.INTEGER,
  relation: Sequelize.STRING,
  phone: Sequelize.STRING,
  email: Sequelize.STRING
})

module.exports = Guest