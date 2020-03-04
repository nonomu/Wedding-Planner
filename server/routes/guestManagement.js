const express = require('express')
const router = express.Router()
const guestsController = require('../controllers/guestManagement')

router.get('/guests/:weddingId', guestsController.getGuests)
router.post('/guest', guestsController.postGuest)
router.put('/guest/addtotable', guestsController.putGuestToTable)
router.put('/guest/removeFromTable', guestsController.putRemoveGuestFromTable)
router.get('/tables/:weddingId', guestsController.getTablesByWedding)
router.post('/table', guestsController.postTable)

module.exports = router