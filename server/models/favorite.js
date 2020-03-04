const {Sequelize} = require('sequelize')
const db = require('../config/database')

const Favorite = db.define('favorite', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  }
})

module.exports = Favorite