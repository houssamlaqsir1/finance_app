import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

// Create context
export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Check if user is logged in on app load
  useEffect(() => {
    const checkLoggedIn = async () => {
      try {
        const token = localStorage.getItem('token');
        
        if (token) {
          // Set default header for all axios requests
          axios.defaults.headers.common['x-auth-token'] = token;
          
          // Verify token is valid
          const res = await axios.get('http://localhost:5000/api/user');
          
          setCurrentUser(res.data);
          setIsAuthenticated(true);
        }
      } catch (err) {
        // Token is invalid or expired
        localStorage.removeItem('token');
        delete axios.defaults.headers.common['x-auth-token'];
      } finally {
        setLoading(false);
      }
    };
    
    checkLoggedIn();
  }, []);

  // Register user
  const register = async (userData) => {
    setError(null);
    try {
      const res = await axios.post('http://localhost:5000/api/auth/register', userData, {
        timeout: 3000 // 3 second timeout
      });
      
      // Save token to localStorage and set auth header
      localStorage.setItem('token', res.data.token);
      axios.defaults.headers.common['x-auth-token'] = res.data.token;
      
      setCurrentUser(res.data.user);
      setIsAuthenticated(true);
      
      return res.data;
    } catch (err) {
      if (err.code === 'ECONNABORTED') {
        setError('Server connection timeout. Please check if the server is running.');
      } else if (err.code === 'ERR_NETWORK') {
        setError('Cannot connect to server. Please check if the server is running.');
      } else {
        setError(
          err.response && err.response.data.message
            ? err.response.data.message
            : 'Registration failed. Please try again.'
        );
      }
      throw err;
    }
  };

  // Login user
  const login = async (userData) => {
    setError(null);
    try {
      const res = await axios.post('http://localhost:5000/api/auth/login', userData, {
        timeout: 3000 // 3 second timeout
      });
      
      // Save token to localStorage and set auth header
      localStorage.setItem('token', res.data.token);
      axios.defaults.headers.common['x-auth-token'] = res.data.token;
      
      setCurrentUser(res.data.user);
      setIsAuthenticated(true);
      
      return res.data;
    } catch (err) {
      if (err.code === 'ECONNABORTED') {
        setError('Server connection timeout. Please check if the server is running.');
      } else if (err.code === 'ERR_NETWORK') {
        setError('Cannot connect to server. Please check if the server is running.');
      } else {
        setError(
          err.response && err.response.data.message
            ? err.response.data.message
            : 'Login failed. Please check your credentials.'
        );
      }
      throw err;
    }
  };

  // Logout user
  const logout = () => {
    localStorage.removeItem('token');
    delete axios.defaults.headers.common['x-auth-token'];
    setCurrentUser(null);
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        isAuthenticated,
        loading,
        error,
        register,
        login,
        logout
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider; 