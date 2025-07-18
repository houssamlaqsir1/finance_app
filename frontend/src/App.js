import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import { Alert, Snackbar } from '@mui/material';
import axios from 'axios';
import './App.css';

// Context
import AuthProvider, { AuthContext } from './contexts/AuthContext';

// Pages
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './components/Dashboard';
import Welcome from './pages/Welcome';
import Accounts from './pages/Accounts';
import Transactions from './pages/Transactions';
import Investments from './pages/Investments';
import Analytics from './pages/Analytics';

// Protected route component
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading } = React.useContext(AuthContext);
  
  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "100vh"
        }}
      >
        <CircularProgress />
      </Box>
    );
  }
  
  return isAuthenticated ? children : <Navigate to="/login" />;
};

// Guest route component (only accessible when not logged in)
const GuestRoute = ({ children }) => {
  const { isAuthenticated, loading } = React.useContext(AuthContext);
  
  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "100vh"
        }}
      >
        <CircularProgress />
      </Box>
    );
  }
  
  return !isAuthenticated ? children : <Navigate to="/dashboard" />;
};

// Create theme
const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#3a86ff',
      light: '#8fb8ff',
      dark: '#0057cb',
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#ff006e',
      light: '#ff5b9e',
      dark: '#c50057',
      contrastText: '#ffffff',
    },
    background: {
      default: '#f8f9fd',
      paper: '#ffffff',
    },
    success: {
      main: '#38b000',
    },
    info: {
      main: '#3a86ff',
    },
    warning: {
      main: '#ffbe0b',
    },
    error: {
      main: '#ff006e',
    },
  },
  typography: {
    fontFamily: [
      'Inter',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
    ].join(','),
    h1: {
      fontWeight: 700,
    },
    h2: {
      fontWeight: 700,
    },
    h3: {
      fontWeight: 600,
    },
    h4: {
      fontWeight: 600,
    },
    h5: {
      fontWeight: 500,
    },
    h6: {
      fontWeight: 500,
    },
    button: {
      fontWeight: 600,
    },
  },
  shape: {
    borderRadius: 12,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          textTransform: 'none',
          fontWeight: 600,
          boxShadow: 'none',
          '&:hover': {
            boxShadow: '0 4px 12px rgba(58, 134, 255, 0.2)',
          },
        },
        containedPrimary: {
          background: 'linear-gradient(45deg, #3a86ff 30%, #8fb8ff 90%)',
          '&:hover': {
            background: 'linear-gradient(45deg, #0057cb 30%, #3a86ff 90%)',
          },
        },
        containedSecondary: {
          background: 'linear-gradient(45deg, #ff006e 30%, #ff5b9e 90%)',
          '&:hover': {
            background: 'linear-gradient(45deg, #c50057 30%, #ff006e 90%)',
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          boxShadow: '0 8px 20px rgba(0, 0, 0, 0.06)',
          transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
          '&:hover': {
            boxShadow: '0 12px 28px rgba(0, 0, 0, 0.1)',
            transform: 'translateY(-4px)',
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 16,
          overflow: 'hidden',
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: 12,
          },
        },
      },
    },
  },
});

function App() {
  const [serverStatus, setServerStatus] = useState({ online: false, checked: false });
  const [showServerAlert, setShowServerAlert] = useState(false);

  // Check if the backend server is running
  useEffect(() => {
    const checkServer = async () => {
      try {
        await axios.get('http://localhost:5000/api/user', { timeout: 2000 });
        setServerStatus({ online: true, checked: true });
      } catch (err) {
        // Only show alert if the error is network related, not auth related
        if (err.code === 'ERR_NETWORK' || err.code === 'ECONNABORTED') {
          setServerStatus({ online: false, checked: true });
          setShowServerAlert(true);
        } else {
          // If we get an auth error, the server is running
          setServerStatus({ online: true, checked: true });
        }
      }
    };

    checkServer();

    // Periodically check server status
    const intervalId = setInterval(checkServer, 30000);

    return () => clearInterval(intervalId);
  }, []);

  const handleCloseAlert = () => {
    setShowServerAlert(false);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AuthProvider>
        {/* Server offline alert */}
        <Snackbar 
          open={showServerAlert && !serverStatus.online} 
          anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
          autoHideDuration={null}
        >
          <Alert severity="error" variant="filled" onClose={handleCloseAlert}>
            Backend server is not running. Sign up and login features will not work.
          </Alert>
        </Snackbar>
        
        <Router>
          <Routes>
            {/* Welcome Page */}
            <Route path="/" element={<Welcome />} />
            
            {/* Auth Routes */}
            <Route 
              path="/login" 
              element={
                <GuestRoute>
                  <Login />
                </GuestRoute>
              } 
            />
            <Route 
              path="/register" 
              element={
                <GuestRoute>
                  <Register />
                </GuestRoute>
              }
            />
            
            {/* Protected Routes */}
            <Route 
              path="/dashboard" 
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/accounts" 
              element={
                <ProtectedRoute>
                  <Accounts />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/transactions" 
              element={
                <ProtectedRoute>
                  <Transactions />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/investments" 
              element={
                <ProtectedRoute>
                  <Investments />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/analytics" 
              element={
                <ProtectedRoute>
                  <Analytics />
                </ProtectedRoute>
              } 
            />
          </Routes>
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
