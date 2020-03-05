require('dotenv').config()
const {Sequelize} = require('sequelize')
const DB = process.env.DB
const USERNAME = process.env.DB_USERNAME
const PASSWORD = process.env.DB_PASSWORD
const HOST = process.env.DB_HOST

module.exports = new Sequelize(DB, USERNAME, PASSWORD, {
  host: HOST,
  dialect: 'mysql'
});