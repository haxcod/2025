import { Navigate } from 'react-router-dom';
import useUserData from './hooks/UserData'; // Your custom hook to check login status

const ProtectedRoute = ({ children }) => {
  const { isLoggedIn } = useUserData();

  if (!isLoggedIn) {
    return <Navigate to="/login" />;
  }

  return children;
};

export default ProtectedRoute;
