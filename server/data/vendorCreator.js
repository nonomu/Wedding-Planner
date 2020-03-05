const vendors = require('./vendors.json')
const Vendor = require('../models/vendor')

function createVendor(vendorData) {
  return Vendor.create(vendorData)
}

for (let vendor of vendors) {
  createVendor(vendor)
}