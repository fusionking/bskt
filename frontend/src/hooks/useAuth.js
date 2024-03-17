import { createContext, useContext, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLocalStorage } from './useLocalStorage';
import StorageService from '../services/StorageService';

const AuthContext = createContext(undefined);

export const AuthProvider = ({ children }) => {
  const user = StorageService.getToken('basket_token');
  const navigate = useNavigate();

  const value = useMemo(
    () => ({
      user
    }),
    [user]
  );
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  return useContext(AuthContext);
};
