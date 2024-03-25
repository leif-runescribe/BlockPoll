//use this for more secure access

import { useEffect } from 'react';

const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('jwtToken');
    setIsAuthenticated(!!token);
  }, []);

  return isAuthenticated;
};


const ProtectedRoute = ({ children }) => {
  const isAuthenticated = useAuth();

  return isAuthenticated ? children : <Redirect to="/login" />;
};
