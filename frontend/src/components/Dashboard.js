import React, { useContext } from 'react';
import { 
  Box, 
  AppBar, 
  Toolbar, 
  Typography, 
  Button, 
  Container,
  Grid,
  Paper,
  Avatar
} from '@mui/material';
import { AuthContext } from '../contexts/AuthContext';

const Dashboard = () => {
  const { currentUser, logout } = useContext(AuthContext);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" sx={{ background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)' }}>
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Finance App
          </Typography>
          <Box>
            <Typography variant="body1" component="span" sx={{ mr: 2 }}>
              {currentUser ? `${currentUser.firstName} ${currentUser.lastName}` : ''}
            </Typography>
            <Button color="inherit" onClick={logout}>
              Logout
            </Button>
          </Box>
        </Toolbar>
      </AppBar>
      
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Grid container spacing={3}>
          {/* Welcome Banner */}
          <Grid item xs={12}>
            <Paper
              sx={{
                p: 4,
                display: 'flex',
                flexDirection: 'column',
                borderRadius: 2,
                background: 'linear-gradient(to right, #e0f7fa, #bbdefb)'
              }}
            >
              <Typography component="h1" variant="h4" sx={{ mb: 2, fontWeight: 600 }}>
                Welcome to Your Financial Dashboard
              </Typography>
              <Typography variant="body1">
                This is your personal finance management hub. Connect your bank accounts, track your spending,
                and get AI-powered insights to improve your financial health.
              </Typography>
            </Paper>
          </Grid>
          
          {/* Quick Stats */}
          <Grid item xs={12} md={4}>
            <Paper
              sx={{
                p: 3,
                display: 'flex',
                flexDirection: 'column',
                height: 180,
                borderRadius: 2,
                textAlign: 'center',
                justifyContent: 'center',
                background: 'linear-gradient(to right bottom, #ffffff, #f8f9fa)'
              }}
            >
              <Typography component="h2" variant="h6" color="primary" sx={{ mb: 1, fontWeight: 600 }}>
                Accounts
              </Typography>
              <Typography component="p" variant="h4">
                Connect your first account
              </Typography>
            </Paper>
          </Grid>
          
          <Grid item xs={12} md={4}>
            <Paper
              sx={{
                p: 3,
                display: 'flex',
                flexDirection: 'column',
                height: 180,
                borderRadius: 2,
                textAlign: 'center',
                justifyContent: 'center',
                background: 'linear-gradient(to right bottom, #ffffff, #f8f9fa)'
              }}
            >
              <Typography component="h2" variant="h6" color="primary" sx={{ mb: 1, fontWeight: 600 }}>
                Spending
              </Typography>
              <Typography component="p" variant="h4">
                Track your expenses
              </Typography>
            </Paper>
          </Grid>
          
          <Grid item xs={12} md={4}>
            <Paper
              sx={{
                p: 3,
                display: 'flex',
                flexDirection: 'column',
                height: 180,
                borderRadius: 2,
                textAlign: 'center',
                justifyContent: 'center',
                background: 'linear-gradient(to right bottom, #ffffff, #f8f9fa)'
              }}
            >
              <Typography component="h2" variant="h6" color="primary" sx={{ mb: 1, fontWeight: 600 }}>
                Investments
              </Typography>
              <Typography component="p" variant="h4">
                Get personalized suggestions
              </Typography>
            </Paper>
          </Grid>
          
          {/* AI Chatbot */}
          <Grid item xs={12}>
            <Paper
              sx={{
                p: 4,
                display: 'flex',
                flexDirection: 'column',
                borderRadius: 2,
                mt: 2,
                background: 'linear-gradient(to right, #e8f5e9, #c8e6c9)'
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Avatar sx={{ bgcolor: '#43a047', mr: 2 }}>AI</Avatar>
                <Typography variant="h6" sx={{ fontWeight: 600 }}>
                  Financial AI Coach
                </Typography>
              </Box>
              <Typography variant="body1" paragraph>
                Your AI financial coach is ready to help! Connect your accounts to get personalized advice on:
              </Typography>
              <Box component="ul" sx={{ pl: 2 }}>
                <Typography component="li" variant="body1">Optimizing your budget</Typography>
                <Typography component="li" variant="body1">Reducing unnecessary expenses</Typography>
                <Typography component="li" variant="body1">Building savings strategies</Typography>
                <Typography component="li" variant="body1">Finding investment opportunities</Typography>
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Dashboard; 