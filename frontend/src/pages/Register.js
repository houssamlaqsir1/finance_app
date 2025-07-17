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
  CardContent,
  Divider
} from '@mui/material';
import { Visibility, VisibilityOff, LockOutlined, MailOutline, PersonOutline, BadgeOutlined } from '@mui/icons-material';
import { Link as RouterLink } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';

const Register = () => {
  const theme = useTheme();
  const { register: registerUser, error } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: ''
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

  const validateForm = () => {
    // Reset form error
    setFormError('');

    // Check if all fields are filled
    if (!formData.firstName || !formData.lastName || !formData.email || !formData.password || !formData.confirmPassword) {
      setFormError('Please fill in all fields');
      return false;
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setFormError('Please enter a valid email address');
      return false;
    }

    // Check if passwords match
    if (formData.password !== formData.confirmPassword) {
      setFormError('Passwords do not match');
      return false;
    }

    // Check password strength (at least 8 characters, including number and special character)
    const passwordRegex = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,}$/;
    if (!passwordRegex.test(formData.password)) {
      setFormError('Password must be at least 8 characters long and contain at least one number and one special character');
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate form
    if (!validateForm()) {
      return;
    }
    
    setLoading(true);
    
    try {
      // Remove confirmPassword before sending to API
      const { confirmPassword, ...userData } = formData;
      
      await registerUser(userData);
      // Successful registration handled by context (redirect will happen elsewhere)
    } catch (err) {
      // If there's a network error or the server is down, show a more specific message
      if (err.code === 'ERR_NETWORK' || err.code === 'ECONNABORTED') {
        setFormError('Cannot connect to the server. Please try again later or contact support.');
      }
      // Error is set in the context
      console.error('Registration error:', err);
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
          top: '-10%',
          left: '-5%',
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
          bottom: '-20%',
          right: '-5%',
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
              background: `linear-gradient(45deg, ${theme.palette.secondary.dark}, ${theme.palette.secondary.main}, ${theme.palette.primary.main})`,
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              textAlign: 'center',
            }}
          >
            Create Account
          </Typography>
          <Typography variant="h6" color="text.secondary" sx={{ fontWeight: 400 }}>
            Join us to start managing your finances smarter
          </Typography>
        </Box>

        {/* Register form */}
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
              background: `linear-gradient(90deg, ${theme.palette.secondary.main}, ${theme.palette.primary.main})`,
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
              <Grid container spacing={2} sx={{ mb: 2 }}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    autoComplete="given-name"
                    name="firstName"
                    required
                    fullWidth
                    id="firstName"
                    label="First Name"
                    autoFocus
                    value={formData.firstName}
                    onChange={handleChange}
                    variant="outlined"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <PersonOutline color="primary" />
                        </InputAdornment>
                      ),
                    }}
                    sx={{ 
                      '& .MuiOutlinedInput-root': {
                        borderRadius: 2.5
                      }
                    }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    fullWidth
                    id="lastName"
                    label="Last Name"
                    name="lastName"
                    autoComplete="family-name"
                    value={formData.lastName}
                    onChange={handleChange}
                    variant="outlined"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <BadgeOutlined color="primary" />
                        </InputAdornment>
                      ),
                    }}
                    sx={{ 
                      '& .MuiOutlinedInput-root': {
                        borderRadius: 2.5
                      }
                    }}
                  />
                </Grid>
              </Grid>
              
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
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
                autoComplete="new-password"
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
                  mb: 3,
                  '& .MuiOutlinedInput-root': {
                    borderRadius: 2.5
                  }
                }}
              />
              
              <TextField
                margin="normal"
                required
                fullWidth
                name="confirmPassword"
                label="Confirm Password"
                type={showPassword ? 'text' : 'password'}
                id="confirmPassword"
                value={formData.confirmPassword}
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
              
              <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 3 }}>
                Password must be at least 8 characters long and contain at least one number and one special character.
              </Typography>
              
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="secondary"
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
                {loading ? <CircularProgress size={24} color="inherit" /> : 'Create Account'}
              </Button>
              
              <Box sx={{ mt: 3, textAlign: 'center' }}>
                <Link
                  component={RouterLink}
                  to="/login"
                  variant="body2"
                  color="primary"
                  sx={{ 
                    fontWeight: 500,
                    textDecoration: 'none',
                    '&:hover': { textDecoration: 'underline' }
                  }}
                >
                  Already have an account? Sign In
                </Link>
              </Box>
              
              <Divider sx={{ mt: 4, mb: 3 }}>
                <Typography variant="body2" color="text.secondary">
                  Or sign up with
                </Typography>
              </Divider>
              
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <Button
                    fullWidth
                    variant="outlined"
                    sx={{ 
                      py: 1.2, 
                      borderRadius: 2.5,
                      color: 'text.primary',
                      borderColor: 'divider',
                      '&:hover': { borderColor: 'primary.main', backgroundColor: 'rgba(58, 134, 255, 0.04)' }
                    }}
                  >
                    Google
                  </Button>
                </Grid>
                <Grid item xs={6}>
                  <Button
                    fullWidth
                    variant="outlined"
                    sx={{ 
                      py: 1.2, 
                      borderRadius: 2.5,
                      color: 'text.primary',
                      borderColor: 'divider',
                      '&:hover': { borderColor: 'primary.main', backgroundColor: 'rgba(58, 134, 255, 0.04)' }
                    }}
                  >
                    Apple
                  </Button>
                </Grid>
              </Grid>
            </Box>
          </CardContent>
        </Card>
      </Container>
    </Box>
  );
};

export default Register; 