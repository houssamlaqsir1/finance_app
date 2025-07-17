import React, { useContext, useState, useEffect } from 'react';
import { 
  Box, 
  AppBar, 
  Toolbar, 
  Typography, 
  Button, 
  Container,
  Grid,
  Paper,
  Avatar,
  Card,
  CardContent,
  IconButton,
  Menu,
  MenuItem,
  Divider,
  Badge,
  useTheme,
  LinearProgress,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListItemButton,
  Tooltip
} from '@mui/material';
import { AuthContext } from '../contexts/AuthContext';

// Icons
import DashboardIcon from '@mui/icons-material/Dashboard';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import MoneyIcon from '@mui/icons-material/Money';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import ShowChartIcon from '@mui/icons-material/ShowChart';
import NotificationsIcon from '@mui/icons-material/Notifications';
import MenuIcon from '@mui/icons-material/Menu';
import PersonIcon from '@mui/icons-material/Person';
import LogoutIcon from '@mui/icons-material/Logout';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import AddIcon from '@mui/icons-material/Add';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import SavingsIcon from '@mui/icons-material/Savings';

const Dashboard = () => {
  const theme = useTheme();
  const { currentUser, logout } = useContext(AuthContext);
  const [menuAnchor, setMenuAnchor] = useState(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [animatedItems, setAnimatedItems] = useState({
    header: false,
    summary: false,
    cards: Array(4).fill(false),
    accounts: false,
    transactions: false
  });

  // Mock data for demo
  const accountsData = [
    { name: "Checking Account", balance: 4850.75, type: "bank", icon: <AccountBalanceIcon /> },
    { name: "Savings Account", balance: 12500.00, type: "savings", icon: <SavingsIcon /> },
    { name: "Credit Card", balance: -1456.33, type: "credit", icon: <CreditCardIcon /> },
  ];

  const transactionsData = [
    { merchant: "Amazon", amount: -89.99, date: "2023-10-28", category: "Shopping" },
    { merchant: "Whole Foods", amount: -65.32, date: "2023-10-27", category: "Groceries" },
    { merchant: "Netflix", amount: -14.99, date: "2023-10-26", category: "Entertainment" },
    { merchant: "Paycheck", amount: 2400.00, date: "2023-10-25", category: "Income" },
    { merchant: "Target", amount: -42.55, date: "2023-10-24", category: "Shopping" },
  ];

  // Monthly spending stats
  const spendingCategories = [
    { category: "Housing", amount: 1500, percentage: 35, color: theme.palette.primary.main },
    { category: "Food", amount: 800, percentage: 20, color: theme.palette.secondary.main },
    { category: "Transportation", amount: 400, percentage: 10, color: theme.palette.success.main },
    { category: "Entertainment", amount: 300, percentage: 7, color: theme.palette.warning.main },
    { category: "Utilities", amount: 250, percentage: 6, color: theme.palette.error.main },
  ];

  // Calculate total balance
  const totalBalance = accountsData.reduce((total, account) => total + account.balance, 0);
  const formattedBalance = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(totalBalance);

  // Animation on mount
  useEffect(() => {
    // Header animation
    setTimeout(() => setAnimatedItems(prev => ({ ...prev, header: true })), 100);
    
    // Summary animation
    setTimeout(() => setAnimatedItems(prev => ({ ...prev, summary: true })), 300);
    
    // Card animations - staggered
    setTimeout(() => {
      const newCards = [...animatedItems.cards];
      newCards[0] = true;
      setAnimatedItems(prev => ({ ...prev, cards: newCards }));
    }, 500);
    
    setTimeout(() => {
      const newCards = [...animatedItems.cards];
      newCards[1] = true;
      setAnimatedItems(prev => ({ ...prev, cards: newCards }));
    }, 600);
    
    setTimeout(() => {
      const newCards = [...animatedItems.cards];
      newCards[2] = true;
      setAnimatedItems(prev => ({ ...prev, cards: newCards }));
    }, 700);
    
    setTimeout(() => {
      const newCards = [...animatedItems.cards];
      newCards[3] = true;
      setAnimatedItems(prev => ({ ...prev, cards: newCards }));
    }, 800);

    // Other sections
    setTimeout(() => setAnimatedItems(prev => ({ ...prev, accounts: true })), 900);
    setTimeout(() => setAnimatedItems(prev => ({ ...prev, transactions: true })), 1000);
  }, []);

  // Handle menu open/close
  const handleMenuOpen = (event) => setMenuAnchor(event.currentTarget);
  const handleMenuClose = () => setMenuAnchor(null);

  // Handle drawer toggle
  const toggleDrawer = () => setDrawerOpen(!drawerOpen);
  
  // Handle logout
  const handleLogout = () => {
    handleMenuClose();
    logout();
  };

  // Sidebar navigation items
  const navItems = [
    { text: 'Dashboard', icon: <DashboardIcon />, active: true },
    { text: 'Accounts', icon: <AccountBalanceWalletIcon /> },
    { text: 'Transactions', icon: <MoneyIcon /> },
    { text: 'Investments', icon: <TrendingUpIcon /> },
    { text: 'Analytics', icon: <ShowChartIcon /> },
  ];
  
  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', bgcolor: 'background.default' }}>
      {/* Sidebar */}
      <Drawer
        variant="permanent"
        anchor="left"
        open={drawerOpen}
        sx={{
          width: drawerOpen ? 240 : 72,
          flexShrink: 0,
          transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
          }),
          '& .MuiDrawer-paper': {
            width: drawerOpen ? 240 : 72,
            boxSizing: 'border-box',
            boxShadow: '0px 3px 15px rgba(0, 0, 0, 0.05)',
            border: 'none',
            bgcolor: 'background.paper',
            transition: theme.transitions.create('width', {
              easing: theme.transitions.easing.sharp,
              duration: theme.transitions.duration.enteringScreen,
            }),
            overflowX: 'hidden',
          },
        }}
      >
        <Box sx={{ 
          p: 2, 
          display: 'flex', 
          alignItems: 'center',
          justifyContent: drawerOpen ? 'space-between' : 'center',
          borderBottom: '1px solid',
          borderColor: 'divider'
        }}>
          {drawerOpen ? (
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
          ) : (
            <Avatar sx={{ 
              background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
              color: '#fff',
              width: 40,
              height: 40,
            }}>
              F
            </Avatar>
          )}
          
          <IconButton onClick={toggleDrawer} edge={drawerOpen ? 'end' : false}>
            <ChevronRightIcon sx={{ 
              transform: drawerOpen ? 'rotate(180deg)' : 'none',
              transition: theme.transitions.create('transform', {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.enteringScreen,
              }),
            }} />
          </IconButton>
        </Box>
        
        <List sx={{ mt: 2 }}>
          {navItems.map((item, index) => (
            <ListItem key={index} disablePadding>
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: drawerOpen ? 'initial' : 'center',
                  px: 2.5,
                  py: 1.5,
                  borderRadius: drawerOpen ? '0 24px 24px 0' : '12px',
                  mx: drawerOpen ? 0 : 1,
                  my: 0.5,
                  backgroundColor: item.active ? `${theme.palette.primary.main}15` : 'transparent',
                  color: item.active ? theme.palette.primary.main : 'inherit',
                  '&:hover': {
                    backgroundColor: `${theme.palette.primary.main}10`,
                  },
                  position: 'relative',
                }}
              >
                {item.active && drawerOpen && (
                  <Box
                    sx={{
                      position: 'absolute',
                      left: 0,
                      top: '50%',
                      transform: 'translateY(-50%)',
                      height: '60%',
                      width: '4px',
                      bgcolor: theme.palette.primary.main,
                      borderRadius: '0 4px 4px 0',
                    }}
                  />
                )}
                <Tooltip title={!drawerOpen ? item.text : ""} placement="right">
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      mr: drawerOpen ? 3 : 'auto',
                      justifyContent: 'center',
                      color: item.active ? theme.palette.primary.main : 'inherit',
                    }}
                  >
                    {item.icon}
                  </ListItemIcon>
                </Tooltip>
                {drawerOpen && <ListItemText primary={item.text} />}
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>
      
      {/* Main content */}
      <Box 
        component="main" 
        sx={{ 
          flexGrow: 1, 
          p: 3,
          ml: drawerOpen ? 0 : 0,
          width: { sm: `calc(100% - ${drawerOpen ? 240 : 72}px)` },
          transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
          }),
        }}
      >
        {/* App Bar */}
        <AppBar 
          position="static" 
          color="transparent" 
          elevation={0}
          sx={{ 
            mb: 4,
            transform: animatedItems.header ? 'translateY(0)' : 'translateY(-20px)',
            opacity: animatedItems.header ? 1 : 0,
            transition: 'all 0.6s ease',
          }}
        >
          <Toolbar sx={{ justifyContent: 'space-between', px: { xs: 0, sm: 2 } }}>
            {/* Dashboard title */}
            <Box>
              <Typography variant="h4" component="h1" sx={{ fontWeight: 700, color: 'text.primary' }}>
                Dashboard
              </Typography>
              <Typography variant="body1" sx={{ color: 'text.secondary' }}>
                Welcome back, {currentUser ? currentUser.firstName : 'User'}
              </Typography>
            </Box>
            
            {/* Right side actions */}
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Tooltip title="Notifications">
                <IconButton color="inherit" sx={{ bgcolor: theme.palette.background.paper, boxShadow: 1 }}>
                  <Badge badgeContent={3} color="secondary">
                    <NotificationsIcon />
                  </Badge>
                </IconButton>
              </Tooltip>
              
              <Box
                onClick={handleMenuOpen}
                sx={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  cursor: 'pointer',
                  bgcolor: theme.palette.background.paper,
                  boxShadow: 1,
                  py: 1,
                  px: 2,
                  borderRadius: 2,
                  '&:hover': {
                    boxShadow: 2,
                  }
                }}
              >
                <Avatar 
                  sx={{ 
                    width: 36, 
                    height: 36,
                    mr: 1,
                    bgcolor: theme.palette.primary.main,
                    color: 'white',
                  }}
                >
                  {currentUser ? currentUser.firstName.charAt(0) : 'U'}
                </Avatar>
                <Box sx={{ mr: 1, display: { xs: 'none', sm: 'block' } }}>
                  <Typography variant="body2" sx={{ fontWeight: 600 }}>
                    {currentUser ? `${currentUser.firstName} ${currentUser.lastName}` : 'User'}
                  </Typography>
                  <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                    {currentUser ? currentUser.email : 'user@example.com'}
                  </Typography>
                </Box>
              </Box>
              
              <Menu
                anchorEl={menuAnchor}
                open={Boolean(menuAnchor)}
                onClose={handleMenuClose}
                PaperProps={{
                  elevation: 3,
                  sx: { borderRadius: 2, mt: 1, minWidth: 200 },
                }}
                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
              >
                <MenuItem onClick={handleMenuClose}>
                  <ListItemIcon>
                    <PersonIcon fontSize="small" />
                  </ListItemIcon>
                  <ListItemText>Profile</ListItemText>
                </MenuItem>
                <Divider />
                <MenuItem onClick={handleLogout}>
                  <ListItemIcon>
                    <LogoutIcon fontSize="small" />
                  </ListItemIcon>
                  <ListItemText>Logout</ListItemText>
                </MenuItem>
              </Menu>
            </Box>
          </Toolbar>
        </AppBar>

        {/* Main Dashboard Content */}
        <Container maxWidth="xl" disableGutters>
          {/* Balance Summary */}
          <Paper
            elevation={0}
            sx={{
              p: 3,
              mb: 4,
              borderRadius: 4,
              background: `linear-gradient(135deg, ${theme.palette.primary.dark}, ${theme.palette.primary.main})`,
              color: 'white',
              transform: animatedItems.summary ? 'translateY(0)' : 'translateY(20px)',
              opacity: animatedItems.summary ? 1 : 0,
              transition: 'all 0.6s ease',
            }}
          >
            <Grid container spacing={3} alignItems="center">
              <Grid item xs={12} md={7}>
                <Typography variant="h6" sx={{ opacity: 0.9, mb: 0.5 }}>
                  Total Balance
                </Typography>
                <Typography variant="h3" component="div" sx={{ mb: 2, fontWeight: 700 }}>
                  {formattedBalance}
                </Typography>
                <Button
                  variant="contained"
                  sx={{
                    bgcolor: 'white',
                    color: theme.palette.primary.dark,
                    '&:hover': {
                      bgcolor: 'rgba(255, 255, 255, 0.9)',
                    }
                  }}
                  startIcon={<AddIcon />}
                >
                  Add Account
                </Button>
              </Grid>
              <Grid item xs={12} md={5}>
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    mb: 1,
                  }}
                >
                  <Typography variant="body2" sx={{ fontWeight: 500 }}>
                    Monthly Budget
                  </Typography>
                  <Typography variant="body2" sx={{ fontWeight: 700 }}>
                    $3,250 / $4,000
                  </Typography>
                </Box>
                <LinearProgress
                  variant="determinate"
                  value={81}
                  sx={{
                    height: 10,
                    borderRadius: 5,
                    bgcolor: 'rgba(255, 255, 255, 0.2)',
                    mb: 2,
                    '& .MuiLinearProgress-bar': {
                      borderRadius: 5,
                      bgcolor: 'white',
                    }
                  }}
                />
                
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    mb: 1,
                  }}
                >
                  <Typography variant="body2" sx={{ fontWeight: 500 }}>
                    Savings Goal
                  </Typography>
                  <Typography variant="body2" sx={{ fontWeight: 700 }}>
                    $12,500 / $25,000
                  </Typography>
                </Box>
                <LinearProgress
                  variant="determinate"
                  value={50}
                  sx={{
                    height: 10,
                    borderRadius: 5,
                    bgcolor: 'rgba(255, 255, 255, 0.2)',
                    '& .MuiLinearProgress-bar': {
                      borderRadius: 5,
                      bgcolor: 'white',
                    }
                  }}
                />
              </Grid>
            </Grid>
          </Paper>

          {/* Quick Stats Cards */}
          <Grid container spacing={3} sx={{ mb: 4 }}>
            {[
              {
                title: 'Income',
                amount: '$5,240.00',
                change: '+12%',
                positive: true,
                icon: <TrendingUpIcon />,
                color: theme.palette.success.main
              },
              {
                title: 'Expenses',
                amount: '$3,250.00',
                change: '-5%',
                positive: true,
                icon: <MoneyIcon />,
                color: theme.palette.error.main
              },
              {
                title: 'Savings',
                amount: '$1,990.00',
                change: '+18%',
                positive: true,
                icon: <SavingsIcon />,
                color: theme.palette.primary.main
              },
              {
                title: 'Investments',
                amount: '$8,425.00',
                change: '+3.2%',
                positive: true,
                icon: <ShowChartIcon />,
                color: theme.palette.secondary.main
              }
            ].map((stat, index) => (
              <Grid item xs={6} md={3} key={index}>
                <Paper
                  elevation={0}
                  sx={{
                    p: 3,
                    borderRadius: 4,
                    transition: 'all 0.3s ease',
                    transform: animatedItems.cards[index] ? 'translateY(0)' : 'translateY(20px)',
                    opacity: animatedItems.cards[index] ? 1 : 0,
                    '&:hover': {
                      boxShadow: '0 10px 20px rgba(0, 0, 0, 0.08)',
                      transform: 'translateY(-5px)',
                    }
                  }}
                >
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                    <Box>
                      <Typography variant="body2" color="text.secondary">
                        {stat.title}
                      </Typography>
                      <Typography variant="h5" sx={{ fontWeight: 700, my: 1 }}>
                        {stat.amount}
                      </Typography>
                      <Typography 
                        variant="caption" 
                        sx={{ 
                          fontWeight: 600, 
                          color: stat.positive ? theme.palette.success.main : theme.palette.error.main,
                          bgcolor: stat.positive ? `${theme.palette.success.main}15` : `${theme.palette.error.main}15`,
                          p: 0.5,
                          px: 1,
                          borderRadius: 1,
                        }}
                      >
                        {stat.change} this month
                      </Typography>
                    </Box>
                    <Avatar
                      sx={{
                        bgcolor: `${stat.color}15`,
                        color: stat.color
                      }}
                    >
                      {stat.icon}
                    </Avatar>
                  </Box>
                </Paper>
              </Grid>
            ))}
          </Grid>

          <Grid container spacing={4}>
            {/* Left Column */}
            <Grid item xs={12} lg={8}>
              {/* Accounts Section */}
              <Paper
                elevation={0}
                sx={{
                  p: 3,
                  mb: 4,
                  borderRadius: 4,
                  transform: animatedItems.accounts ? 'translateY(0)' : 'translateY(20px)',
                  opacity: animatedItems.accounts ? 1 : 0,
                  transition: 'all 0.6s ease',
                }}
              >
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
                  <Typography variant="h6" sx={{ fontWeight: 600 }}>Your Accounts</Typography>
                  <Button 
                    variant="outlined" 
                    color="primary" 
                    size="small"
                    startIcon={<AddIcon />}
                    sx={{ borderRadius: 2 }}
                  >
                    Add New
                  </Button>
                </Box>
                
                {accountsData.map((account, index) => (
                  <Box 
                    key={index} 
                    sx={{ 
                      display: 'flex', 
                      justifyContent: 'space-between', 
                      alignItems: 'center',
                      p: 2,
                      mb: 2,
                      borderRadius: 2,
                      bgcolor: theme.palette.background.default,
                      transition: 'all 0.2s ease',
                      '&:hover': {
                        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)',
                        transform: 'translateX(5px)',
                      }
                    }}
                  >
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <Avatar 
                        sx={{ 
                          mr: 2, 
                          bgcolor: `${theme.palette.primary.main}15`,
                          color: theme.palette.primary.main
                        }}
                      >
                        {account.icon}
                      </Avatar>
                      <Box>
                        <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                          {account.name}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {account.type.charAt(0).toUpperCase() + account.type.slice(1)}
                        </Typography>
                      </Box>
                    </Box>
                    <Typography 
                      variant="subtitle1" 
                      sx={{ 
                        fontWeight: 700,
                        color: account.balance < 0 ? theme.palette.error.main : 'text.primary'
                      }}
                    >
                      {new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(account.balance)}
                    </Typography>
                  </Box>
                ))}
              </Paper>

              {/* Recent Transactions */}
              <Paper
                elevation={0}
                sx={{
                  p: 3,
                  borderRadius: 4,
                  transform: animatedItems.transactions ? 'translateY(0)' : 'translateY(20px)',
                  opacity: animatedItems.transactions ? 1 : 0,
                  transition: 'all 0.6s ease',
                }}
              >
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
                  <Typography variant="h6" sx={{ fontWeight: 600 }}>Recent Transactions</Typography>
                  <Button 
                    variant="text" 
                    color="primary" 
                    size="small"
                    endIcon={<ChevronRightIcon />}
                  >
                    View All
                  </Button>
                </Box>
                
                {transactionsData.map((transaction, index) => (
                  <Box 
                    key={index} 
                    sx={{ 
                      display: 'flex', 
                      justifyContent: 'space-between', 
                      alignItems: 'center',
                      p: 2,
                      mb: 2,
                      borderRadius: 2,
                      bgcolor: theme.palette.background.default,
                      '&:hover': {
                        bgcolor: `${theme.palette.primary.main}05`,
                      }
                    }}
                  >
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <Avatar 
                        sx={{ 
                          mr: 2, 
                          bgcolor: transaction.amount < 0 
                            ? `${theme.palette.error.main}15`
                            : `${theme.palette.success.main}15`,
                          color: transaction.amount < 0 
                            ? theme.palette.error.main
                            : theme.palette.success.main,
                          width: 40,
                          height: 40,
                        }}
                      >
                        {transaction.amount < 0 ? '-' : '+'}
                      </Avatar>
                      <Box>
                        <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                          {transaction.merchant}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          {transaction.category} • {new Date(transaction.date).toLocaleDateString()}
                        </Typography>
                      </Box>
                    </Box>
                    <Typography 
                      variant="subtitle1" 
                      sx={{ 
                        fontWeight: 700,
                        color: transaction.amount < 0 ? theme.palette.error.main : theme.palette.success.main
                      }}
                    >
                      {transaction.amount < 0 ? '-' : '+'}{new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(Math.abs(transaction.amount))}
                    </Typography>
                  </Box>
                ))}
                
                <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
                  <Button 
                    variant="outlined" 
                    color="primary" 
                    sx={{ borderRadius: 2, px: 4 }}
                  >
                    Load More
                  </Button>
                </Box>
              </Paper>
            </Grid>
            
            {/* Right Column */}
            <Grid item xs={12} lg={4}>
              {/* Monthly Spending */}
              <Paper
                elevation={0}
                sx={{
                  p: 3,
                  mb: 4,
                  borderRadius: 4,
                  transform: animatedItems.accounts ? 'translateY(0)' : 'translateY(20px)',
                  opacity: animatedItems.accounts ? 1 : 0,
                  transition: 'all 0.6s ease',
                  transitionDelay: '0.1s',
                }}
              >
                <Typography variant="h6" sx={{ fontWeight: 600, mb: 3 }}>Monthly Spending</Typography>
                
                {spendingCategories.map((category, index) => (
                  <Box key={index} sx={{ mb: 2 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
                      <Typography variant="body2">{category.category}</Typography>
                      <Typography variant="body2" sx={{ fontWeight: 600 }}>
                        {new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(category.amount)}
                      </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <Box
                        sx={{
                          flexGrow: 1,
                          mr: 2,
                        }}
                      >
                        <LinearProgress
                          variant="determinate"
                          value={category.percentage}
                          sx={{
                            height: 8,
                            borderRadius: 4,
                            bgcolor: `${category.color}20`,
                            '& .MuiLinearProgress-bar': {
                              bgcolor: category.color,
                            }
                          }}
                        />
                      </Box>
                      <Typography variant="caption" sx={{ fontWeight: 600, minWidth: 35 }}>
                        {category.percentage}%
                      </Typography>
                    </Box>
                  </Box>
                ))}
                
                <Divider sx={{ my: 2 }} />
                
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Typography variant="subtitle2">Total Spent:</Typography>
                  <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
                    {new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(
                      spendingCategories.reduce((total, cat) => total + cat.amount, 0)
                    )}
                  </Typography>
                </Box>
              </Paper>
              
              {/* AI Insights */}
              <Paper
                elevation={0}
                sx={{
                  p: 3,
                  borderRadius: 4,
                  background: `linear-gradient(135deg, ${theme.palette.primary.main}10, ${theme.palette.secondary.main}10)`,
                  border: '1px solid',
                  borderColor: `${theme.palette.primary.main}20`,
                  transform: animatedItems.transactions ? 'translateY(0)' : 'translateY(20px)',
                  opacity: animatedItems.transactions ? 1 : 0,
                  transition: 'all 0.6s ease',
                  transitionDelay: '0.1s',
                }}
              >
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <Avatar 
                    sx={{ 
                      bgcolor: theme.palette.secondary.main,
                      color: 'white',
                      mr: 2
                    }}
                  >
                    AI
                  </Avatar>
                  <Typography variant="h6" sx={{ fontWeight: 600 }}>
                    AI Financial Insights
                  </Typography>
                </Box>
                
                <Typography variant="body2" paragraph>
                  Based on your spending patterns, here are some personalized recommendations:
                </Typography>
                
                <Box sx={{ mb: 2 }}>
                  <Typography variant="subtitle2" sx={{ fontWeight: 600, color: theme.palette.primary.main, mb: 0.5 }}>
                    Opportunity: Reduce Subscription Costs
                  </Typography>
                  <Typography variant="body2">
                    You're spending $95/month on subscriptions. We found potential savings of $35/month by eliminating unused services.
                  </Typography>
                </Box>
                
                <Box sx={{ mb: 2 }}>
                  <Typography variant="subtitle2" sx={{ fontWeight: 600, color: theme.palette.secondary.main, mb: 0.5 }}>
                    Alert: Unusual Transaction
                  </Typography>
                  <Typography variant="body2">
                    A recent payment of $89.99 to "Amazon" is 250% higher than your typical spending with this merchant.
                  </Typography>
                </Box>
                
                <Box>
                  <Typography variant="subtitle2" sx={{ fontWeight: 600, color: theme.palette.success.main, mb: 0.5 }}>
                    Savings Goal: On Track
                  </Typography>
                  <Typography variant="body2">
                    You're on track to reach your savings goal of $25,000 by December 2023. Keep it up!
                  </Typography>
                </Box>
                
                <Button
                  fullWidth
                  variant="outlined"
                  color="secondary"
                  sx={{ mt: 3, borderRadius: 2 }}
                >
                  Get Full AI Analysis
                </Button>
              </Paper>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </Box>
  );
};

export default Dashboard; 