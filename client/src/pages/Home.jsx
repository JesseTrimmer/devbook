import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function Home() {
  const { user } = useAuth();

  const services = [
    { num: '01', title: 'Landing Page', desc: 'High-converting single-page sites designed to capture leads and drive action.', price: '$500' },
    { num: '02', title: 'Business Website', desc: 'Professional multi-page sites built to establish your brand and grow your business.', price: '$1,500' },
    { num: '03', title: 'E-Commerce Store', desc: 'Full-featured online stores with payment processing and inventory management.', price: '$3,000' },
    { num: '04', title: 'Mobile Application', desc: 'Custom iOS & Android apps with polished UI and seamless user experience.', price: '$5,000' },
    { num: '05', title: 'Website Redesign', desc: 'Modernise your existing site with a fresh design and performance optimisation.', price: '$1,000' },
  ];

  return (
    <div className="home">
      <section className="hero">
        <div className="hero-orb-1"></div>
        <div className="hero-orb-2"></div>
        <div className="hero-orb-3"></div>
        <div className="hero-grid"></div>
        <div className="hero-content">
          <div className="hero-eyebrow">
            <div className="hero-eyebrow-line"></div>
            <span>Web Development Agency</span>
          </div>
          <h1>We Build Digital<br /><em>Experiences</em><br />That Convert</h1>
          <p className="hero-sub">
            From landing pages to full-scale applications — browse our services,
            get an instant AI-powered price estimate, and launch your project with confidence.
          </p>
          <div className="hero-actions">
            <Link to="/services" className="btn-primary">Browse Services</Link>
            {!user
              ? <Link to="/register" className="btn-secondary">Create Free Account</Link>
              : <Link to="/dashboard" className="btn-secondary">My Dashboard</Link>
            }
          </div>
        </div>
        <div className="hero-scroll">
          <div className="hero-scroll-line"></div>
          <span>Scroll to explore</span>
        </div>
      </section>

      <div className="home-divider">
        <div className="home-divider-line"></div>
        <span>What we build</span>
        <div className="home-divider-line"></div>
      </div>

      <section className="home-services">
        <div className="home-services-header">
          <h2>Our Services</h2>
          <p>Everything from a simple landing page to a complex custom application.</p>
        </div>
        <div className="home-services-grid">
          {services.map(s => (
            <div key={s.num} className="home-service-card">
              <div className="home-service-num">{s.num}</div>
              <h3>{s.title}</h3>
              <p>{s.desc}</p>
              <div className="home-service-price">{s.price} <span>starting</span></div>
              <div className="home-service-card-bar"></div>
            </div>
          ))}
        </div>
      </section>

      <section className="home-bottom">
        <div className="home-bottom-card">
          <h3>Instant AI Pricing</h3>
          <p>Describe your project and get a detailed cost breakdown in seconds — no waiting, no sales calls, no surprises.</p>
          <Link to="/services" className="home-cta-link">Get your estimate →</Link>
        </div>
        <div className="home-bottom-card home-bottom-card-accent">
          <h3>Ready to build something great?</h3>
          <p>Create your account, browse services, and get started today. The whole process takes under 5 minutes.</p>
          {!user
            ? <Link to="/register" className="home-cta-link">Create free account →</Link>
            : <Link to="/dashboard" className="home-cta-link">Go to dashboard →</Link>
          }
        </div>
      </section>

      <div className="home-stats">
        <div className="home-stat">
          <span className="home-stat-number">5+</span>
          <span className="home-stat-label">Service Types</span>
        </div>
        <div className="home-stat">
          <span className="home-stat-number">AI</span>
          <span className="home-stat-label">Instant Estimates</span>
        </div>
        <div className="home-stat">
          <span className="home-stat-number">24h</span>
          <span className="home-stat-label">Response Time</span>
        </div>
        <div className="home-stat">
          <span className="home-stat-number">100%</span>
          <span className="home-stat-label">Custom Built</span>
        </div>
      </div>
    </div>
  );
}

export default Home;