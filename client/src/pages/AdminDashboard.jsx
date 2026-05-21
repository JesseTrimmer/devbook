import { useState, useEffect } from 'react';
import { getAllBookings, updateBookingStatus, scheduleMeeting } from '../services/api';

function AdminDashboard() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [filter, setFilter] = useState('all');
  const [meetingData, setMeetingData] = useState({});

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const { data } = await getAllBookings();
        setBookings(data);
      } catch {
        setError('Failed to load bookings.');
      } finally {
        setLoading(false);
      }
    };
    fetchBookings();
  }, []);

  const handleStatusChange = async (id, status) => {
    try {
      await updateBookingStatus(id, status);
      setBookings(prev =>
        prev.map(b => b._id === id ? { ...b, status } : b)
      );
    } catch {
      setError('Failed to update status.');
    }
  };

  const handleMeetingChange = (id, field, value) => {
    setMeetingData(prev => ({
      ...prev,
      [id]: { ...prev[id], [field]: value }
    }));
  };

  const handleScheduleMeeting = async (id) => {
  const meeting = meetingData[id];
  if (!meeting?.date || !meeting?.time) return;
  try {
    const { data } = await scheduleMeeting(id, {
      date: meeting.date,
      time: meeting.time,
      notes: meeting.notes || ''
    });
    setBookings(prev =>
      prev.map(b => b._id === id ? data : b)
    );
    setMeetingData(prev => ({ ...prev, [id]: { ...prev[id], saved: true } }));
  } catch {
    setError('Failed to schedule meeting.');
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

  if (loading) return <div className="loading-page">Loading admin dashboard...</div>;

  return (
    <div className="dashboard-page">
      <div className="dashboard-header">
        <div>
          <h1>Admin Dashboard</h1>
          <p>Manage all client bookings and project statuses</p>
        </div>
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
            {bookings.filter(b => b.status === 'meeting-scheduled').length}
          </span>
          <span className="stat-label">Meetings Set</span>
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
          <h2>All Bookings</h2>
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
          <div className="empty-state"><p>No bookings found.</p></div>
        ) : (
          <div className="bookings-list">
            {filtered.map(booking => (
              <div key={booking._id} className="booking-card">
                <div className="booking-card-header">
                  <div>
                    <h3>{booking.projectName}</h3>
                    <p className="booking-service">{booking.service?.title}</p>
                    <div className="client-info">
                      <span>👤 {booking.client?.name}</span>
                      <span>✉ {booking.client?.email}</span>
                      {booking.client?.phone && <span>📞 {booking.client.phone}</span>}
                      {booking.client?.company && <span>🏢 {booking.client.company}</span>}
                    </div>
                  </div>
                  <span
                    className="status-badge"
                    style={{ backgroundColor: statusColor[booking.status] || '#64748b' }}
                  >
                    {booking.status === 'meeting-scheduled' ? 'Meeting Scheduled' : booking.status}
                  </span>
                </div>

                <div className="booking-card-body">
                  <p className="booking-details">{booking.projectDetails}</p>
                  <div className="booking-meta">
                    <span>📅 Start: {new Date(booking.preferredDate).toLocaleDateString()}</span>
                    <span>💰 Price: ${booking.totalPrice?.toLocaleString()}</span>
                    <span>🕐 Booked: {new Date(booking.createdAt).toLocaleDateString()}</span>
                  </div>
                  {booking.aiEstimate && (
                    <div className="booking-estimate">
                      <strong>AI Estimate:</strong> {booking.aiEstimate.estimatedCost}
                    </div>
                  )}
                  {booking.status === 'meeting-scheduled' && booking.meetingInfo && (
                    <div className="meeting-info-display">
                      <strong>Meeting Scheduled:</strong> {booking.meetingInfo.date} at {booking.meetingInfo.time}
                      {booking.meetingInfo.notes && <p>{booking.meetingInfo.notes}</p>}
                    </div>
                  )}
                </div>

                <div className="booking-card-actions admin-actions">
                  <div className="status-update">
                    <label>Update Status</label>
                    <select
                      value={booking.status}
                      onChange={(e) => handleStatusChange(booking._id, e.target.value)}
                      className="status-select"
                    >
                      <option value="pending">Pending</option>
                      <option value="confirmed">Confirmed</option>
                      <option value="meeting-scheduled">Meeting Scheduled</option>
                      <option value="in-progress">In Progress</option>
                      <option value="completed">Completed</option>
                      <option value="cancelled">Cancelled</option>
                    </select>
                  </div>

                  <div className="meeting-scheduler">
                    <label>Schedule a Meeting</label>
                    <div className="meeting-fields">
                      <input
                        type="date"
                        value={meetingData[booking._id]?.date || ''}
                        onChange={(e) => handleMeetingChange(booking._id, 'date', e.target.value)}
                        className="meeting-input"
                        min={new Date().toISOString().split('T')[0]}
                      />
                      <input
                        type="time"
                        value={meetingData[booking._id]?.time || ''}
                        onChange={(e) => handleMeetingChange(booking._id, 'time', e.target.value)}
                        className="meeting-input"
                      />
                      <input
                        type="text"
                        placeholder="Meeting notes or link (optional)"
                        value={meetingData[booking._id]?.notes || ''}
                        onChange={(e) => handleMeetingChange(booking._id, 'notes', e.target.value)}
                        className="meeting-input meeting-notes"
                      />
                      <button
                        className="btn-schedule"
                        onClick={() => handleScheduleMeeting(booking._id)}
                        disabled={!meetingData[booking._id]?.date || !meetingData[booking._id]?.time}
                      >
                        {meetingData[booking._id]?.saved ? 'Saved!' : 'Save Meeting'}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default AdminDashboard;