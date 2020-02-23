const express = require('express')
const router = express.Router()
const weddingController = require('../controllers/wedding')

router.get('/:userId', weddingController.getWeddingDetails)
router.put('/user-profile', weddingController.putUserProfile)

module.exports = router