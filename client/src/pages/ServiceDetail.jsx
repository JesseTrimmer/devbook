import { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { getServiceById } from '../services/api';
import { useAuth } from '../context/AuthContext';

function ServiceDetail() {
  const { id } = useParams();
  const { user } = useAuth();
  const [service, setService] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchService = async () => {
      try {
        const { data } = await getServiceById(id);
        setService(data);
      } catch (err) {
        setError('Service not found.');
      } finally {
        setLoading(false);
      }
    };
    fetchService();
  }, [id]);

  if (loading) return <div className="loading-page">Loading...</div>;
  if (error) return <div className="error-page">{error}</div>;
  if (!service) return null;

  return (
    <div className="service-detail-page">
      <div className="service-detail-card">
        <div className="service-detail-header">
          <span className="service-category">{service.category}</span>
          <h1>{service.title}</h1>
          <p className="service-description">{service.description}</p>
        </div>

        <div className="service-detail-body">
          <div className="service-detail-info">
            <div className="info-item">
              <span className="info-label">Starting Price</span>
              <span className="info-value price">
                ${service.startingPrice.toLocaleString()}
              </span>
            </div>
            <div className="info-item">
              <span className="info-label">Timeline</span>
              <span className="info-value">{service.duration}</span>
            </div>
          </div>

          <div className="service-features-section">
            <h2>What's Included</h2>
            <ul className="features-list">
              {service.features.map((f, i) => (
                <li key={i}>
                  <span className="check">✓</span> {f}
                </li>
              ))}
            </ul>
          </div>

          <div className="ai-promo">
            <div className="ai-promo-icon">🤖</div>
            <div>
              <h3>Get an AI Price Estimate</h3>
              <p>Answer a few questions about your project and get an instant detailed cost breakdown powered by AI.</p>
            </div>
          </div>

          <div className="service-detail-actions">
            <Link to="/services" className="btn-secondary">← Back to Services</Link>
            {user ? (
              <Link to={`/book/${service._id}`} className="btn-primary">
                Book This Service
              </Link>
            ) : (
              <Link to="/register" className="btn-primary">
                Sign Up to Book
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ServiceDetail;