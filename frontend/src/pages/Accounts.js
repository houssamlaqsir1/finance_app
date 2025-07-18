import React, { useContext, useState, useEffect } from 'react';
import { 
  Box, 
  Typography, 
  Container,
  Grid,
  Paper,
  Card,
  CardContent,
  Button,
  Divider,
  Avatar,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  Tabs,
  Tab,
  Chip,
  useTheme
} from '@mui/material';
import { AuthContext } from '../contexts/AuthContext';

// Icons
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import SavingsIcon from '@mui/icons-material/Savings';
import AddIcon from '@mui/icons-material/Add';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import LinkIcon from '@mui/icons-material/Link';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';

// Dashboard Component - importing this to reuse the sidebar
import Dashboard from '../components/Dashboard';

const Accounts = () => {
  const theme = useTheme();
  const { currentUser } = useContext(AuthContext);
  const [tabValue, setTabValue] = useState(0);
  const [hideBalances, setHideBalances] = useState(false);
  const [animatedItems, setAnimatedItems] = useState({
    header: false,
    accounts: false
  });

  // Mock data for demo
  const accountsData = [
    { 
      id: 1,
      name: "Primary Checking", 
      institution: "Bank of America",
      accountNumber: "xxxx-xxx-4587",
      balance: 4850.75, 
      type: "checking", 
      icon: <AccountBalanceIcon />,
      color: theme.palette.primary.main
    },
    { 
      id: 2,
      name: "High-Yield Savings", 
      institution: "Ally Bank",
      accountNumber: "xxxx-xxx-9032", 
      balance: 12500.00, 
      type: "savings", 
      icon: <SavingsIcon />,
      color: theme.palette.success.main
    },
    { 
      id: 3,
      name: "Travel Rewards Card", 
      institution: "Chase",
      accountNumber: "xxxx-xxxx-xxxx-5612", 
      balance: -1456.33, 
      type: "credit", 
      icon: <CreditCardIcon />,
      color: theme.palette.error.main
    },
    { 
      id: 4,
      name: "Emergency Fund", 
      institution: "Vanguard",
      accountNumber: "xxxx-xxx-7741", 
      balance: 8500.00, 
      type: "savings", 
      icon: <SavingsIcon />,
      color: theme.palette.warning.main
    },
  ];

  // Calculate total balances
  const totalAssets = accountsData
    .filter(account => account.balance > 0)
    .reduce((total, account) => total + account.balance, 0);
    
  const totalLiabilities = accountsData
    .filter(account => account.balance < 0)
    .reduce((total, account) => total + Math.abs(account.balance), 0);
    
  const netWorth = totalAssets - totalLiabilities;

  // Animation on mount
  useEffect(() => {
    setTimeout(() => setAnimatedItems(prev => ({ ...prev, header: true })), 100);
    setTimeout(() => setAnimatedItems(prev => ({ ...prev, accounts: true })), 300);
  }, []);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const toggleBalanceVisibility = () => {
    setHideBalances(!hideBalances);
  };

  // Format currency
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', { 
      style: 'currency', 
      currency: 'USD' 
    }).format(amount);
  };

  // Filter accounts based on selected tab
  const filteredAccounts = () => {
    if (tabValue === 0) return accountsData;
    if (tabValue === 1) return accountsData.filter(account => account.balance > 0);
    if (tabValue === 2) return accountsData.filter(account => account.balance < 0);
    return accountsData;
  };

  return (
    <Dashboard>
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        {/* Header */}
        <Box 
          sx={{ 
            mb: 4,
            opacity: animatedItems.header ? 1 : 0,
            transform: animatedItems.header ? 'translateY(0)' : 'translateY(20px)',
            transition: 'all 0.5s ease',
          }}
        >
          <Typography variant="h4" component="h1" gutterBottom fontWeight="bold">
            Your Accounts
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Manage and track all your financial accounts in one place
          </Typography>
        </Box>

        {/* Net Worth Summary */}
        <Grid container spacing={3} mb={4}>
          <Grid item xs={12} md={4}>
            <Card 
              sx={{ 
                height: '100%',
                background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.primary.dark})`,
                color: 'white',
                opacity: animatedItems.header ? 1 : 0,
                transform: animatedItems.header ? 'translateY(0)' : 'translateY(20px)',
                transition: 'all 0.5s ease 0.1s',
              }}
            >
              <CardContent sx={{ p: 3 }}>
                <Typography variant="overline" sx={{ opacity: 0.8 }}>
                  NET WORTH
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                  <Typography variant="h4" component="div" fontWeight="bold" sx={{ flexGrow: 1 }}>
                    {hideBalances ? '••••••' : formatCurrency(netWorth)}
                  </Typography>
                  <IconButton size="small" onClick={toggleBalanceVisibility} sx={{ color: 'white' }}>
                    {hideBalances ? <VisibilityIcon /> : <VisibilityOffIcon />}
                  </IconButton>
                </Box>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={4}>
            <Card 
              sx={{ 
                height: '100%',
                opacity: animatedItems.header ? 1 : 0,
                transform: animatedItems.header ? 'translateY(0)' : 'translateY(20px)',
                transition: 'all 0.5s ease 0.2s',
              }}
            >
              <CardContent sx={{ p: 3 }}>
                <Typography variant="overline" color="success.main">
                  ASSETS
                </Typography>
                <Typography variant="h4" component="div" fontWeight="bold" color="success.main">
                  {hideBalances ? '••••••' : formatCurrency(totalAssets)}
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={4}>
            <Card 
              sx={{ 
                height: '100%',
                opacity: animatedItems.header ? 1 : 0,
                transform: animatedItems.header ? 'translateY(0)' : 'translateY(20px)',
                transition: 'all 0.5s ease 0.3s',
              }}
            >
              <CardContent sx={{ p: 3 }}>
                <Typography variant="overline" color="error.main">
                  LIABILITIES
                </Typography>
                <Typography variant="h4" component="div" fontWeight="bold" color="error.main">
                  {hideBalances ? '••••••' : formatCurrency(totalLiabilities)}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        {/* Accounts List */}
        <Paper 
          sx={{ 
            p: 0, 
            mb: 4,
            overflow: 'hidden',
            opacity: animatedItems.accounts ? 1 : 0,
            transform: animatedItems.accounts ? 'translateY(0)' : 'translateY(20px)',
            transition: 'all 0.5s ease 0.4s',
          }}
        >
          <Box sx={{ borderBottom: 1, borderColor: 'divider', px: 2 }}>
            <Tabs
              value={tabValue}
              onChange={handleTabChange}
              aria-label="account tabs"
              textColor="primary"
              indicatorColor="primary"
            >
              <Tab label="All Accounts" />
              <Tab label="Assets" />
              <Tab label="Liabilities" />
            </Tabs>
          </Box>
          
          <List disablePadding>
            {filteredAccounts().map((account, index) => (
              <React.Fragment key={account.id}>
                {index > 0 && <Divider component="li" />}
                <ListItem 
                  sx={{ 
                    px: 3, 
                    py: 2,
                    '&:hover': {
                      bgcolor: 'rgba(0, 0, 0, 0.02)',
                    } 
                  }}
                >
                  <ListItemAvatar>
                    <Avatar sx={{ bgcolor: `${account.color}20`, color: account.color }}>
                      {account.icon}
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary={
                      <Typography variant="body1" component="div" fontWeight="medium">
                        {account.name}
                      </Typography>
                    }
                    secondary={
                      <>
                        <Typography variant="body2" color="text.secondary" component="span">
                          {account.institution} • {account.accountNumber}
                        </Typography>
                      </>
                    }
                  />
                  <ListItemSecondaryAction>
                    <Box sx={{ textAlign: 'right' }}>
                      <Typography 
                        variant="body1" 
                        fontWeight="medium" 
                        color={account.balance < 0 ? 'error.main' : 'success.main'}
                      >
                        {hideBalances ? '••••••' : formatCurrency(account.balance)}
                      </Typography>
                      <Chip 
                        size="small" 
                        label={account.type.toUpperCase()} 
                        sx={{ 
                          fontSize: '0.7rem', 
                          mt: 0.5,
                          bgcolor: `${account.color}15`,
                          color: account.color,
                          borderRadius: '4px'
                        }} 
                      />
                    </Box>
                    <IconButton edge="end" aria-label="more options" sx={{ ml: 1 }}>
                      <MoreVertIcon />
                    </IconButton>
                  </ListItemSecondaryAction>
                </ListItem>
              </React.Fragment>
            ))}
          </List>
        </Paper>

        {/* Add Account Button */}
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
          <Button 
            variant="outlined" 
            startIcon={<AddIcon />}
            sx={{ 
              borderStyle: 'dashed',
              opacity: animatedItems.accounts ? 1 : 0,
              transform: animatedItems.accounts ? 'translateY(0)' : 'translateY(20px)',
              transition: 'all 0.5s ease 0.5s',
            }}
          >
            Link a new account
          </Button>
        </Box>
      </Container>
    </Dashboard>
  );
};

export default Accounts; 