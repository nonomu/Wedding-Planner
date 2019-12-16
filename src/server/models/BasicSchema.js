const mongoose = require('mongoose')
const Schema = mongoose.Schema
const Wedding = new Schema({
    
})

const weddingPlanner = mongoose.model("Wedding", Wedding)
module.exports = weddingPlanner
