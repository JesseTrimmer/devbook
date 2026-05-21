import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getMyBookings, cancelBooking } from '../services/api';
import { useAuth } from '../context/AuthContext';

function Dashboard() {
  const { user } = useAuth();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const { data } = await getMyBookings();
        setBookings(data);
      } catch {
        setError('Failed to load bookings.');
      } finally {
        setLoading(false);
      }
    };
    fetchBookings();
  }, []);

  const handleCancel = async (id) => {
    if (!window.confirm('Are you sure you want to cancel this booking?')) return;
    try {
      await cancelBooking(id);
      setBookings(prev =>
        prev.map(b => b._id === id ? { ...b, status: 'cancelled' } : b)
      );
    } catch {
      setError('Failed to cancel booking.');
    }
  };

const statusColor = {
  pending: '#f59e0b',
  confirmed: '#3b82f6',
  'in-progress': '#8b5cf6',
  'meeting-scheduled': '#22d3ee',
  completed: '#10b981',
  cancelled: '#ef4444'
};

  const filtered = filter === 'all'
    ? bookings
    : bookings.filter(b => b.status === filter);

  if (loading) return <div className="loading-page">Loading your dashboard...</div>;

  return (
    <div className="dashboard-page">
      <div className="dashboard-header">
        <div>
          <h1>Welcome back, {user?.name?.split(' ')[0]}!</h1>
          <p>Manage your project bookings and track progress</p>
        </div>
        <Link to="/services" className="btn-primary">+ New Booking</Link>
      </div>

      <div className="dashboard-stats">
        <div className="stat-card">
          <span className="stat-number">{bookings.length}</span>
          <span className="stat-label">Total Bookings</span>
        </div>
        <div className="stat-card">
          <span className="stat-number">
            {bookings.filter(b => b.status === 'pending').length}
          </span>
          <span className="stat-label">Pending</span>
        </div>
        <div className="stat-card">
          <span className="stat-number">
            {bookings.filter(b => b.status === 'in-progress').length}
          </span>
          <span className="stat-label">In Progress</span>
        </div>
        <div className="stat-card">
          <span className="stat-number">
            {bookings.filter(b => b.status === 'completed').length}
          </span>
          <span className="stat-label">Completed</span>
        </div>
      </div>

      {error && <div className="error-message">{error}</div>}

      <div className="bookings-section">
        <div className="bookings-header">
          <h2>My Bookings</h2>
          <div className="filter-bar">
            {['all', 'pending', 'confirmed', 'meeting-scheduled', 'in-progress', 'completed', 'cancelled'].map(s => (
  <button
    key={s}
    className={`filter-btn ${filter === s ? 'active' : ''}`}
    onClick={() => setFilter(s)}
  >
    {s === 'meeting-scheduled' ? 'Meeting Set' : s.charAt(0).toUpperCase() + s.slice(1)}
  </button>
))}
          </div>
        </div>

        {filtered.length === 0 ? (
          <div className="empty-state">
            <p>No bookings found.</p>
            <Link to="/services" className="btn-primary">Browse Services</Link>
          </div>
        ) : (
          <div className="bookings-list">
            {filtered.map(booking => (
              <div key={booking._id} className="booking-card">
                <div className="booking-card-header">
                  <div>
                    <h3>{booking.projectName}</h3>
                    <p className="booking-service">{booking.service?.title}</p>
                  </div>
                  <span
                    className="status-badge"
                    style={{ backgroundColor: statusColor[booking.status] }}
                  >
                    {booking.status}
                  </span>
                </div>
                <div className="booking-card-body">
                  <p className="booking-details">{booking.projectDetails}</p>
                  <div className="booking-meta">
                    <span>📅 Start: {new Date(booking.preferredDate).toLocaleDateString()}</span>
                    <span>💰 From: ${booking.totalPrice?.toLocaleString()}</span>
                    <span>🕐 Booked: {new Date(booking.createdAt).toLocaleDateString()}</span>
                  </div>
                 {booking.aiEstimate && (
  <div className="booking-estimate">
    <strong>AI Estimate:</strong> {booking.aiEstimate.estimatedCost}
  </div>
)}
{booking.status === 'meeting-scheduled' && booking.meetingInfo && (
  <div className="meeting-info-display">
    <strong>Meeting Scheduled</strong>
    <p>
      📅 {new Date(booking.meetingInfo.date).toLocaleDateString('en-US', {
        weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
      })} at {booking.meetingInfo.time}
    </p>
    {booking.meetingInfo.notes && (
      <p>📝 {booking.meetingInfo.notes}</p>
    )}
  </div>
)}
                </div>
                {booking.status === 'pending' && (
                  <div className="booking-card-actions">
                    <button
                      className="btn-cancel"
                      onClick={() => handleCancel(booking._id)}
                    >
                      Cancel Booking
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Dashboard;