import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getServices } from '../services/api';

function Services() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [filter, setFilter] = useState('All');

  const categories = [
    'All',
    'Website Design & Development',
    'Mobile App Development',
    'E-Commerce Store',
    'Landing Page',
    'Website Redesign & Maintenance'
  ];

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const { data } = await getServices();
        setServices(data);
      } catch (err) {
        setError('Failed to load services. Please try again.');
      } finally {
        setLoading(false);
      }
    };
    fetchServices();
  }, []);

  const filtered = filter === 'All'
    ? services
    : services.filter(s => s.category === filter);

  if (loading) return <div className="loading-page">Loading services...</div>;
  if (error) return <div className="error-page">{error}</div>;

  return (
    <div className="services-page">
      <div className="page-header">
        <h1>Our Services</h1>
        <p>Professional web and app development tailored to your needs</p>
      </div>

      <div className="filter-bar">
        {categories.map(cat => (
          <button
            key={cat}
            className={`filter-btn ${filter === cat ? 'active' : ''}`}
            onClick={() => setFilter(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="services-grid">
        {filtered.map(service => (
          <div key={service._id} className="service-card">
            <div className="service-category">{service.category}</div>
            <h2>{service.title}</h2>
            <p className="service-description">{service.description}</p>
            <div className="service-meta">
              <span className="service-price">
                From ${service.startingPrice.toLocaleString()}
              </span>
              <span className="service-duration">⏱ {service.duration}</span>
            </div>
            <ul className="service-features">
              {service.features.map((f, i) => (
                <li key={i}>✓ {f}</li>
              ))}
            </ul>
            <div className="service-actions">
              <Link to={`/services/${service._id}`} className="btn-secondary">
                Learn More
              </Link>
              <Link to={`/book/${service._id}`} className="btn-primary">
                Book Now
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Services;