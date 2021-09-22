import { useRouter } from 'next/router';
import { createContext, useEffect, useState } from 'react';

import { API_URL } from '@config/index';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState({ name: 'Cindy' });
  const [error, setError] = useState(null);

  // Register user
  const register = async (user) => {
    console.log(user);
  };

  // Login user
  const login = async ({ email: identifier, password }) => {
    console.log({ identifier, password });
  };

  // Logout user
  const logout = async () => {
    console.log('Logout');
  };

  // Check if user is logged in
  const checkUserLoggedIn = async () => {
    console.log('Check');
  };

  return (
    <AuthContext.Provider value={{ user, error, register, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
