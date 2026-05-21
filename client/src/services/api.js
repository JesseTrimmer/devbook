import axios from 'axios';

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

API.interceptors.request.use((req) => {
  const user = localStorage.getItem('user');
  if (user) {
    req.headers.Authorization = `Bearer ${JSON.parse(user).token}`;
  }
  return req;
});

export const register = (data) => API.post('/api/auth/register', data);
export const login = (data) => API.post('/api/auth/login', data);
export const getMe = () => API.get('/api/auth/me');

export const getServices = () => API.get('/api/services');
export const getServiceById = (id) => API.get(`/api/services/${id}`);

export const createBooking = (data) => API.post('/api/bookings', data);
export const getMyBookings = () => API.get('/api/bookings/my');
export const getBookingById = (id) => API.get(`/api/bookings/${id}`);
export const cancelBooking = (id) => API.put(`/api/bookings/${id}/cancel`);
export const getAllBookings = () => API.get('/api/bookings/all');
export const updateBookingStatus = (id, status) => API.put(`/api/bookings/${id}/status`, { status });

export const getAIEstimate = (data) => API.post('/api/estimate', data);
export const scheduleMeeting = (id, data) => API.put(`/api/bookings/${id}/meeting`, data);
export default API;