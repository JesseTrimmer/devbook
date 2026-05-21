import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';

import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Services from './pages/Services';
import ServiceDetail from './pages/ServiceDetail';
import BookingForm from './pages/BookingForm';
import Dashboard from './pages/Dashboard';
import AdminDashboard from './pages/AdminDashboard';

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();
  if (loading) return <div className="loading">Loading...</div>;
  return user ? children : <Navigate to="/login" />;
};

const AdminRoute = ({ children }) => {
  const { user, loading } = useAuth();
  if (loading) return <div className="loading">Loading...</div>;
  return user && user.role === 'admin' ? children : <Navigate to="/dashboard" />;
};

function AppRoutes() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/services" element={<Services />} />
        <Route path="/services/:id" element={<ServiceDetail />} />
        <Route path="/book/:id" element={
          <ProtectedRoute><BookingForm /></ProtectedRoute>
        } />
        <Route path="/dashboard" element={
          <ProtectedRoute><Dashboard /></ProtectedRoute>
        } />
        <Route path="/admin" element={
          <AdminRoute><AdminDashboard /></AdminRoute>
        } />
      </Routes>
    </>
  );
}

function App() {
  return (
    <Router>
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </Router>
  );
}

export default App;