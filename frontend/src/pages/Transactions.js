import React, { useContext, useState, useEffect } from 'react';
import { 
  Box, 
  Typography, 
  Container,
  Grid,
  Paper,
  Card,
  CardContent,
  TextField,
  InputAdornment,
  Button,
  Divider,
  Avatar,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  Menu,
  MenuItem,
  Chip,
  Select,
  FormControl,
  InputLabel,
  Tabs,
  Tab,
  useTheme
} from '@mui/material';
import { AuthContext } from '../contexts/AuthContext';

// Icons
import SearchIcon from '@mui/icons-material/Search';
import FilterListIcon from '@mui/icons-material/FilterList';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import LocalGroceryStoreIcon from '@mui/icons-material/LocalGroceryStore';
import MovieIcon from '@mui/icons-material/Movie';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import HomeIcon from '@mui/icons-material/Home';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import ReceiptIcon from '@mui/icons-material/Receipt';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import AddIcon from '@mui/icons-material/Add';

// Dashboard Component - importing this to reuse the sidebar
import Dashboard from '../components/Dashboard';

const Transactions = () => {
  const theme = useTheme();
  const { currentUser } = useContext(AuthContext);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterMenuAnchor, setFilterMenuAnchor] = useState(null);
  const [selectedAccount, setSelectedAccount] = useState('all');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [dateRange, setDateRange] = useState('30days');
  const [tabValue, setTabValue] = useState(0);
  const [animatedItems, setAnimatedItems] = useState({
    header: false,
    filters: false,
    transactions: false
  });

  // Mock data for demo
  const transactionsData = [
    { 
      id: 1,
      date: '2023-11-01', 
      merchant: 'Amazon', 
      description: 'Amazon.com #A23BX91', 
      amount: -89.99, 
      category: 'Shopping',
      account: 'Travel Rewards Card',
      icon: <ShoppingBagIcon />,
      color: theme.palette.primary.main
    },
    { 
      id: 2,
      date: '2023-11-02', 
      merchant: 'Whole Foods', 
      description: 'Groceries', 
      amount: -65.32, 
      category: 'Groceries',
      account: 'Primary Checking',
      icon: <LocalGroceryStoreIcon />,
      color: theme.palette.success.main
    },
    { 
      id: 3,
      date: '2023-11-03', 
      merchant: 'Netflix', 
      description: 'Monthly subscription', 
      amount: -14.99, 
      category: 'Entertainment',
      account: 'Primary Checking',
      icon: <MovieIcon />,
      color: theme.palette.error.main
    },
    { 
      id: 4,
      date: '2023-11-04', 
      merchant: 'Paycheck', 
      description: 'Direct deposit', 
      amount: 2400.00, 
      category: 'Income',
      account: 'Primary Checking',
      icon: <MonetizationOnIcon />,
      color: theme.palette.success.main
    },
    { 
      id: 5,
      date: '2023-11-05', 
      merchant: 'Target', 
      description: 'Home supplies', 
      amount: -42.55, 
      category: 'Shopping',
      account: 'Travel Rewards Card',
      icon: <ShoppingBagIcon />,
      color: theme.palette.primary.main
    },
    { 
      id: 6,
      date: '2023-11-06', 
      merchant: 'Chipotle', 
      description: 'Lunch', 
      amount: -12.99, 
      category: 'Dining',
      account: 'Travel Rewards Card',
      icon: <RestaurantIcon />,
      color: theme.palette.warning.main
    },
    { 
      id: 7,
      date: '2023-11-07', 
      merchant: 'Rent', 
      description: 'November rent', 
      amount: -1800.00, 
      category: 'Housing',
      account: 'Primary Checking',
      icon: <HomeIcon />,
      color: theme.palette.secondary.main
    },
  ];

  // Animation on mount
  useEffect(() => {
    setTimeout(() => setAnimatedItems(prev => ({ ...prev, header: true })), 100);
    setTimeout(() => setAnimatedItems(prev => ({ ...prev, filters: true })), 300);
    setTimeout(() => setAnimatedItems(prev => ({ ...prev, transactions: true })), 500);
  }, []);

  // Format date
  const formatDate = (dateString) => {
    const options = { month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  // Format currency
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', { 
      style: 'currency', 
      currency: 'USD' 
    }).format(amount);
  };

  // Get icon by category
  const getCategoryIcon = (category) => {
    switch(category.toLowerCase()) {
      case 'shopping': return <ShoppingBagIcon />;
      case 'groceries': return <LocalGroceryStoreIcon />;
      case 'entertainment': return <MovieIcon />;
      case 'income': return <MonetizationOnIcon />;
      case 'dining': return <RestaurantIcon />;
      case 'housing': return <HomeIcon />;
      default: return <ReceiptIcon />;
    }
  };

  // Filter transactions
  const filteredTransactions = () => {
    return transactionsData
      .filter(transaction => {
        // Filter by search term
        if (searchTerm && 
            !transaction.merchant.toLowerCase().includes(searchTerm.toLowerCase()) &&
            !transaction.description.toLowerCase().includes(searchTerm.toLowerCase())) {
          return false;
        }
        
        // Filter by account
        if (selectedAccount !== 'all' && transaction.account !== selectedAccount) {
          return false;
        }
        
        // Filter by category
        if (selectedCategory !== 'all' && transaction.category !== selectedCategory) {
          return false;
        }
        
        // Filter by type (tab value)
        if (tabValue === 1 && transaction.amount >= 0) return false; // Expenses tab
        if (tabValue === 2 && transaction.amount < 0) return false;  // Income tab
        
        return true;
      })
      .sort((a, b) => new Date(b.date) - new Date(a.date)); // Sort by date (newest first)
  };

  const handleFilterOpen = (event) => {
    setFilterMenuAnchor(event.currentTarget);
  };

  const handleFilterClose = () => {
    setFilterMenuAnchor(null);
  };

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  // Get unique accounts for filter
  const accounts = ['all', ...new Set(transactionsData.map(t => t.account))];
  
  // Get unique categories for filter
  const categories = ['all', ...new Set(transactionsData.map(t => t.category))];

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
            Transactions
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Track and manage your financial activity
          </Typography>
        </Box>

        {/* Filters and Search */}
        <Paper 
          sx={{ 
            p: 2, 
            mb: 4,
            opacity: animatedItems.filters ? 1 : 0,
            transform: animatedItems.filters ? 'translateY(0)' : 'translateY(20px)',
            transition: 'all 0.5s ease',
          }}
        >
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                size="small"
                placeholder="Search transactions..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon color="action" />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
            <Grid item xs={12} md={3}>
              <FormControl fullWidth size="small">
                <InputLabel id="account-filter-label">Account</InputLabel>
                <Select
                  labelId="account-filter-label"
                  value={selectedAccount}
                  label="Account"
                  onChange={(e) => setSelectedAccount(e.target.value)}
                >
                  {accounts.map((account) => (
                    <MenuItem key={account} value={account}>
                      {account === 'all' ? 'All Accounts' : account}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={3}>
              <FormControl fullWidth size="small">
                <InputLabel id="category-filter-label">Category</InputLabel>
                <Select
                  labelId="category-filter-label"
                  value={selectedCategory}
                  label="Category"
                  onChange={(e) => setSelectedCategory(e.target.value)}
                >
                  {categories.map((category) => (
                    <MenuItem key={category} value={category}>
                      {category === 'all' ? 'All Categories' : category}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        </Paper>

        {/* Transactions List */}
        <Paper 
          sx={{ 
            p: 0, 
            mb: 4,
            overflow: 'hidden',
            opacity: animatedItems.transactions ? 1 : 0,
            transform: animatedItems.transactions ? 'translateY(0)' : 'translateY(20px)',
            transition: 'all 0.5s ease',
          }}
        >
          <Box sx={{ borderBottom: 1, borderColor: 'divider', px: 2 }}>
            <Tabs
              value={tabValue}
              onChange={handleTabChange}
              aria-label="transaction tabs"
              textColor="primary"
              indicatorColor="primary"
            >
              <Tab label="All Transactions" />
              <Tab label="Expenses" />
              <Tab label="Income" />
            </Tabs>
          </Box>
          
          <List disablePadding>
            {filteredTransactions().length === 0 ? (
              <Box sx={{ p: 4, textAlign: 'center' }}>
                <Typography variant="body1" color="text.secondary">
                  No transactions match your filters
                </Typography>
              </Box>
            ) : (
              filteredTransactions().map((transaction, index) => (
                <React.Fragment key={transaction.id}>
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
                      <Avatar sx={{ bgcolor: `${transaction.color}20`, color: transaction.color }}>
                        {getCategoryIcon(transaction.category)}
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                      primary={
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                          <Typography variant="body1" component="div" fontWeight="medium">
                            {transaction.merchant}
                          </Typography>
                          <Chip 
                            size="small" 
                            label={transaction.category} 
                            sx={{ 
                              fontSize: '0.7rem',
                              ml: 1,
                              height: 20,
                              bgcolor: `${transaction.color}15`,
                              color: transaction.color,
                              borderRadius: '4px'
                            }} 
                          />
                        </Box>
                      }
                      secondary={
                        <Typography variant="body2" color="text.secondary">
                          {transaction.description} • {transaction.account}
                        </Typography>
                      }
                    />
                    <ListItemSecondaryAction sx={{ display: 'flex', alignItems: 'center' }}>
                      <Box sx={{ textAlign: 'right', mr: 1 }}>
                        <Typography 
                          variant="body1" 
                          fontWeight="medium" 
                          color={transaction.amount < 0 ? 'error.main' : 'success.main'}
                        >
                          {transaction.amount < 0 ? '' : '+'}{formatCurrency(transaction.amount)}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          {formatDate(transaction.date)}
                        </Typography>
                      </Box>
                      <IconButton edge="end" aria-label="more options">
                        <MoreVertIcon />
                      </IconButton>
                    </ListItemSecondaryAction>
                  </ListItem>
                </React.Fragment>
              ))
            )}
          </List>
        </Paper>

        {/* Action Buttons */}
        <Box 
          sx={{ 
            display: 'flex', 
            justifyContent: 'center', 
            gap: 2,
            opacity: animatedItems.transactions ? 1 : 0,
            transform: animatedItems.transactions ? 'translateY(0)' : 'translateY(20px)',
            transition: 'all 0.5s ease 0.2s',
          }}
        >
          <Button
            variant="outlined"
            startIcon={<FileDownloadIcon />}
          >
            Export Transactions
          </Button>
          <Button
            variant="contained"
            color="primary"
            startIcon={<AddIcon />}
          >
            Add Transaction
          </Button>
        </Box>
      </Container>
    </Dashboard>
  );
};

export default Transactions; 