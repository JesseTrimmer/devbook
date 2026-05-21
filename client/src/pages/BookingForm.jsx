import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getServiceById, createBooking, getAIEstimate } from '../services/api';

function BookingForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [service, setService] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [estimating, setEstimating] = useState(false);
  const [error, setError] = useState('');
  const [aiEstimate, setAiEstimate] = useState(null);

  const [formData, setFormData] = useState({
    projectName: '',
    projectDetails: '',
    preferredDate: '',
    notes: '',
    projectType: '',
    numPages: '5',
    features: [],
    timeline: '3 months'
  });

  const featureOptions = [
    'User Authentication', 'Payment Integration', 'Admin Dashboard',
    'API Integration', 'SEO Optimization', 'CMS / Blog',
    'Live Chat', 'Email Notifications', 'Mobile Responsive'
  ];

  useEffect(() => {
    const fetchService = async () => {
      try {
        const { data } = await getServiceById(id);
        setService(data);
        setFormData(prev => ({ ...prev, projectType: data.category }));
      } catch {
        setError('Service not found.');
      } finally {
        setLoading(false);
      }
    };
    fetchService();
  }, [id]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFeatureToggle = (feature) => {
    setFormData(prev => ({
      ...prev,
      features: prev.features.includes(feature)
        ? prev.features.filter(f => f !== feature)
        : [...prev.features, feature]
    }));
  };

  const handleGetEstimate = async () => {
    if (!formData.projectDetails) {
      return setError('Please describe your project before getting an estimate.');
    }
    setError('');
    setEstimating(true);
    try {
      const { data } = await getAIEstimate({
        projectType: formData.projectType,
        numPages: formData.numPages,
        features: formData.features,
        timeline: formData.timeline,
        projectDetails: formData.projectDetails
      });
      setAiEstimate(data);
    } catch {
      setError('Failed to get AI estimate. Please try again.');
    } finally {
      setEstimating(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSubmitting(true);
    try {
      await createBooking({
        service: id,
        projectName: formData.projectName,
        projectDetails: formData.projectDetails,
        preferredDate: formData.preferredDate,
        notes: formData.notes,
        aiEstimate: aiEstimate || null,
        totalPrice: service.startingPrice
      });
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Booking failed. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <div className="loading-page">Loading...</div>;
  if (!service) return <div className="error-page">{error}</div>;

  return (
    <div className="booking-page">
      <div className="booking-container">
        <div className="booking-header">
          <h1>Book: {service.title}</h1>
          <p>Starting from ${service.startingPrice.toLocaleString()} · {service.duration}</p>
        </div>

        {error && <div className="error-message">{error}</div>}

        <form onSubmit={handleSubmit} className="booking-form">
          <div className="form-section">
            <h2>Project Details</h2>
            <div className="form-group">
              <label>Project Name <span className="required">*</span></label>
              <input
                type="text"
                name="projectName"
                value={formData.projectName}
                onChange={handleChange}
                placeholder="e.g. My Business Website"
                required
              />
            </div>
            <div className="form-group">
              <label>Describe Your Project <span className="required">*</span></label>
              <textarea
                name="projectDetails"
                value={formData.projectDetails}
                onChange={handleChange}
                placeholder="Tell us about your business, goals, target audience, and any specific requirements..."
                rows={5}
                required
              />
            </div>
            <div className="form-group">
              <label>Preferred Start Date <span className="required">*</span></label>
              <input
                type="date"
                name="preferredDate"
                value={formData.preferredDate}
                onChange={handleChange}
                min={new Date().toISOString().split('T')[0]}
                required
              />
            </div>
          </div>

          <div className="form-section ai-section">
            <h2>🤖 AI Pricing Estimator</h2>
            <p className="section-subtitle">Answer a few questions to get an instant AI-powered cost breakdown</p>

            <div className="form-group">
              <label>Approximate Number of Pages</label>
              <select name="numPages" value={formData.numPages} onChange={handleChange}>
                <option value="1">1 page (Landing page)</option>
                <option value="5">3–5 pages</option>
                <option value="10">6–10 pages</option>
                <option value="20">10+ pages</option>
              </select>
            </div>

            <div className="form-group">
              <label>Desired Timeline</label>
              <select name="timeline" value={formData.timeline} onChange={handleChange}>
                <option value="1 month">1 month (Rush)</option>
                <option value="3 months">2–3 months (Standard)</option>
                <option value="6 months">4–6 months (Relaxed)</option>
              </select>
            </div>

            <div className="form-group">
              <label>Additional Features Needed</label>
              <div className="features-grid">
                {featureOptions.map(feature => (
                  <label key={feature} className="feature-checkbox">
                    <input
                      type="checkbox"
                      checked={formData.features.includes(feature)}
                      onChange={() => handleFeatureToggle(feature)}
                    />
                    {feature}
                  </label>
                ))}
              </div>
            </div>

            <button
              type="button"
              className="btn-estimate"
              onClick={handleGetEstimate}
              disabled={estimating}
            >
              {estimating ? ' Generating estimate...' : ' Get AI Price Estimate'}
            </button>

            {aiEstimate && (
  <div className="estimate-result">
    <h3>Your AI Estimate</h3>
    <div className="estimate-cost">
      {typeof aiEstimate.estimatedCost === 'string'
        ? aiEstimate.estimatedCost
        : JSON.stringify(aiEstimate.estimatedCost)}
    </div>
    <div className="estimate-breakdown">
      <h4>Cost Breakdown</h4>
      {(typeof aiEstimate.breakdown === 'string'
        ? aiEstimate.breakdown
        : JSON.stringify(aiEstimate.breakdown)
      ).split('\n').map((line, i) => (
        <p key={i}>{line}</p>
      ))}
    </div>
    <div className="estimate-timeline">
      <h4>Recommended Timeline</h4>
      {(typeof aiEstimate.timeline === 'string'
        ? aiEstimate.timeline
        : JSON.stringify(aiEstimate.timeline)
      ).split('\n').map((line, i) => (
        <p key={i}>{line}</p>
      ))}
    </div>
  </div>
)}
          </div>

          <div className="form-section">
            <h2>Additional Notes</h2>
            <div className="form-group">
              <label>Anything else we should know? <span className="optional">(optional)</span></label>
              <textarea
                name="notes"
                value={formData.notes}
                onChange={handleChange}
                placeholder="Budget constraints, design preferences, existing brand guidelines..."
                rows={3}
              />
            </div>
          </div>

          <div className="form-actions">
            <button
              type="button"
              className="btn-secondary"
              onClick={() => navigate(-1)}
            >
              Cancel
            </button>
            <button type="submit" className="btn-primary" disabled={submitting}>
              {submitting ? 'Submitting...' : 'Confirm Booking'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default BookingForm;