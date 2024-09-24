import { Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';  // Assuming you create a useAuth hook to track user authentication status

const PrivateRoute = ({ element: Element, ...rest }) => {
  const { currentUser } = useAuth();

  return currentUser ? <Element {...rest} /> : <Navigate to="/login" />;
};

export default PrivateRoute;
