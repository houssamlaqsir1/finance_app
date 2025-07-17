import React, { useState, useContext, useEffect } from 'react';
import { 
  Container, 
  Box, 
  Typography, 
  TextField, 
  Button, 
  Grid, 
  Link, 
  Paper,
  InputAdornment,
  IconButton,
  Alert,
  CircularProgress,
  useTheme,
  Card,
  CardContent
} from '@mui/material';
import { Visibility, VisibilityOff, LockOutlined, MailOutline } from '@mui/icons-material';
import { Link as RouterLink } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';

const Login = () => {
  const theme = useTheme();
  const { login, error } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formError, setFormError] = useState('');
  const [animatedItems, setAnimatedItems] = useState({
    form: false,
    title: false
  });

  // Animation on mount
  useEffect(() => {
    setTimeout(() => setAnimatedItems(prev => ({ ...prev, title: true })), 200);
    setTimeout(() => setAnimatedItems(prev => ({ ...prev, form: true })), 500);
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Form validation
    if (!formData.email || !formData.password) {
      setFormError('Please fill in all fields');
      return;
    }
    
    setLoading(true);
    
    try {
      await login(formData);
      // Successful login handled by context (redirect will happen elsewhere)
    } catch (err) {
      // Error is set in the context
      console.error('Login error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Decorative background elements */}
      <Box 
        sx={{ 
          position: 'absolute',
          top: '-20%',
          right: '-10%',
          width: '600px',
          height: '600px',
          borderRadius: '50%',
          background: `linear-gradient(135deg, ${theme.palette.primary.light}40, ${theme.palette.primary.main}30)`,
          filter: 'blur(60px)',
          zIndex: 0,
        }}
      />
      <Box 
        sx={{ 
          position: 'absolute',
          bottom: '-30%',
          left: '-10%',
          width: '500px',
          height: '500px',
          borderRadius: '50%',
          background: `linear-gradient(135deg, ${theme.palette.secondary.light}30, ${theme.palette.secondary.main}20)`,
          filter: 'blur(60px)',
          zIndex: 0,
        }}
      />
      
      {/* Animated shapes */}
      {[...Array(6)].map((_, i) => (
        <Box
          key={i}
          sx={{
            position: 'absolute',
            width: Math.random() * 200 + 50,
            height: Math.random() * 200 + 50,
            borderRadius: '50%',
            background: `rgba(${Math.random() * 220}, ${Math.random() * 220}, ${Math.random() * 255}, 0.05)`,
            backdropFilter: 'blur(8px)',
            animation: `float ${Math.random() * 10 + 20}s ease-in-out infinite`,
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            zIndex: 0,
            '@keyframes float': {
              '0%': {
                transform: 'translate(0px, 0px) rotate(0deg)',
              },
              '50%': {
                transform: 'translate(40px, -40px) rotate(180deg)',
              },
              '100%': {
                transform: 'translate(0px, 0px) rotate(360deg)',
              },
            },
            animationDelay: `${Math.random() * 5}s`
          }}
        />
      ))}

      {/* Main content */}
      <Container 
        component="main" 
        maxWidth="sm"
        sx={{ 
          zIndex: 1,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          py: 8,
        }}
      >
        {/* Back to home link */}
        <Box 
          sx={{ 
            mb: 5, 
            opacity: animatedItems.title ? 1 : 0,
            transform: animatedItems.title ? 'translateY(0)' : 'translateY(20px)',
            transition: 'all 0.6s ease',
          }}
        >
          <Button
            component={RouterLink}
            to="/"
            color="primary"
            startIcon={<Box component="span" sx={{ fontSize: '1.2rem', fontWeight: 'bold' }}>←</Box>}
            sx={{ fontWeight: 500 }}
          >
            Back to home
          </Button>
        </Box>
        
        {/* Title */}
        <Box
          sx={{
            mb: 3,
            textAlign: 'center',
            opacity: animatedItems.title ? 1 : 0,
            transform: animatedItems.title ? 'translateY(0)' : 'translateY(20px)',
            transition: 'all 0.6s ease',
          }}
        >
          <Typography
            variant="h3"
            component="h1"
            sx={{ 
              fontWeight: 700,
              mb: 1,
              background: `linear-gradient(45deg, ${theme.palette.primary.dark}, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              textAlign: 'center',
            }}
          >
            Welcome Back
          </Typography>
          <Typography variant="h6" color="text.secondary" sx={{ fontWeight: 400 }}>
            Sign in to continue to your financial dashboard
          </Typography>
        </Box>

        {/* Login form */}
        <Card 
          elevation={0} 
          sx={{
            borderRadius: 4,
            boxShadow: '0 10px 40px rgba(0, 0, 0, 0.1)',
            background: theme.palette.background.paper,
            overflow: 'visible',
            position: 'relative',
            opacity: animatedItems.form ? 1 : 0,
            transform: animatedItems.form ? 'translateY(0)' : 'translateY(30px)',
            transition: 'all 0.6s ease',
          }}
        >
          {/* Glowing effect */}
          <Box 
            sx={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              height: '6px',
              background: `linear-gradient(90deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
              borderTopLeftRadius: 16,
              borderTopRightRadius: 16,
            }}
          />
          <CardContent sx={{ px: 4, py: 5 }}>
            {(error || formError) && (
              <Alert severity="error" sx={{ mb: 3, borderRadius: 2 }}>
                {error || formError}
              </Alert>
            )}
            
            <Box component="form" onSubmit={handleSubmit} noValidate>
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
                value={formData.email}
                onChange={handleChange}
                variant="outlined"
                sx={{ 
                  mb: 3,
                  '& .MuiOutlinedInput-root': {
                    borderRadius: 2.5
                  }
                }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <MailOutline color="primary" />
                    </InputAdornment>
                  ),
                }}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type={showPassword ? 'text' : 'password'}
                id="password"
                autoComplete="current-password"
                value={formData.password}
                onChange={handleChange}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <LockOutlined color="primary" />
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={() => setShowPassword(!showPassword)}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                variant="outlined"
                sx={{ 
                  mb: 4,
                  '& .MuiOutlinedInput-root': {
                    borderRadius: 2.5
                  }
                }}
              />
              
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                disabled={loading}
                sx={{
                  py: 1.8,
                  fontSize: '1.1rem',
                  fontWeight: 'bold',
                  borderRadius: 2.5,
                  position: 'relative',
                  overflow: 'hidden',
                  '&::after': {
                    content: '""',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    background: 'rgba(255, 255, 255, 0.2)',
                    transform: 'translateX(-100%)',
                    transition: 'transform 0.6s ease',
                  },
                  '&:hover::after': {
                    transform: 'translateX(0)',
                  },
                }}
              >
                {loading ? <CircularProgress size={24} color="inherit" /> : 'Sign In'}
              </Button>
              
              <Box sx={{ mt: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Link
                  href="#"
                  variant="body2"
                  color="primary"
                  sx={{ 
                    fontWeight: 500,
                    textDecoration: 'none',
                    '&:hover': { textDecoration: 'underline' }
                  }}
                >
                  Forgot password?
                </Link>
                <Link
                  component={RouterLink}
                  to="/register"
                  variant="body2"
                  color="primary"
                  sx={{ 
                    fontWeight: 500,
                    textDecoration: 'none',
                    '&:hover': { textDecoration: 'underline' }
                  }}
                >
                  Don't have an account? Sign Up
                </Link>
              </Box>
            </Box>
          </CardContent>
        </Card>
      </Container>
    </Box>
  );
};

export default Login; 