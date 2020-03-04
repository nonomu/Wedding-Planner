const {Sequelize} = require('sequelize')
const db = require('../config/database')

const Table = db.define('table', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  title: Sequelize.STRING,
  number: Sequelize.INTEGER,
  capacity: Sequelize.INTEGER,
  seated: Sequelize.INTEGER
})

module.exports = Table