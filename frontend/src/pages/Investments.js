import React, { useContext, useState, useEffect } from 'react';
import { 
  Box, 
  Typography, 
  Container,
  Grid,
  Paper,
  Card,
  CardContent,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  Avatar,
  Chip,
  LinearProgress,
  Tabs,
  Tab,
  Divider,
  IconButton,
  CircularProgress,
  useTheme
} from '@mui/material';
import { AuthContext } from '../contexts/AuthContext';

// Icons
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import AddIcon from '@mui/icons-material/Add';
import PieChartIcon from '@mui/icons-material/PieChart';
import ShowChartIcon from '@mui/icons-material/ShowChart';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

// Dashboard Component - importing this to reuse the sidebar
import Dashboard from '../components/Dashboard';

const Investments = () => {
  const theme = useTheme();
  const { currentUser } = useContext(AuthContext);
  const [tabValue, setTabValue] = useState(0);
  const [hideValues, setHideValues] = useState(false);
  const [animatedItems, setAnimatedItems] = useState({
    header: false,
    summary: false,
    portfolio: false
  });

  // Mock data for demo
  const investmentSummary = {
    totalValue: 187650.32,
    todayChange: 1253.67,
    todayChangePercent: 0.67,
    totalGain: 32480.12,
    totalGainPercent: 20.92,
  };

  const portfolioData = [
    { 
      id: 1,
      name: "Apple Inc.",
      ticker: "AAPL",
      shares: 25,
      price: 178.85,
      value: 4471.25,
      costBasis: 3800.00,
      gain: 671.25,
      gainPercent: 17.66,
      dayChange: 1.24,
      allocation: 23.8,
      color: theme.palette.primary.main,
    },
    { 
      id: 2,
      name: "Microsoft Corporation",
      ticker: "MSFT",
      shares: 12,
      price: 372.13,
      value: 4465.56,
      costBasis: 3950.00,
      gain: 515.56,
      gainPercent: 13.05,
      dayChange: 0.75,
      allocation: 23.8,
      color: theme.palette.success.main,
    },
    { 
      id: 3,
      name: "Amazon.com Inc.",
      ticker: "AMZN",
      shares: 18,
      price: 178.75,
      value: 3217.50,
      costBasis: 2800.00,
      gain: 417.50,
      gainPercent: 14.91,
      dayChange: -0.32,
      allocation: 17.1,
      color: theme.palette.warning.main,
    },
    { 
      id: 4,
      name: "Tesla Inc.",
      ticker: "TSLA",
      shares: 15,
      price: 215.65,
      value: 3234.75,
      costBasis: 3500.00,
      gain: -265.25,
      gainPercent: -7.58,
      dayChange: -1.15,
      allocation: 17.2,
      color: theme.palette.error.main,
    },
    { 
      id: 5,
      name: "Alphabet Inc.",
      ticker: "GOOGL",
      shares: 10,
      price: 138.42,
      value: 1384.20,
      costBasis: 1200.00,
      gain: 184.20,
      gainPercent: 15.35,
      dayChange: 0.28,
      allocation: 7.4,
      color: theme.palette.secondary.main,
    },
    { 
      id: 6,
      name: "Vanguard Total Stock Market ETF",
      ticker: "VTI",
      shares: 10,
      price: 221.28,
      value: 2212.80,
      costBasis: 2000.00,
      gain: 212.80,
      gainPercent: 10.64,
      dayChange: 0.52,
      allocation: 10.7,
      color: theme.palette.info.main,
    },
  ];

  // Account data
  const accountsData = [
    {
      id: 1,
      name: "Individual Brokerage",
      provider: "Fidelity",
      value: 127650.32,
      gain: 22480.12,
      gainPercent: 21.38,
    },
    {
      id: 2,
      name: "Roth IRA",
      provider: "Vanguard",
      value: 60000.00,
      gain: 10000.00,
      gainPercent: 20.00,
    },
  ];

  // Animation on mount
  useEffect(() => {
    setTimeout(() => setAnimatedItems(prev => ({ ...prev, header: true })), 100);
    setTimeout(() => setAnimatedItems(prev => ({ ...prev, summary: true })), 300);
    setTimeout(() => setAnimatedItems(prev => ({ ...prev, portfolio: true })), 500);
  }, []);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const toggleValueVisibility = () => {
    setHideValues(!hideValues);
  };

  // Format currency
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', { 
      style: 'currency', 
      currency: 'USD',
      maximumFractionDigits: 2
    }).format(amount);
  };

  // Format percentage
  const formatPercent = (percent) => {
    return new Intl.NumberFormat('en-US', { 
      style: 'percent',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(percent / 100);
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
            Investments
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Track and manage your investment portfolio
          </Typography>
        </Box>

        {/* Portfolio Summary */}
        <Grid container spacing={3} mb={4}>
          {/* Total Portfolio Value */}
          <Grid item xs={12} md={4}>
            <Card 
              sx={{ 
                height: '100%',
                background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.primary.dark})`,
                color: 'white',
                opacity: animatedItems.summary ? 1 : 0,
                transform: animatedItems.summary ? 'translateY(0)' : 'translateY(20px)',
                transition: 'all 0.5s ease 0.1s',
              }}
            >
              <CardContent sx={{ p: 3 }}>
                <Typography variant="overline" sx={{ opacity: 0.8 }}>
                  TOTAL PORTFOLIO VALUE
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                  <Typography variant="h4" component="div" fontWeight="bold" sx={{ flexGrow: 1 }}>
                    {hideValues ? '••••••' : formatCurrency(investmentSummary.totalValue)}
                  </Typography>
                  <IconButton size="small" onClick={toggleValueVisibility} sx={{ color: 'white' }}>
                    {hideValues ? <VisibilityIcon /> : <VisibilityOffIcon />}
                  </IconButton>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Typography 
                    variant="body2" 
                    sx={{ 
                      display: 'flex', 
                      alignItems: 'center', 
                      color: investmentSummary.todayChange > 0 ? theme.palette.success.light : theme.palette.error.light
                    }}
                  >
                    {investmentSummary.todayChange > 0 ? 
                      <TrendingUpIcon fontSize="small" sx={{ mr: 0.5 }} /> : 
                      <TrendingDownIcon fontSize="small" sx={{ mr: 0.5 }} />
                    }
                    {hideValues ? '••••' : formatCurrency(investmentSummary.todayChange)}
                    &nbsp;({formatPercent(investmentSummary.todayChangePercent)})
                  </Typography>
                  <Typography variant="body2" sx={{ opacity: 0.8, ml: 1 }}>
                    Today
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          </Grid>

          {/* Total Gain */}
          <Grid item xs={12} md={4}>
            <Card 
              sx={{ 
                height: '100%',
                opacity: animatedItems.summary ? 1 : 0,
                transform: animatedItems.summary ? 'translateY(0)' : 'translateY(20px)',
                transition: 'all 0.5s ease 0.2s',
              }}
            >
              <CardContent sx={{ p: 3 }}>
                <Typography variant="overline" color="text.secondary">
                  TOTAL GAIN/LOSS
                </Typography>
                <Typography 
                  variant="h4" 
                  component="div" 
                  fontWeight="bold" 
                  color={investmentSummary.totalGain > 0 ? 'success.main' : 'error.main'}
                >
                  {hideValues ? '••••••' : formatCurrency(investmentSummary.totalGain)}
                </Typography>
                <Typography 
                  variant="body2" 
                  color={investmentSummary.totalGainPercent > 0 ? 'success.main' : 'error.main'}
                  sx={{ display: 'flex', alignItems: 'center' }}
                >
                  {investmentSummary.totalGainPercent > 0 ? 
                    <TrendingUpIcon fontSize="small" sx={{ mr: 0.5 }} /> : 
                    <TrendingDownIcon fontSize="small" sx={{ mr: 0.5 }} />
                  }
                  {formatPercent(investmentSummary.totalGainPercent)} overall
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          {/* Allocation Breakdown */}
          <Grid item xs={12} md={4}>
            <Card 
              sx={{ 
                height: '100%',
                opacity: animatedItems.summary ? 1 : 0,
                transform: animatedItems.summary ? 'translateY(0)' : 'translateY(20px)',
                transition: 'all 0.5s ease 0.3s',
              }}
            >
              <CardContent sx={{ p: 3 }}>
                <Typography variant="overline" color="text.secondary">
                  PORTFOLIO ALLOCATION
                </Typography>
                <Box sx={{ mt: 2 }}>
                  {portfolioData.slice(0, 3).map((stock) => (
                    <Box key={stock.id} sx={{ mb: 1.5 }}>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
                        <Typography variant="body2" fontWeight="medium">
                          {stock.ticker}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {formatPercent(stock.allocation)}
                        </Typography>
                      </Box>
                      <LinearProgress 
                        variant="determinate" 
                        value={stock.allocation} 
                        sx={{ 
                          height: 5,
                          borderRadius: 5,
                          backgroundColor: `${stock.color}20`,
                          '& .MuiLinearProgress-bar': {
                            backgroundColor: stock.color,
                          }
                        }} 
                      />
                    </Box>
                  ))}
                  <Box sx={{ mt: 1.5 }}>
                    <Button 
                      size="small" 
                      color="primary" 
                      endIcon={<PieChartIcon />}
                    >
                      View Full Allocation
                    </Button>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        {/* Portfolio & Accounts Tabs */}
        <Paper 
          sx={{ 
            mb: 4,
            overflow: 'hidden',
            opacity: animatedItems.portfolio ? 1 : 0,
            transform: animatedItems.portfolio ? 'translateY(0)' : 'translateY(20px)',
            transition: 'all 0.5s ease',
          }}
        >
          <Box sx={{ borderBottom: 1, borderColor: 'divider', px: 2 }}>
            <Tabs
              value={tabValue}
              onChange={handleTabChange}
              aria-label="investment tabs"
              textColor="primary"
              indicatorColor="primary"
            >
              <Tab label="Holdings" />
              <Tab label="Accounts" />
              <Tab label="Performance" />
            </Tabs>
          </Box>

          {/* Holdings Tab */}
          {tabValue === 0 && (
            <TableContainer>
              <Table sx={{ minWidth: 650 }} aria-label="portfolio table">
                <TableHead>
                  <TableRow>
                    <TableCell>Name</TableCell>
                    <TableCell align="right">Price</TableCell>
                    <TableCell align="right">Shares</TableCell>
                    <TableCell align="right">Value</TableCell>
                    <TableCell align="right">Gain/Loss</TableCell>
                    <TableCell align="right">Day</TableCell>
                    <TableCell align="right">Allocation</TableCell>
                    <TableCell></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {portfolioData.map((stock) => (
                    <TableRow
                      key={stock.id}
                      sx={{ 
                        '&:last-child td, &:last-child th': { border: 0 },
                        '&:hover': { backgroundColor: 'rgba(0, 0, 0, 0.02)' }
                      }}
                    >
                      <TableCell component="th" scope="row">
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                          <Avatar 
                            sx={{ 
                              width: 32, 
                              height: 32, 
                              mr: 2, 
                              bgcolor: `${stock.color}20`,
                              color: stock.color,
                              fontSize: '0.9rem',
                              fontWeight: 'bold',
                            }}
                          >
                            {stock.ticker.slice(0, 2)}
                          </Avatar>
                          <Box>
                            <Typography variant="body2" fontWeight="medium">
                              {stock.ticker}
                            </Typography>
                            <Typography variant="caption" color="text.secondary">
                              {stock.name}
                            </Typography>
                          </Box>
                        </Box>
                      </TableCell>
                      <TableCell align="right">
                        <Typography variant="body2">
                          {hideValues ? '••••' : formatCurrency(stock.price)}
                        </Typography>
                      </TableCell>
                      <TableCell align="right">
                        <Typography variant="body2">
                          {stock.shares}
                        </Typography>
                      </TableCell>
                      <TableCell align="right">
                        <Typography variant="body2" fontWeight="medium">
                          {hideValues ? '••••' : formatCurrency(stock.value)}
                        </Typography>
                      </TableCell>
                      <TableCell align="right">
                        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
                          <Typography 
                            variant="body2" 
                            fontWeight="medium" 
                            color={stock.gain > 0 ? 'success.main' : 'error.main'}
                          >
                            {hideValues ? '••••' : formatCurrency(stock.gain)}
                          </Typography>
                          <Typography 
                            variant="caption" 
                            color={stock.gainPercent > 0 ? 'success.main' : 'error.main'}
                          >
                            {stock.gainPercent > 0 ? '+' : ''}{formatPercent(stock.gainPercent)}
                          </Typography>
                        </Box>
                      </TableCell>
                      <TableCell align="right">
                        <Chip 
                          size="small" 
                          label={`${stock.dayChange > 0 ? '+' : ''}${stock.dayChange}%`} 
                          sx={{ 
                            backgroundColor: stock.dayChange > 0 ? theme.palette.success.light + '30' : theme.palette.error.light + '30',
                            color: stock.dayChange > 0 ? theme.palette.success.dark : theme.palette.error.dark,
                            fontWeight: 'medium',
                            fontSize: '0.75rem',
                          }} 
                        />
                      </TableCell>
                      <TableCell align="right">
                        <Typography variant="body2">
                          {formatPercent(stock.allocation)}
                        </Typography>
                      </TableCell>
                      <TableCell align="right">
                        <IconButton size="small">
                          <MoreVertIcon fontSize="small" />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          )}

          {/* Accounts Tab */}
          {tabValue === 1 && (
            <TableContainer>
              <Table sx={{ minWidth: 650 }} aria-label="accounts table">
                <TableHead>
                  <TableRow>
                    <TableCell>Account</TableCell>
                    <TableCell align="right">Value</TableCell>
                    <TableCell align="right">Gain/Loss</TableCell>
                    <TableCell></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {accountsData.map((account) => (
                    <TableRow
                      key={account.id}
                      sx={{ 
                        '&:last-child td, &:last-child th': { border: 0 },
                        '&:hover': { backgroundColor: 'rgba(0, 0, 0, 0.02)' }
                      }}
                    >
                      <TableCell component="th" scope="row">
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                          <Avatar 
                            sx={{ 
                              width: 32, 
                              height: 32, 
                              mr: 2, 
                              bgcolor: `${theme.palette.primary.main}20`,
                              color: theme.palette.primary.main,
                            }}
                          >
                            <AccountBalanceIcon fontSize="small" />
                          </Avatar>
                          <Box>
                            <Typography variant="body2" fontWeight="medium">
                              {account.name}
                            </Typography>
                            <Typography variant="caption" color="text.secondary">
                              {account.provider}
                            </Typography>
                          </Box>
                        </Box>
                      </TableCell>
                      <TableCell align="right">
                        <Typography variant="body2" fontWeight="medium">
                          {hideValues ? '••••••' : formatCurrency(account.value)}
                        </Typography>
                      </TableCell>
                      <TableCell align="right">
                        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
                          <Typography 
                            variant="body2" 
                            fontWeight="medium" 
                            color={account.gain > 0 ? 'success.main' : 'error.main'}
                          >
                            {hideValues ? '••••' : formatCurrency(account.gain)}
                          </Typography>
                          <Typography 
                            variant="caption" 
                            color={account.gainPercent > 0 ? 'success.main' : 'error.main'}
                          >
                            {account.gainPercent > 0 ? '+' : ''}{formatPercent(account.gainPercent)}
                          </Typography>
                        </Box>
                      </TableCell>
                      <TableCell align="right">
                        <IconButton size="small">
                          <MoreVertIcon fontSize="small" />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          )}

          {/* Performance Tab */}
          {tabValue === 2 && (
            <Box sx={{ p: 4, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: 300 }}>
              <ShowChartIcon sx={{ fontSize: 60, color: theme.palette.primary.main, mb: 2, opacity: 0.7 }} />
              <Typography variant="h6" gutterBottom>
                Performance charts coming soon
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 2, maxWidth: 400, textAlign: 'center' }}>
                Track your investment performance over time with interactive charts and analytics.
              </Typography>
            </Box>
          )}
        </Paper>

        {/* Add Investment Button */}
        <Box 
          sx={{ 
            display: 'flex', 
            justifyContent: 'center', 
            mt: 2,
            opacity: animatedItems.portfolio ? 1 : 0,
            transform: animatedItems.portfolio ? 'translateY(0)' : 'translateY(20px)',
            transition: 'all 0.5s ease 0.2s',
          }}
        >
          <Button 
            variant="contained" 
            color="primary"
            startIcon={<AddIcon />}
          >
            Add New Investment
          </Button>
        </Box>
      </Container>
    </Dashboard>
  );
};

export default Investments; 