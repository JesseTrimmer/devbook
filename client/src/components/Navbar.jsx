import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="navbar">
      <div className="nav-brand">
        <Link to="/">Dev<span>Book</span></Link>
      </div>
      <div className="nav-links">
        <Link to="/services">Services</Link>
       {user ? (
  <>
    {user.role !== 'admin' && <Link to="/dashboard">Dashboard</Link>}
    {user.role === 'admin' && <Link to="/admin">Admin</Link>}
    <span className="nav-user">Hi, {user?.name?.split(' ')[0]}</span>
    <button onClick={handleLogout} className="btn-logout">Logout</button>
  </>
) : (
  <>
    <Link to="/login">Login</Link>
    <Link to="/register" className="btn-primary">Get Started</Link>
  </>
)}
      </div>
    </nav>
  );
}

export default Navbar;