require('dotenv').config()
const express = require('express')
const app = express()
const api = require('./server/routes/api')
const cors = require('cors')
const morgan = require('morgan')
const apigoogle = require('./server/routes/apigoogle.js')
const bodyParser = require('body-parser')

app.use(process.env.NODE_ENV === 'DEVELOPMENT' ? cors() : null)
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.use(morgan("default"))

app.use('/api', api)
app.use('/apigoogle', apigoogle)

const port = process.env.PORT || 4200
app.listen(port, function() {
	console.log(`Running on port ${port}`)
})