const db = require('../config/database')
const User = require('../models/user')
const Wedding = require('../models/wedding')
const Vendor = require('../models/vendor')
const BookedVendor = require('../models/bookedVendor')
const Favorite = require('../models/favorite')
const Guest = require('../models/guest')
const Table = require('../models/table')

module.exports = function syncDb() {
  User.belongsTo(Wedding, {constraints: true, onDelete: 'CASCADE'})
  Wedding.hasMany(User)
  Vendor.belongsToMany(Wedding, { through: BookedVendor })
  Wedding.belongsToMany(Vendor, {through: BookedVendor})
  Vendor.belongsToMany(User, { through: Favorite })
  User.belongsToMany(Vendor, { through: Favorite })
  Table.belongsTo(Wedding)
  Wedding.hasMany(Table)
  Wedding.hasMany(Guest)
  Table.hasMany(Guest)
  Guest.belongsTo(Table)
  
  return db.sync()
}