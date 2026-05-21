const express = require('express');
const router = express.Router();
const {
  createBooking, getMyBookings, getBookingById,
  updateBookingStatus, cancelBooking, getAllBookings, scheduleMeeting
} = require('../controllers/bookingController');
const { protect, adminOnly } = require('../middleware/authMiddleware');

router.post('/', protect, createBooking);
router.get('/my', protect, getMyBookings);
router.get('/all', protect, adminOnly, getAllBookings);
router.get('/:id', protect, getBookingById);
router.put('/:id/status', protect, adminOnly, updateBookingStatus);
router.put('/:id/meeting', protect, adminOnly, scheduleMeeting);
router.put('/:id/cancel', protect, cancelBooking);

module.exports = router;