const express = require('express')
const router = express.Router()
const vendorsController = require('../controllers/vendors')


router.get('/', vendorsController.getVendors)
router.get('/booked/:weddingId', vendorsController.getBookedVendors)
router.post('/book', vendorsController.postBookVendor)
router.get('/favorites/:userId', vendorsController.getFavoritesById)
router.post('/favorite', vendorsController.postFavorite)
router.delete('/favorite', vendorsController.deleteFavorite)

module.exports = router