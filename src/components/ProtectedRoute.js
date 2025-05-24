import { Navigate } from 'react-router-dom';

export default function ProtectedRoute({ children }) {
  const isLoggedIn = true; // später aus Redux-State
  return isLoggedIn ? children : <Navigate to="/login" />;
}
