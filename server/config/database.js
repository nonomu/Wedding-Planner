const Sequelize = require('sequelize')
const sequelize = new Sequelize(process.env.DB)

module.exports = sequelize