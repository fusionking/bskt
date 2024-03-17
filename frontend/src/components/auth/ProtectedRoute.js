import { Navigate } from 'react-router-dom';
import StorageService from '../../services/StorageService';
import PropTypes from 'prop-types';

export const ProtectedRoute = ({ children }) => {
  const user = StorageService.getToken('basket_token');
  if (!user) {
    // user is not authenticated
    return <Navigate to="/signin" />;
  }
  return children;
};

ProtectedRoute.propTypes = {
  children: PropTypes.any
};
