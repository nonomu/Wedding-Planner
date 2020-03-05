require('dotenv').config()
const express = require('express')
const bodyParser = require('body-parser')
const morgan = require('morgan')
const cors = require('cors')
const syncDb = require('./server/config/relations')

const app = express()
const vendors = require('./server/routes/vendors')
const wedding = require('./server/routes/wedding')
const auth = require('./server/routes/auth')
const guests = require('./server/routes/guestManagement')

app.use(process.env.NODE_ENV === 'DEVELOPMENT' ? cors() : null)
app.use(process.env.NODE_ENV === 'DEVELOPMENT' ? morgan("dev") : null)
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))


app.use('/api/vendors', vendors)
app.use('/api/wedding-details', wedding)
app.use('/api', guests)
app.use('/api', auth)


const PORT = process.env.PORT || 4200
syncDb().then(() => {
  app.listen(PORT, () => console.log(`Running on port ${4200}`))
})