const Booking = require('../models/Booking');

const createBooking = async (req, res) => {
  try {
    const { service, projectName, projectDetails, preferredDate, aiEstimate, totalPrice, notes } = req.body;
    const booking = await Booking.create({
      client: req.user._id,
      service,
      projectName,
      projectDetails,
      preferredDate,
      aiEstimate,
      totalPrice,
      notes
    });
    await booking.populate('service');
    res.status(201).json(booking);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getMyBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({ client: req.user._id })
      .populate('service')
      .sort({ createdAt: -1 });
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getBookingById = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id).populate('service client');
    if (!booking) return res.status(404).json({ message: 'Booking not found' });
    if (booking.client._id.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Not authorized' });
    }
    res.json(booking);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateBookingStatus = async (req, res) => {
  try {
    const booking = await Booking.findByIdAndUpdate(
      req.params.id,
      { status: req.body.status },
      { new: true }
    ).populate('service');
    if (!booking) return res.status(404).json({ message: 'Booking not found' });
    res.json(booking);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const cancelBooking = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);
    if (!booking) return res.status(404).json({ message: 'Booking not found' });
    if (booking.client.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized' });
    }
    booking.status = 'cancelled';
    await booking.save();
    res.json({ message: 'Booking cancelled', booking });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.find()
      .populate('client', 'name email company phone')
      .populate('service', 'title category')
      .sort({ createdAt: -1 });
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const scheduleMeeting = async (req, res) => {
  try {
    const { date, time, notes } = req.body;
    const booking = await Booking.findByIdAndUpdate(
      req.params.id,
      {
        status: 'meeting-scheduled',
        meetingInfo: { date, time, notes, scheduledAt: new Date() }
      },
      { new: true }
    ).populate('service client');
    if (!booking) return res.status(404).json({ message: 'Booking not found' });
    res.json(booking);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { createBooking, getMyBookings, getBookingById, updateBookingStatus, cancelBooking, getAllBookings, scheduleMeeting };