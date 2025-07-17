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
      
      // Trigger animations based on scroll position
      const newAnimatedItems = { ...animatedItems };
      
      if (scrollPosition > 100) {
        newAnimatedItems.hero = true;
      }
      
      if (scrollPosition > 300) {
        newAnimatedItems.features = true;
      }
      
      // Trigger card animations sequentially
      if (scrollPosition > 600) {
        setTimeout(() => {
          const newCards = [...newAnimatedItems.cards];
          newCards[0] = true;
          setAnimatedItems(prev => ({ ...prev, cards: newCards }));
        }, 0);
        
        setTimeout(() => {
          const newCards = [...newAnimatedItems.cards];
          newCards[1] = true;
          setAnimatedItems(prev => ({ ...prev, cards: newCards }));
        }, 200);
        
        setTimeout(() => {
          const newCards = [...newAnimatedItems.cards];
          newCards[2] = true;
          setAnimatedItems(prev => ({ ...prev, cards: newCards }));
        }, 400);
      }
      
      setAnimatedItems(newAnimatedItems);
    };

    // Set initial animation states after component mounts
    setTimeout(() => {
      setAnimatedItems(prev => ({ ...prev, hero: true }));
    }, 300);

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [scrolled, animatedItems.cards]);

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
      background: `linear-gradient(135deg, ${theme.palette.background.default} 0%, ${theme.palette.background.paper} 100%)`,
      overflow: 'hidden'
    }}>
      {/* Animated floating shapes background */}
      <Box sx={{ 
        position: 'absolute', 
        top: 0, 
        left: 0, 
        right: 0, 
        bottom: 0, 
        zIndex: 0,
        overflow: 'hidden',
        pointerEvents: 'none'
      }}>
        {[...Array(6)].map((_, i) => (
          <Box
            key={i}
            sx={{
              position: 'absolute',
              width: Math.random() * 100 + 50,
              height: Math.random() * 100 + 50,
              borderRadius: '50%',
              background: `rgba(${Math.random() * 100 + 155}, ${Math.random() * 100 + 155}, ${Math.random() * 255}, 0.1)`,
              backdropFilter: 'blur(8px)',
              animation: `float ${Math.random() * 10 + 15}s ease-in-out infinite`,
              top: `${Math.random() * 80}%`,
              left: `${Math.random() * 80}%`,
              transform: `scale(${Math.random() * 1 + 0.5})`,
              '@keyframes float': {
                '0%': {
                  transform: 'translate(0px, 0px) rotate(0deg) scale(1)',
                },
                '50%': {
                  transform: 'translate(40px, -40px) rotate(180deg) scale(1.1)',
                },
                '100%': {
                  transform: 'translate(0px, 0px) rotate(360deg) scale(1)',
                },
              },
              animationDelay: `${Math.random() * 5}s`
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
          pt: 8
        }}
      >
        <Container maxWidth="lg">
          <Grid container spacing={4} alignItems="center">
            <Grid item xs={12} md={6}>
              <Box 
                sx={{
                  transform: animatedItems.hero ? 'translateY(0)' : 'translateY(40px)',
                  opacity: animatedItems.hero ? 1 : 0,
                  transition: 'all 0.8s ease',
                  textAlign: { xs: 'center', md: 'left' }
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
                    sx={{
                      px: 4,
                      py: 1.5,
                      fontSize: '1.1rem',
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
            
            <Grid item xs={12} md={6}>
              <Box 
                sx={{ 
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  position: 'relative',
                  transform: animatedItems.hero ? 'translateY(0) rotate(0deg)' : 'translateY(40px) rotate(3deg)',
                  opacity: animatedItems.hero ? 1 : 0,
                  transition: 'all 1s ease',
                  transitionDelay: '0.2s',
                }}
              >
                {/* Mobile device mockup with app UI */}
                <Box
                  sx={{
                    width: { xs: '80%', md: '90%' },
                    maxWidth: '400px',
                    height: 'auto',
                    borderRadius: 4,
                    overflow: 'hidden',
                    boxShadow: '0 20px 40px rgba(0, 0, 0, 0.2)',
                    transform: 'perspective(1000px) rotateY(-10deg) rotateX(5deg)',
                    position: 'relative',
                    zIndex: 2,
                    '&::before': {
                      content: '""',
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      right: 0,
                      height: '28px',
                      borderTopLeftRadius: 4,
                      borderTopRightRadius: 4,
                      backgroundColor: '#222',
                      zIndex: 3
                    }
                  }}
                >
                  <Box
                    component="img"
                    src="/dashboard-mockup.png"
                    alt="Finance App Dashboard"
                    onError={(e) => {
                      e.target.src = 'https://via.placeholder.com/400x800/3a86ff/FFFFFF?text=Finance+App+Dashboard';
                    }}
                    sx={{
                      width: '100%',
                      height: 'auto',
                      display: 'block',
                      objectFit: 'cover',
                    }}
                  />
                </Box>
                
                {/* Decorative elements */}
                <Box
                  sx={{
                    position: 'absolute',
                    width: '200px',
                    height: '200px',
                    borderRadius: '50%',
                    background: 'linear-gradient(135deg, rgba(58, 134, 255, 0.2), rgba(255, 0, 110, 0.2))',
                    filter: 'blur(30px)',
                    top: '-20px',
                    right: '10%',
                    zIndex: 1
                  }}
                />
                <Box
                  sx={{
                    position: 'absolute',
                    width: '150px',
                    height: '150px',
                    borderRadius: '50%',
                    background: 'linear-gradient(135deg, rgba(255, 0, 110, 0.2), rgba(255, 190, 11, 0.2))',
                    filter: 'blur(30px)',
                    bottom: '10%',
                    left: '5%',
                    zIndex: 1
                  }}
                />
              </Box>
            </Grid>
          </Grid>
        </Container>
        
        {/* Scroll indicator */}
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
            transition: 'opacity 0.3s ease',
            animation: 'bounce 2s infinite',
            '@keyframes bounce': {
              '0%, 20%, 50%, 80%, 100%': {
                transform: 'translateY(0) translateX(-50%)',
              },
              '40%': {
                transform: 'translateY(-20px) translateX(-50%)',
              },
              '60%': {
                transform: 'translateY(-10px) translateX(-50%)',
              },
            },
          }}
        >
          <Typography variant="body2" sx={{ mb: 1, color: theme.palette.text.secondary }}>
            Scroll to explore
          </Typography>
          <IconButton 
            color="primary" 
            size="small" 
            sx={{ animation: 'pulse 2s infinite', }}
            onClick={scrollToFeatures}
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