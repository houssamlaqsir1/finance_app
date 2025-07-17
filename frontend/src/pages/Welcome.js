import React, { useEffect, useState } from 'react';
import { 
  Box, 
  Container, 
  Typography, 
  Button, 
  Grid, 
  Paper,
  Card,
  CardContent,
  CardMedia,
  IconButton,
  useTheme,
  useMediaQuery
} from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import TimelineIcon from '@mui/icons-material/Timeline';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';

const Welcome = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [scrolled, setScrolled] = useState(false);
  const [animatedItems, setAnimatedItems] = useState({
    hero: false,
    features: false,
    cards: Array(3).fill(false)
  });

  // Handle scroll effects
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      
      // Update navbar state based on scroll position
      if (scrollPosition > 50 && !scrolled) {
        setScrolled(true);
      } else if (scrollPosition <= 50 && scrolled) {
        setScrolled(false);
      }
      
      // Simplified animation handling to prevent flickering
      setAnimatedItems({
        hero: true,
        features: scrollPosition > 300,
        cards: scrollPosition > 600 ? [true, true, true] : [false, false, false]
      });
    };

    // Set initial animation states
    setAnimatedItems({
      hero: true,
      features: false,
      cards: [false, false, false]
    });

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [scrolled]);

  // Function to smoothly scroll to features section
  const scrollToFeatures = () => {
    const featuresElement = document.getElementById('features');
    if (featuresElement) {
      featuresElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <Box sx={{ 
      minHeight: '100vh', 
      background: 'linear-gradient(135deg, rgba(248, 248, 255, 0.9) 0%, rgba(240, 248, 255, 0.9) 100%)',
      position: 'relative',
      overflow: 'hidden',
      '&::before': {
        content: '""',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: 'radial-gradient(circle at 20% 30%, rgba(138, 43, 226, 0.2) 0%, transparent 70%), radial-gradient(circle at 80% 70%, rgba(30, 144, 255, 0.2) 0%, transparent 70%)',
        opacity: 0.8,
        zIndex: 0,
        pointerEvents: 'none'
      }
    }}>
      {/* Animated background shapes */}
      <Box sx={{ 
        position: 'fixed', 
        top: 0, 
        left: 0, 
        right: 0, 
        bottom: 0, 
        zIndex: 0,
        overflow: 'hidden',
        pointerEvents: 'none',
        display: 'block', 
        opacity: 1
      }}>
        {/* Main floating circles */}
        {[...Array(6)].map((_, i) => (
          <Box
            key={i}
            sx={{
              position: 'absolute',
              width: (i % 2 === 0) ? 320 : 260,
              height: (i % 2 === 0) ? 320 : 260,
              borderRadius: '50%',
              background: i % 3 === 0 
                ? 'radial-gradient(circle, rgba(100, 149, 237, 0.15) 0%, rgba(100, 149, 237, 0.05) 70%, transparent 100%)'
                : i % 3 === 1
                  ? 'radial-gradient(circle, rgba(147, 112, 219, 0.15) 0%, rgba(147, 112, 219, 0.05) 70%, transparent 100%)'
                  : 'radial-gradient(circle, rgba(255, 105, 180, 0.15) 0%, rgba(255, 105, 180, 0.05) 70%, transparent 100%)',
              backdropFilter: 'none',
              animation: `float${i + 1} 30s ease-in-out infinite`,
              top: `${(i * 20) % 100}%`,
              left: `${(i * 25) % 100}%`,
              opacity: 0.7,
              zIndex: 0,
              pointerEvents: 'none',
              willChange: 'transform',
              '@keyframes float1': {
                '0%': { transform: 'translate(0px, 0px)' },
                '33%': { transform: 'translate(100px, 50px)' },
                '66%': { transform: 'translate(50px, 100px)' },
                '100%': { transform: 'translate(0px, 0px)' }
              },
              '@keyframes float2': {
                '0%': { transform: 'translate(0px, 0px)' },
                '33%': { transform: 'translate(-100px, -50px)' },
                '66%': { transform: 'translate(-50px, -100px)' },
                '100%': { transform: 'translate(0px, 0px)' }
              },
              '@keyframes float3': {
                '0%': { transform: 'translate(0px, 0px)' },
                '33%': { transform: 'translate(80px, -80px)' },
                '66%': { transform: 'translate(-80px, 80px)' },
                '100%': { transform: 'translate(0px, 0px)' }
              },
              '@keyframes float4': {
                '0%': { transform: 'translate(0px, 0px)' },
                '33%': { transform: 'translate(-80px, -80px)' },
                '66%': { transform: 'translate(80px, 80px)' },
                '100%': { transform: 'translate(0px, 0px)' }
              },
              '@keyframes float5': {
                '0%': { transform: 'translate(0px, 0px) rotate(0deg)' },
                '33%': { transform: 'translate(70px, -120px) rotate(10deg)' },
                '66%': { transform: 'translate(-70px, -120px) rotate(-10deg)' },
                '100%': { transform: 'translate(0px, 0px) rotate(0deg)' }
              },
              '@keyframes float6': {
                '0%': { transform: 'translate(0px, 0px) rotate(0deg)' },
                '33%': { transform: 'translate(-70px, 120px) rotate(-10deg)' },
                '66%': { transform: 'translate(70px, 120px) rotate(10deg)' },
                '100%': { transform: 'translate(0px, 0px) rotate(0deg)' }
              }
            }}
          />
        ))}
        
        {/* Additional accent elements */}
        {[...Array(5)].map((_, i) => (
          <Box
            key={`accent-${i}`}
            sx={{
              position: 'absolute',
              width: 160 - (i * 20),
              height: 160 - (i * 20),
              borderRadius: '50%',
              background: i % 5 === 0 
                ? 'radial-gradient(circle, rgba(255, 165, 0, 0.18) 0%, rgba(255, 165, 0, 0.06) 70%, transparent 100%)'
                : i % 5 === 1
                  ? 'radial-gradient(circle, rgba(75, 0, 130, 0.18) 0%, rgba(75, 0, 130, 0.06) 70%, transparent 100%)'
                  : i % 5 === 2
                    ? 'radial-gradient(circle, rgba(64, 224, 208, 0.18) 0%, rgba(64, 224, 208, 0.06) 70%, transparent 100%)'
                    : i % 5 === 3
                      ? 'radial-gradient(circle, rgba(255, 69, 0, 0.18) 0%, rgba(255, 69, 0, 0.06) 70%, transparent 100%)'
                      : 'radial-gradient(circle, rgba(50, 205, 50, 0.18) 0%, rgba(50, 205, 50, 0.06) 70%, transparent 100%)',
              animation: `accent${i + 1} 35s ease-in-out infinite`,
              top: `${15 + ((i * 22) % 80)}%`,
              right: `${5 + ((i * 18) % 80)}%`,
              opacity: 0.7,
              zIndex: 0,
              pointerEvents: 'none',
              willChange: 'transform',
              '@keyframes accent1': {
                '0%': { transform: 'translate(0px, 0px) scale(1)' },
                '33%': { transform: 'translate(-60px, 40px) scale(1.1)' },
                '66%': { transform: 'translate(60px, 40px) scale(0.9)' },
                '100%': { transform: 'translate(0px, 0px) scale(1)' }
              },
              '@keyframes accent2': {
                '0%': { transform: 'translate(0px, 0px) scale(1)' },
                '33%': { transform: 'translate(60px, -40px) scale(1.1)' },
                '66%': { transform: 'translate(-60px, -40px) scale(0.9)' },
                '100%': { transform: 'translate(0px, 0px) scale(1)' }
              },
              '@keyframes accent3': {
                '0%': { transform: 'translate(0px, 0px) scale(1) rotate(0deg)' },
                '33%': { transform: 'translate(-40px, -60px) scale(1.1) rotate(10deg)' },
                '66%': { transform: 'translate(40px, -60px) scale(0.9) rotate(-10deg)' },
                '100%': { transform: 'translate(0px, 0px) scale(1) rotate(0deg)' }
              },
              '@keyframes accent4': {
                '0%': { transform: 'translate(0px, 0px) scale(1) rotate(0deg)' },
                '33%': { transform: 'translate(40px, 60px) scale(1.1) rotate(-10deg)' },
                '66%': { transform: 'translate(-40px, 60px) scale(0.9) rotate(10deg)' },
                '100%': { transform: 'translate(0px, 0px) scale(1) rotate(0deg)' }
              },
              '@keyframes accent5': {
                '0%': { transform: 'translate(0px, 0px) scale(1)' },
                '33%': { transform: 'translate(70px, 0px) scale(1.1)' },
                '66%': { transform: 'translate(0px, 70px) scale(0.9)' },
                '100%': { transform: 'translate(0px, 0px) scale(1)' }
              }
            }}
          />
        ))}
      </Box>

      {/* Navigation header */}
      <Box 
        component="header" 
        sx={{ 
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 100,
          transition: 'all 0.3s ease',
          py: scrolled ? 1 : 2,
          backdropFilter: scrolled ? 'blur(10px)' : 'none',
          backgroundColor: scrolled ? 'rgba(255, 255, 255, 0.8)' : 'transparent',
          boxShadow: scrolled ? '0 4px 20px rgba(0, 0, 0, 0.05)' : 'none',
        }}
      >
        <Container maxWidth="lg">
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography 
              variant="h4" 
              component="div" 
              sx={{ 
                fontWeight: 'bold',
                background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                transform: scrolled ? 'scale(0.9)' : 'scale(1)',
                transition: 'transform 0.3s ease'
              }}
            >
              FinanceApp
            </Typography>
            
            <Box sx={{ display: 'flex', gap: 2 }}>
              <Button 
                component={RouterLink} 
                to="/login" 
                variant="outlined" 
                color="primary"
                sx={{
                  borderWidth: 2,
                  px: 3,
                  transition: 'all 0.3s ease',
                  transform: scrolled ? 'scale(0.95)' : 'scale(1)'
                }}
              >
                Login
              </Button>
              <Button 
                component={RouterLink} 
                to="/register" 
                variant="contained" 
                color="primary"
                sx={{
                  px: 3,
                  transition: 'all 0.3s ease',
                  transform: scrolled ? 'scale(0.95)' : 'scale(1)'
                }}
              >
                Register
              </Button>
            </Box>
          </Box>
        </Container>
      </Box>

      {/* Hero section */}
      <Box 
        sx={{ 
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          position: 'relative',
          pt: 8,
          overflow: 'hidden',
          zIndex: 2
        }}
      >
        <Container maxWidth="lg" sx={{ overflow: 'hidden', position: 'relative', zIndex: 5 }}>
          <Grid container spacing={4} alignItems="center" sx={{ overflow: 'hidden', position: 'relative', zIndex: 5 }}>
            <Grid item xs={12} md={6}>
              <Box 
                sx={{
                  textAlign: { xs: 'center', md: 'left' },
                  position: 'relative',
                  zIndex: 5
                }}
              >
                <Typography 
                  variant="h1" 
                  component="h1" 
                  sx={{ 
                    fontSize: { xs: '2.5rem', md: '3.5rem' },
                    mb: 2,
                    fontWeight: 800,
                    background: `linear-gradient(45deg, ${theme.palette.primary.dark}, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                  }}
                >
                  Your Financial Future, Reimagined
                </Typography>
                
                <Typography 
                  variant="h5" 
                  color="text.secondary" 
                  sx={{ 
                    mb: 4,
                    opacity: 0.9,
                    maxWidth: { xs: '100%', md: '80%' }
                  }}
                >
                  Take control of your finances with our AI-powered platform that helps you track, manage, and grow your wealth.
                </Typography>
                
                <Box sx={{ mt: 4, display: 'flex', gap: 2, justifyContent: { xs: 'center', md: 'flex-start' } }}>
                  <Button 
                    variant="contained" 
                    color="primary" 
                    size="large"
                    component={RouterLink}
                    to="/register"
                    disableRipple={false}
                    sx={{
                      px: 4,
                      py: 1.5,
                      fontSize: '1.1rem',
                      position: 'relative',
                      zIndex: 20,
                      width: 'fit-content',
                      border: 'none',
                      backgroundColor: theme.palette.primary.main,
                      '&:hover': {
                        backgroundColor: theme.palette.primary.dark,
                      }
                    }}
                  >
                    Get Started
                  </Button>
                  
                  <Button 
                    variant="outlined" 
                    color="primary" 
                    size="large"
                    onClick={scrollToFeatures}
                    sx={{
                      px: 4,
                      py: 1.5,
                      fontSize: '1.1rem',
                      borderWidth: 2,
                    }}
                  >
                    Learn More
                  </Button>
                </Box>
              </Box>
            </Grid>
            
            <Grid item xs={12} md={6} sx={{ overflow: 'hidden' }}>
              <Box 
                sx={{ 
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  position: 'static',
                  overflow: 'hidden'
                }}
              >
                
                {/* Removing decorative elements that could cause flickering */}
              </Box>
            </Grid>
          </Grid>
        </Container>
        
        {/* Subtle scroll indicator */}
        <Box 
          sx={{ 
            position: 'absolute', 
            bottom: 40, 
            left: '50%', 
            transform: 'translateX(-50%)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            opacity: scrolled ? 0 : 0.8,
            transition: 'opacity 0.5s ease',
            zIndex: 5
          }}
        >
          <Typography variant="body2" sx={{ mb: 1, color: theme.palette.text.secondary }}>
            Scroll to explore
          </Typography>
          <IconButton 
            color="primary" 
            size="small" 
            onClick={scrollToFeatures}
            sx={{ 
              animation: 'gentlePulse 2.5s ease-in-out infinite',
              '@keyframes gentlePulse': {
                '0%': { transform: 'translateY(0)' },
                '50%': { transform: 'translateY(6px)' },
                '100%': { transform: 'translateY(0)' },
              }
            }}
          >
            <KeyboardArrowDownIcon />
          </IconButton>
        </Box>
      </Box>

      {/* Features section */}
      <Box 
        id="features"
        sx={{ 
          py: 10,
          position: 'relative',
        }}
      >
        <Container maxWidth="lg">
          <Box 
            sx={{ 
              mb: 8, 
              textAlign: 'center',
              transform: animatedItems.features ? 'translateY(0)' : 'translateY(40px)',
              opacity: animatedItems.features ? 1 : 0,
              transition: 'all 0.8s ease',
            }}
          >
            <Typography
              variant="h2"
              component="h2"
              sx={{ 
                mb: 2,
                fontWeight: 700,
                background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              Why Choose FinanceApp?
            </Typography>
            <Typography 
              variant="h5" 
              color="text.secondary"
              sx={{ 
                maxWidth: '800px',
                mx: 'auto',
                opacity: 0.8
              }}
            >
              Experience the next generation of personal finance management with our cutting-edge features
            </Typography>
          </Box>
          
          <Grid container spacing={4}>
            {[
              {
                title: 'Smart Wallet',
                description: 'Connect all your accounts in one place for a comprehensive view of your finances',
                icon: <AccountBalanceWalletIcon sx={{ fontSize: '3rem' }} />,
                color: theme.palette.primary.main
              },
              {
                title: 'Investment Insights',
                description: 'Get personalized investment recommendations based on your financial goals',
                icon: <TrendingUpIcon sx={{ fontSize: '3rem' }} />,
                color: theme.palette.secondary.main
              },
              {
                title: 'Expense Analysis',
                description: 'Track your spending patterns with AI-powered categorization and visualization',
                icon: <TimelineIcon sx={{ fontSize: '3rem' }} />,
                color: theme.palette.success.main
              },
              {
                title: 'Smart Alerts',
                description: 'Receive timely notifications about unusual activity and financial opportunities',
                icon: <NotificationsActiveIcon sx={{ fontSize: '3rem' }} />,
                color: theme.palette.warning.main
              }
            ].map((feature, index) => (
              <Grid item xs={12} sm={6} md={3} key={index}>
                <Card
                  sx={{
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    textAlign: 'center',
                    p: 3,
                    background: theme.palette.background.paper,
                    transform: animatedItems.cards[index % 3] ? 'translateY(0)' : 'translateY(40px)',
                    opacity: animatedItems.cards[index % 3] ? 1 : 0,
                    transition: 'all 0.8s ease',
                    transitionDelay: `${index * 0.1}s`,
                    '&:hover': {
                      transform: 'translateY(-10px)',
                    }
                  }}
                >
                  <Box 
                    sx={{ 
                      mb: 2,
                      p: 2,
                      borderRadius: '50%',
                      backgroundColor: `${feature.color}15`,
                      color: feature.color
                    }}
                  >
                    {feature.icon}
                  </Box>
                  <Typography variant="h5" component="h3" fontWeight={600} mb={2}>
                    {feature.title}
                  </Typography>
                  <Typography color="text.secondary" variant="body1">
                    {feature.description}
                  </Typography>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* CTA section */}
      <Box sx={{ py: 12, position: 'relative' }}>
        <Container maxWidth="md">
          <Paper
            sx={{
              borderRadius: 4,
              py: 6,
              px: { xs: 4, md: 8 },
              textAlign: 'center',
              background: `linear-gradient(135deg, ${theme.palette.primary.dark}CC, ${theme.palette.primary.main}CC, ${theme.palette.secondary.main}CC)`,
              position: 'relative',
              overflow: 'hidden',
              color: '#fff',
            }}
          >
            {/* Abstract shapes */}
            {[...Array(5)].map((_, i) => (
              <Box
                key={i}
                sx={{
                  position: 'absolute',
                  width: Math.random() * 200 + 50,
                  height: Math.random() * 200 + 50,
                  borderRadius: '50%',
                  background: 'rgba(255, 255, 255, 0.1)',
                  top: `${Math.random() * 100}%`,
                  left: `${Math.random() * 100}%`,
                  zIndex: 0,
                }}
              />
            ))}
            
            <Box sx={{ position: 'relative', zIndex: 1 }}>
              <Typography variant="h3" component="h2" fontWeight={700} mb={2}>
                Ready to Transform Your Finances?
              </Typography>
              <Typography variant="h6" mb={4} sx={{ opacity: 0.9 }}>
                Join thousands of users who are taking control of their financial future
              </Typography>
              <Button 
                variant="contained" 
                color="secondary" 
                size="large"
                component={RouterLink}
                to="/register"
                sx={{ 
                  px: 5, 
                  py: 1.5, 
                  fontSize: '1.1rem',
                  backgroundColor: '#fff',
                  color: theme.palette.primary.main,
                  position: 'relative',
                  zIndex: 2,
                  '&:hover': {
                    backgroundColor: 'rgba(255, 255, 255, 0.9)',
                  }
                }}
              >
                Create Free Account
              </Button>
            </Box>
          </Paper>
        </Container>
      </Box>

      {/* Footer */}
      <Box 
        component="footer" 
        sx={{ 
          py: 4, 
          backgroundColor: 'rgba(255, 255, 255, 0.6)',
          backdropFilter: 'blur(10px)',
          borderTop: '1px solid rgba(0, 0, 0, 0.05)'
        }}
      >
        <Container maxWidth="lg">
          <Grid container spacing={2} justifyContent="space-between" alignItems="center">
            <Grid item>
              <Typography 
                variant="h6" 
                sx={{ 
                  fontWeight: 'bold',
                  background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                FinanceApp
              </Typography>
            </Grid>
            <Grid item>
              <Typography variant="body2" color="text.secondary">
                © {new Date().getFullYear()} FinanceApp. All rights reserved.
              </Typography>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </Box>
  );
};

export default Welcome; 