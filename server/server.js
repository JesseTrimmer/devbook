const express = require('express');
const cors = require('cors');
require('dotenv').config();
const connectDB = require('./config/db');

const authRoutes = require('./routes/authRoutes');
const serviceRoutes = require('./routes/serviceRoutes');
const bookingRoutes = require('./routes/bookingRoutes');
const estimateRoutes = require('./routes/estimateRoutes');
const app = express();

connectDB();

app.use(cors({ origin: process.env.CLIENT_URL || 'http://localhost:5173' }));
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/services', serviceRoutes);
app.use('/api/bookings', bookingRoutes);
app.use('/api/estimate', estimateRoutes);
app.get('/', (req, res) => res.json({ message: 'DevBook API running' }));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));