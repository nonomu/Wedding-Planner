const express = require('express')
const router = express.Router()
const weddingController = require('../controllers/wedding')

router.get('/:userId', weddingController.getWeddingDetails)
router.put('/profile', weddingController.putProfile)

module.exports = router